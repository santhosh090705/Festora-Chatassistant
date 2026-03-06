/**
 * Festora Chatbot Widget
 * Floating bottom-right assistant — mirrors festora-chatbot/frontend-chatbot exactly.
 * Depends on: supabase (CDN), EVENTS & GENRES from js/data.js, app.js (for supabaseClient)
 */
(function () {
    'use strict';

    // 🔑 ADD YOUR OPENROUTER API KEY HERE:
    // Get a free key at https://openrouter.ai/
    window.OPENROUTER_API_KEY = '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';

    /* ─── State ─────────────────────────────────────────────── */
    let msgs = [];
    let isTyping = false;
    let step = 'GREET';   // GREET | BROWSING | SELECT_TICKET | ENTER_QTY | NEED_LOGIN | CONFIRMING
    let activeConcert = null;
    let activeTicket = null;
    let chatUser = null;
    let isOpen = false;
    let initialized = false;

    /* ─── Helpers ────────────────────────────────────────────── */
    function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

    function fmt(p) { return '₹' + p.toLocaleString('en-IN'); }
    function fmtDate(d) {
        return new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    }

    /* ─── Supabase ───────────────────────────────────────────── */
    // Always reuse the SAME client that app.js created (window.festoraSupabaseClient).
    // Creating a second client causes BOTH to try and exchange the OAuth ?code= on login,
    // which breaks authentication and hides the widget after login.
    let _sbClient = null;
    function getSB() {
        if (_sbClient) return _sbClient;
        // Prefer the client already created by app.js (loaded before us)
        if (window.festoraSupabaseClient) {
            _sbClient = window.festoraSupabaseClient;
            return _sbClient;
        }
        // Fallback: create our own only if app.js client isn't available
        if (window.supabase && window.supabase.createClient) {
            const url = 'https://awdoignuguvsktagucdo.supabase.co';
            const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZG9pZ251Z3V2c2t0YWd1Y2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzM1MjAsImV4cCI6MjA4Nzg0OTUyMH0.Uezm4wV5C_9YEVFEBEP4tGIzo_gHMWFmSZnzftTLHnY';
            _sbClient = window.supabase.createClient(url, key);
            return _sbClient;
        }
        return null;
    }

    /* ─── Auth helpers ───────────────────────────────────────── */
    async function syncUser() {
        const sb = getSB();
        if (!sb) return;
        const { data: { session } } = await sb.auth.getSession();
        chatUser = session?.user ?? null;
        renderHeader();

        // Restore pending booking after OAuth redirect
        if (chatUser) {
            const saved = sessionStorage.getItem('festora_chatbot_pending');
            if (saved) {
                sessionStorage.removeItem('festora_chatbot_pending');
                try {
                    const { savedConcert, savedTicket, savedQty } = JSON.parse(saved);
                    if (savedConcert && savedTicket && savedQty) {
                        activeConcert = savedConcert;
                        activeTicket = savedTicket;
                        step = 'CONFIRMING';
                        openWidget();
                        botSay(`Welcome back, ${chatUser.user_metadata?.full_name || 'there'}! 👋 Picking up your booking…`);
                        setTimeout(() => doConfirm(savedQty), 900);
                    }
                } catch (_) { }
            }
        }
    }

    function savePending(qty) {
        if (activeConcert && activeTicket) {
            sessionStorage.setItem('festora_chatbot_pending', JSON.stringify({
                savedConcert: activeConcert,
                savedTicket: activeTicket,
                savedQty: qty
            }));
        }
    }

    async function doLogin(pendingQty) {
        userSay('Sign in with Google');
        savePending(pendingQty);
        const sb = getSB();
        if (!sb) { botSay('⚠️ Supabase is not configured.'); return; }
        const { error } = await sb.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin + window.location.pathname }
        });
        if (error) {
            botSay("❌ Couldn't open sign-in. Please try again.");
        } else {
            botSay('Opening Google sign-in… Come back to this page after signing in and your booking will resume automatically! 🎵');
        }
    }

    async function doLogout() {
        const sb = getSB();
        if (sb) await sb.auth.signOut();
        chatUser = null;
        renderHeader();
        botSay('You have been signed out. Let me know if you need anything!', [
            { label: '🎵 Browse Events', action: doBrowse }
        ]);
    }

    /* ─── Chat flow ──────────────────────────────────────────── */
    function botSay(text, opts, concert) {
        isTyping = true;
        renderTyping();
        setTimeout(() => {
            msgs.push({ id: uid(), sender: 'bot', text, opts, concert });
            isTyping = false;
            renderMessages();
            speakText(text);
        }, 500 + Math.random() * 400);
    }

    function userSay(text) {
        msgs.push({ id: uid(), sender: 'user', text });
        renderMessages();
    }

    function doBrowse() {
        userSay('Browse Events');
        step = 'BROWSING';
        const top = (window.EVENTS || []).slice(0, 6);
        const opts = top.map(ev => ({ label: ev.title, action: () => doSelectEvent(ev) }));
        botSay('Here are upcoming events on Festora. Tap one to view ticket options:', opts);
    }

    function doSelectEvent(ev) {
        userSay(ev.title);
        activeConcert = ev;
        step = 'SELECT_TICKET';
        const opts = ev.ticketTypes.map(t => ({
            label: `${t.name}  ·  ${fmt(t.price)}`,
            action: () => doSelectTicket(t)
        }));
        botSay(`Great choice! Here are ticket tiers for **${ev.title}**:`, opts, ev);
    }

    function doSelectTicket(t) {
        userSay(t.name);
        activeTicket = t;
        step = 'ENTER_QTY';
        botSay(`You selected **${t.name}** at ${fmt(t.price)} each. How many tickets? (max 10)`);
    }

    function doConfirm(n) {
        if (!activeConcert || !activeTicket) return;
        step = 'CONFIRMING';
        const total = activeTicket.price * n;
        const name = chatUser?.user_metadata?.full_name || chatUser?.email?.split('@')[0] || 'Guest';
        const lines = [
            `Please confirm your booking:`,
            ``,
            `Event:   ${activeConcert.title}`,
            `Venue:   ${activeConcert.venue}`,
            `Date:    ${fmtDate(activeConcert.date)}`,
            `Ticket:  ${activeTicket.name}  ×${n}`,
            `Total:   ${fmt(total)}`,
            ``,
            `Name:    ${name}`,
            `Email:   ${chatUser?.email || '—'}`
        ].join('\n');
        botSay(lines, [
            { label: '✅ Confirm & Book', action: () => doBook(n) },
            { label: '❌ Cancel', action: doCancel }
        ]);
    }

    function doCancel() {
        userSay('Cancel');
        activeConcert = null; activeTicket = null; step = 'GREET';
        botSay('Booking cancelled. Let me know if you want to browse more events!', [
            { label: '🎵 Browse Events', action: doBrowse }
        ]);
    }

    async function doBook(n) {
        if (!activeConcert || !activeTicket) return;
        if (!chatUser) {
            step = 'NEED_LOGIN';
            botSay("You need to be signed in to complete a booking.", [
                { label: '🔐 Sign in with Google', action: () => doLogin(n) }
            ]);
            return;
        }
        userSay('Confirm & Book');
        botSay('Processing your booking…');
        const payload = {
            user_id: chatUser.id,
            booking_id: 'FST' + Date.now().toString(36).toUpperCase(),
            ticket_id: 'TKT-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
            event_id: activeConcert.id,
            event_title: activeConcert.title,
            event_date: activeConcert.date,
            event_time: activeConcert.time,
            venue: activeConcert.venue,
            ticket_type: activeTicket.name,
            ticket_type_id: activeTicket.id,
            quantity: n,
            total_amount: activeTicket.price * n,
            name: chatUser.user_metadata?.full_name || chatUser.email?.split('@')[0],
            email: chatUser.email,
            phone: '',
            payment_method: 'Chatbot',
            status: 'confirmed',
            image: activeConcert.thumb
        };
        const sb = getSB();
        const { error } = sb ? await sb.from('bookings').insert([payload]) : { error: { message: 'Supabase not configured' } };
        if (error) {
            botSay(`❌ Booking failed: ${error.message}`, [{ label: '🔄 Try Again', action: () => doBook(n) }]);
        } else {
            const bookedConcert = activeConcert;
            activeConcert = null; activeTicket = null; step = 'GREET';
            botSay(`🎉 Booking confirmed! ID: **${payload.booking_id}**\nCheck your Festora profile to view your tickets.`, [
                { label: '🎵 Book Another', action: doBrowse },
                { label: '👤 My Profile', action: () => { window.location.href = 'profile.html'; } }
            ], bookedConcert);
        }
    }

    function handleQtyInput(val) {
        const n = parseInt(val, 10);
        if (isNaN(n) || n < 1 || n > 10) {
            botSay('Please enter a number between 1 and 10.');
            return;
        }
        if (!chatUser) {
            // Need login before confirming
            userSay(val);
            step = 'NEED_LOGIN';
            botSay('You need to sign in to complete booking.', [
                { label: '🔐 Sign in with Google', action: () => doLogin(n) }
            ]);
        } else {
            userSay(val);
            doConfirm(n);
        }
    }

    async function fetchQwenResponse(userText) {
        if (!window.OPENROUTER_API_KEY || window.OPENROUTER_API_KEY === 'YOUR_API_KEY_HERE') {
            botSay("Looks like you haven't added your OpenRouter API key yet! Please add it at the top of `js/chatbot-widget.js` to enable Qwen AI.", [
                { label: '🎵 Browse Events', action: doBrowse }
            ]);
            return;
        }

        isTyping = true;
        renderTyping();
        scrollBottom();

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Festora',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'qwen/qwen-2.5-72b-instruct:free',
                    messages: [
                        { role: 'system', content: 'You are Festora Assistant, a helpful AI booking agent for live music concerts and festivals in India. Be friendly, enthusiastic, and concise. You can answer general questions about music, concerts, and how to use the platform. Limit your responses to 1-3 short paragraphs.' },
                        { role: 'user', content: userText }
                    ]
                })
            });

            const data = await response.json();
            isTyping = false;

            if (data.choices && data.choices[0] && data.choices[0].message) {
                const reply = data.choices[0].message.content;
                msgs.push({ id: uid(), sender: 'bot', text: reply, opts: [{ label: '🎵 Browse Events', action: doBrowse }] });
                renderMessages();
            } else {
                msgs.push({ id: uid(), sender: 'bot', text: "Sorry, I'm having trouble connecting to Qwen right now. Want to browse events instead?", opts: [{ label: '🎵 Browse Events', action: doBrowse }] });
                renderMessages();
            }
        } catch (error) {
            isTyping = false;
            msgs.push({ id: uid(), sender: 'bot', text: "Sorry, an error occurred while connecting to my AI brain. Want to browse events instead?", opts: [{ label: '🎵 Browse Events', action: doBrowse }] });
            renderMessages();
        }
    }

    function handleUserInput(val) {
        if (!val) return;
        if (step === 'ENTER_QTY') {
            handleQtyInput(val);
        } else {
            userSay(val);
            // Hybrid Approach: Check for specific booking intents first
            const lower = val.toLowerCase();
            const triggers = ['browse', 'event', 'show', 'concert', 'book', 'ticket', 'festival', 'discovery', 'buy', 'purchase', 'happen', 'what\'s on', 'find show', 'find event'];
            if (triggers.some(t => lower.includes(t))) {
                doBrowse();
            } else {
                fetchQwenResponse(val);
            }
        }
    }

    /* ─── Widget DOM ─────────────────────────────────────────── */
    let widgetEl, chatHistoryEl, inputEl, typingEl, headerInfoEl, headerActionEl, unreadDot;

    function buildWidget() {
        // Inject CSS
        const style = document.createElement('style');
        style.textContent = `
      #fcw-toggle {
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: linear-gradient(135deg, #9f67ff 0%, #7c3aed 100%);
        border: none;
        cursor: pointer;
        box-shadow: 0 8px 28px rgba(124,58,237,0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99998;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        color: white;
      }
      #fcw-toggle:hover { transform: scale(1.08); box-shadow: 0 12px 36px rgba(124,58,237,0.55); }
      #fcw-toggle svg { width: 26px; height: 26px; flex-shrink: 0; }

      #fcw-unread {
        position: absolute;
        top: 2px; right: 2px;
        width: 14px; height: 14px;
        background: #EF4444;
        border-radius: 50%;
        border: 2px solid white;
        display: none;
      }

      #fcw-window {
        position: fixed;
        bottom: 100px;
        right: 28px;
        width: 370px;
        height: 540px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 24px 64px rgba(0,0,0,0.22), 0 2px 8px rgba(124,58,237,0.12);
        border: 1px solid rgba(124,58,237,0.15);
        font-family: 'Inter', sans-serif;
        overflow: hidden;
        transform-origin: bottom right;
        transition: opacity 0.22s ease, transform 0.22s ease;
      }
      #fcw-window.fcw-hidden {
        opacity: 0;
        transform: scale(0.88) translateY(16px);
        pointer-events: none;
      }

      /* Header */
      .fcw-header {
        background: linear-gradient(135deg, #9f67ff 0%, #7c3aed 100%);
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
      }
      .fcw-avatar {
        width: 38px; height: 38px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; color: white;
      }
      .fcw-header-info { flex: 1; min-width: 0; }
      .fcw-header-info h3 { color: white; font-size: 0.92rem; font-weight: 700; line-height: 1.2; margin: 0; }
      .fcw-header-info p  { color: rgba(255,255,255,0.82); font-size: 0.72rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .fcw-login-pill {
        background: rgba(255,255,255,0.22); border: 1.5px solid rgba(255,255,255,0.6);
        color: white; font-size: 0.72rem; font-weight: 600;
        padding: 4px 12px; border-radius: 2rem; cursor: pointer;
        font-family: inherit; transition: background 0.2s; white-space: nowrap; flex-shrink: 0;
      }
      .fcw-login-pill:hover { background: rgba(255,255,255,0.38); }
      .fcw-logout-btn {
        background: rgba(255,255,255,0.18); border: none; color: white;
        width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
        font-size: 0.75rem; display: flex; align-items: center; justify-content: center;
        transition: background 0.2s; flex-shrink: 0;
      }
      .fcw-logout-btn:hover { background: rgba(255,255,255,0.35); }
      .fcw-close-btn {
        background: rgba(255,255,255,0.15); border: none; color: white;
        width: 26px; height: 26px; border-radius: 50%; cursor: pointer;
        font-size: 0.8rem; display: flex; align-items: center; justify-content: center;
        transition: background 0.2s; flex-shrink: 0; margin-left: 2px;
      }
      .fcw-close-btn:hover { background: rgba(255,255,255,0.35); }

      /* Messages */
      .fcw-history {
        flex: 1; overflow-y: auto;
        padding: 14px 14px 8px;
        display: flex; flex-direction: column; gap: 10px;
        scroll-behavior: smooth;
      }
      .fcw-history::-webkit-scrollbar { width: 3px; }
      .fcw-history::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }

      .fcw-msg {
        max-width: 88%; padding: 10px 13px;
        border-radius: 16px; font-size: 0.85rem; line-height: 1.58;
        animation: fcwFadeUp 0.28s ease-out;
        white-space: pre-wrap; word-break: break-word;
      }
      @keyframes fcwFadeUp {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fcw-msg.bot {
        align-self: flex-start;
        background: #f9fafb; border: 1px solid #e5e7eb;
        border-bottom-left-radius: 4px; color: #1f2937;
      }
      .fcw-msg.user {
        align-self: flex-end;
        background: linear-gradient(135deg, #9f67ff, #7c3aed);
        color: white; border-bottom-right-radius: 4px;
      }

      /* Options */
      .fcw-opts { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
      .fcw-opt-btn {
        background: white; color: #7c3aed;
        border: 1.5px solid #7c3aed;
        padding: 5px 12px; border-radius: 2rem;
        font-size: 0.76rem; font-weight: 600; cursor: pointer;
        font-family: inherit; transition: all 0.18s;
      }
      .fcw-opt-btn:hover:not(:disabled) { background: #7c3aed; color: white; transform: scale(1.02); }
      .fcw-opt-btn:disabled { opacity: 0.42; cursor: not-allowed; pointer-events: none; }

      /* Concert card */
      .fcw-concert-card {
        display: flex; align-items: center; gap: 9px;
        background: white; border: 1px solid #e5e7eb;
        border-radius: 10px; padding: 8px; margin-top: 7px; overflow: hidden;
      }
      .fcw-concert-card img { width: 50px; height: 50px; object-fit: cover; border-radius: 7px; flex-shrink: 0; }
      .fcw-concert-card-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .fcw-concert-card-info strong { font-size: 0.78rem; font-weight: 700; color: #1f2937; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .fcw-concert-card-info span { font-size: 0.7rem; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .fcw-price { color: #7c3aed !important; font-weight: 700 !important; }

      /* Typing */
      .fcw-typing {
        display: flex; align-items: center; gap: 5px;
        padding: 10px 13px; background: #f9fafb;
        border: 1px solid #e5e7eb; border-radius: 16px;
        border-bottom-left-radius: 4px;
        align-self: flex-start; width: fit-content;
      }
      .fcw-dot {
        width: 6px; height: 6px; background: #9ca3af; border-radius: 50%;
        animation: fcwBounce 1.2s infinite ease-in-out both;
      }
      .fcw-dot:nth-child(1) { animation-delay: -0.32s; }
      .fcw-dot:nth-child(2) { animation-delay: -0.16s; }
      @keyframes fcwBounce {
        0%, 80%, 100% { transform: scale(0); }
        40%           { transform: scale(1); }
      }

      /* Input */
      .fcw-input-area { padding: 10px 12px 12px; border-top: 1px solid #f3f4f6; flex-shrink: 0; }
      .fcw-input-form {
        display: flex; align-items: center; gap: 7px;
        background: #f9fafb; border: 1.5px solid #e5e7eb;
        border-radius: 2rem; padding: 4px 4px 4px 14px;
        transition: border-color 0.2s;
      }
      .fcw-input-form:focus-within { border-color: #9f67ff; }
      .fcw-input-field {
        flex: 1; background: transparent; border: none; font-family: inherit;
        font-size: 0.86rem; color: #1f2937; outline: none;
      }
      .fcw-input-field::placeholder { color: #9ca3af; }
      .fcw-send-btn {
        width: 34px; height: 34px; background: linear-gradient(135deg, #9f67ff, #7c3aed);
        color: white; border: none; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: transform 0.15s; flex-shrink: 0;
      }
      .fcw-send-btn:hover:not(:disabled) { transform: scale(1.08); }
      .fcw-send-btn:disabled { background: #e5e7eb; cursor: not-allowed; }
      .fcw-voice-btn {
        width: 32px; height: 32px; background: transparent;
        color: #7c3aed; border: none; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all 0.2s; flex-shrink: 0;
      }
      .fcw-voice-btn:hover { background: rgba(124,58,237,0.1); }
      .fcw-voice-btn.recording { color: #EF4444; animation: fcwPulse 1.5s infinite; }
      @keyframes fcwPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
      .fcw-powered { text-align: center; font-size: 0.64rem; color: #9ca3af; margin-top: 5px; }

      @media (max-width: 440px) {
        #fcw-window { width: calc(100vw - 24px); right: 12px; bottom: 84px; }
        #fcw-toggle { right: 16px; bottom: 16px; }
      }
    `;
        document.head.appendChild(style);

        // Toggle button
        const toggle = document.createElement('button');
        toggle.id = 'fcw-toggle';
        toggle.title = 'Open Festora Assistant';
        toggle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span id="fcw-unread"></span>
    `;
        toggle.addEventListener('click', toggleWidget);
        document.body.appendChild(toggle);
        unreadDot = document.getElementById('fcw-unread');

        // Main window
        widgetEl = document.createElement('div');
        widgetEl.id = 'fcw-window';
        widgetEl.classList.add('fcw-hidden');
        widgetEl.innerHTML = `
      <div class="fcw-header" id="fcw-header">
        <div class="fcw-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <div class="fcw-header-info" id="fcw-header-info">
          <h3>Festora Assistant</h3>
          <p>Sign in to book tickets</p>
        </div>
        <div id="fcw-header-action"></div>
        <button class="fcw-close-btn" id="fcw-close-btn" title="Close">✕</button>
      </div>
      <div class="fcw-history" id="fcw-history"></div>
      <div class="fcw-input-area">
        <form class="fcw-input-form" id="fcw-form">
          <input class="fcw-input-field" id="fcw-input" type="text" placeholder="Type a message…" autocomplete="off"/>
          <button type="button" class="fcw-voice-btn" id="fcw-voice" title="Voice Input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          <button type="submit" class="fcw-send-btn" id="fcw-send" disabled>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
        <p class="fcw-powered">Powered by Festora · Supabase</p>
      </div>
    `;
        document.body.appendChild(widgetEl);

        chatHistoryEl = document.getElementById('fcw-history');
        inputEl = document.getElementById('fcw-input');
        headerInfoEl = document.getElementById('fcw-header-info');
        headerActionEl = document.getElementById('fcw-header-action');

        document.getElementById('fcw-close-btn').addEventListener('click', closeWidget);
        document.getElementById('fcw-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const val = inputEl.value.trim();
            if (!val || isTyping) return;
            inputEl.value = '';
            updateSendBtn();
            handleUserInput(val);
        });
        inputEl.addEventListener('input', updateSendBtn);
    }

    function updateSendBtn() {
        const btn = document.getElementById('fcw-send');
        if (btn) btn.disabled = !inputEl.value.trim() || isTyping;
    }

    function openWidget() {
        isOpen = true;
        widgetEl.classList.remove('fcw-hidden');
        if (unreadDot) unreadDot.style.display = 'none';
        setTimeout(() => inputEl && inputEl.focus(), 220);
        scrollBottom();
    }

    function closeWidget() {
        isOpen = false;
        widgetEl.classList.add('fcw-hidden');
    }

    function toggleWidget() {
        isOpen ? closeWidget() : openWidget();
    }

    /* ─── Rendering ──────────────────────────────────────────── */
    function renderHeader() {
        if (!headerInfoEl || !headerActionEl) return;
        if (chatUser) {
            const name = chatUser.user_metadata?.full_name || chatUser.email;
            headerInfoEl.innerHTML = `<h3>Festora Assistant</h3><p>${name}</p>`;
            headerActionEl.innerHTML = `<button class="fcw-logout-btn" id="fcw-logout" title="Sign out">✕</button>`;
            document.getElementById('fcw-logout')?.addEventListener('click', doLogout);
        } else {
            headerInfoEl.innerHTML = `<h3>Festora Assistant</h3><p>Sign in to book tickets</p>`;
            headerActionEl.innerHTML = `<button class="fcw-login-pill" id="fcw-login-hdr">Sign in</button>`;
            document.getElementById('fcw-login-hdr')?.addEventListener('click', () => doLogin());
        }
    }

    function lastMsgId() {
        return msgs.length ? msgs[msgs.length - 1].id : null;
    }

    /* ─── Voice ─────────────────────────────────────────────── */
    let recognition;
    let isSpeaking = false;

    function initVoice() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            const btn = document.getElementById('fcw-voice');
            if (btn) btn.style.display = 'none';
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        recognition.onstart = () => {
            const btn = document.getElementById('fcw-voice');
            btn?.classList.add('recording');
        };

        recognition.onend = () => {
            const btn = document.getElementById('fcw-voice');
            btn?.classList.remove('recording');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (inputEl) {
                inputEl.value = transcript;
                updateSendBtn();
                handleUserInput(transcript);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            const btn = document.getElementById('fcw-voice');
            btn?.classList.remove('recording');
        };

        document.getElementById('fcw-voice')?.addEventListener('click', () => {
            if (recognition) recognition.start();
        });
    }

    function speakText(text) {
        if (!('speechSynthesis' in window)) return;

        // Cancel any current speaking
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, '')); // Clean markdown
        utterance.lang = 'en-IN';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
    }

    function renderMessages() {
        if (!chatHistoryEl) return;
        // Remove typing indicator before re-render
        const existing = chatHistoryEl.querySelectorAll('.fcw-msg, .fcw-typing');
        existing.forEach(el => el.remove());

        msgs.forEach(m => {
            const div = document.createElement('div');
            div.className = `fcw-msg ${m.sender}`;
            div.id = `fcw-msg-${m.id}`;

            // Text with newline support
            const lines = m.text.split('\n');
            lines.forEach((line, i) => {
                if (i > 0) div.appendChild(document.createElement('br'));
                // Bold **text**
                const rendered = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                const span = document.createElement('span');
                span.innerHTML = rendered;
                div.appendChild(span);
            });

            // Concert mini card
            if (m.concert) {
                const card = document.createElement('div');
                card.className = 'fcw-concert-card';
                card.innerHTML = `
          <img src="${m.concert.thumb}" alt="${m.concert.title}" loading="lazy"/>
          <div class="fcw-concert-card-info">
            <strong>${m.concert.title}</strong>
            <span>${m.concert.venue}</span>
            <span class="fcw-price">${m.concert.priceRange}</span>
          </div>`;
                div.appendChild(card);
            }

            // Option buttons
            if (m.opts && m.opts.length) {
                const optsDiv = document.createElement('div');
                optsDiv.className = 'fcw-opts';
                m.opts.forEach(o => {
                    const btn = document.createElement('button');
                    btn.className = 'fcw-opt-btn';
                    btn.textContent = o.label;
                    const isLast = m.id === lastMsgId();
                    btn.disabled = isTyping || !isLast;
                    btn.addEventListener('click', () => {
                        // Disable all buttons in this message after click
                        optsDiv.querySelectorAll('.fcw-opt-btn').forEach(b => b.disabled = true);
                        o.action();
                    });
                    optsDiv.appendChild(btn);
                });
                div.appendChild(optsDiv);
            }

            chatHistoryEl.appendChild(div);
        });

        if (isTyping) renderTyping();
        scrollBottom();

        // Show unread dot if widget is closed
        if (!isOpen && msgs.length && msgs[msgs.length - 1].sender === 'bot') {
            if (unreadDot) unreadDot.style.display = 'block';
        }

        updateSendBtn();
    }

    function renderTyping() {
        if (!chatHistoryEl) return;
        // Remove old typing indicator
        chatHistoryEl.querySelector('.fcw-typing')?.remove();
        if (isTyping) {
            const t = document.createElement('div');
            t.className = 'fcw-typing';
            t.innerHTML = '<div class="fcw-dot"></div><div class="fcw-dot"></div><div class="fcw-dot"></div>';
            chatHistoryEl.appendChild(t);
            scrollBottom();
        }
    }

    function scrollBottom() {
        if (chatHistoryEl) chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
    }

    /* ─── Init ───────────────────────────────────────────────── */
    function init() {
        if (initialized) return;
        initialized = true;
        buildWidget();
        initVoice();

        // Auth setup
        syncUser();
        const sb = getSB();
        if (sb) {
            sb.auth.onAuthStateChange((event, session) => {
                chatUser = session?.user ?? null;
                renderHeader();
                if (event === 'SIGNED_IN' && chatUser) {
                    const saved = sessionStorage.getItem('festora_chatbot_pending');
                    if (saved) {
                        sessionStorage.removeItem('festora_chatbot_pending');
                        try {
                            const { savedConcert, savedTicket, savedQty } = JSON.parse(saved);
                            if (savedConcert && savedTicket && savedQty) {
                                activeConcert = savedConcert;
                                activeTicket = savedTicket;
                                step = 'CONFIRMING';
                                openWidget();
                                botSay(`You're signed in as ${chatUser.email}! Resuming your booking…`);
                                setTimeout(() => doConfirm(savedQty), 900);
                            }
                        } catch (_) { }
                    }
                }
            });
        }

        // Greeting
        botSay("👋 Welcome to Festora! I'm your booking assistant. What would you like to do?", [
            { label: '🎵 Browse Events', action: doBrowse }
        ]);

        // Update input placeholder when step changes
        const observer = new MutationObserver(() => {
            if (inputEl) {
                inputEl.placeholder = step === 'ENTER_QTY' ? 'Number of tickets (1–10)…' : 'Type a message…';
            }
        });
        if (chatHistoryEl) observer.observe(chatHistoryEl, { childList: true });
    }

    // Wait for DOM + data to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
