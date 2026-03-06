import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Send, Bot, Mic } from 'lucide-react';
import { supabase } from './supabaseClient';
import { EVENTS } from './data';
import type { EventMatch, TicketType } from './data';

type Step =
  | 'GREET'
  | 'BROWSING'
  | 'SELECT_TICKET'
  | 'ENTER_QTY'
  | 'NEED_LOGIN'
  | 'CONFIRMING';

interface Opt { label: string; action: () => void }

interface Msg {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  opts?: Opt[];
  concert?: EventMatch;
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export default function App() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState<Step>('GREET');
  const [concert, setConcert] = useState<EventMatch | null>(null);
  const [ticket, setTicket] = useState<TicketType | null>(null);
  const [qty, setQty] = useState<number>(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Auto scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  // Auth listener — also handles the OAuth redirect bounce-back
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);

      // Restore any pending booking that was saved before OAuth redirect
      if (session?.user) {
        const saved = sessionStorage.getItem('festora_pending_booking');
        if (saved) {
          sessionStorage.removeItem('festora_pending_booking');
          try {
            const { savedConcert, savedTicket, savedQty } = JSON.parse(saved);
            if (savedConcert && savedTicket && savedQty) {
              setConcert(savedConcert);
              setTicket(savedTicket);
              setStep('CONFIRMING');
              // Give the greeting effect time to run first, then overlay with recovery message
              setTimeout(() => {
                botSay(`Welcome back, ${session.user.user_metadata?.full_name || 'there'}! 👋 You were in the middle of booking — let me pick up where we left off.`);
                setTimeout(() => doConfirmWith(savedConcert, savedTicket, savedQty), 900);
              }, 700);
            }
          } catch { /* ignore corrupt state */ }
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // Triggered when user comes back from OAuth on the same tab (SIGNED_IN event)
      if (event === 'SIGNED_IN' && session?.user) {
        const saved = sessionStorage.getItem('festora_pending_booking');
        if (saved) {
          sessionStorage.removeItem('festora_pending_booking');
          try {
            const { savedConcert, savedTicket, savedQty } = JSON.parse(saved);
            if (savedConcert && savedTicket && savedQty) {
              setConcert(savedConcert);
              setTicket(savedTicket);
              setStep('CONFIRMING');
              setTimeout(() => {
                botSay(`You're signed in as ${session.user.email}! Resuming your booking…`);
                setTimeout(() => doConfirmWith(savedConcert, savedTicket, savedQty), 900);
              }, 300);
            }
          } catch { /* ignore */ }
        }
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Greeting on mount (once)
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    botSay("👋 Welcome to Festora! I'm your booking assistant. What would you like to do?", [
      { label: '🎵 Browse Events', action: doBrowse },
    ]);
  }, []);

  const botSay = (text: string, opts?: Opt[], ev?: EventMatch) => {
    setTyping(true);
    setTimeout(() => {
      setMsgs(p => [...p, { id: uid(), sender: 'bot', text, opts, concert: ev }]);
      setTyping(false);
      speakText(text);
    }, 500 + Math.random() * 400);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, ''));
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const userSay = (text: string) => setMsgs(p => [...p, { id: uid(), sender: 'user', text }]);

  function doBrowse() {
    userSay('Browse Events');
    setStep('BROWSING');
    const top = EVENTS.slice(0, 6);
    const opts: Opt[] = top.map(ev => ({ label: ev.title, action: () => doSelectEvent(ev) }));
    botSay('Here are upcoming events on Festora. Tap one to view ticket options:', opts);
  }

  function doSelectEvent(ev: EventMatch) {
    userSay(ev.title);
    setConcert(ev);
    setStep('SELECT_TICKET');
    const opts: Opt[] = ev.ticketTypes.map(t => ({
      label: `${t.name}  ·  ₹${t.price.toLocaleString('en-IN')}`,
      action: () => doSelectTicket(t),
    }));
    botSay(`Great choice! Here are the ticket tiers for **${ev.title}**:`, opts, ev);
  }

  function doSelectTicket(t: TicketType) {
    userSay(t.name);
    setTicket(t);
    setStep('ENTER_QTY');
    botSay(`You selected **${t.name}** at ₹${t.price.toLocaleString('en-IN')} each. How many tickets? (max 10)`);
  }

  function doConfirm(n: number) {
    if (!concert || !ticket) return;
    setQty(n);
    setStep('CONFIRMING');
    const total = ticket.price * n;
    const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest';
    const lines = [
      `Please confirm your booking:`,
      ``,
      `Event:  ${concert.title}`,
      `Venue:  ${concert.venue}`,
      `Date:   ${new Date(concert.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}`,
      `Ticket: ${ticket.name}  x${n}`,
      `Total:  ₹${total.toLocaleString('en-IN')}`,
      ``,
      `Name:   ${name}`,
      `Email:  ${user?.email || '—'}`,
    ].join('\n');
    botSay(lines, [
      { label: '✅ Confirm & Book', action: () => doBook(n) },
      { label: '❌ Cancel', action: doCancel },
    ]);
  }

  function doConfirmWith(c: EventMatch, t: TicketType, n: number) {
    setConcert(c);
    setTicket(t);
    setQty(n);
    setStep('CONFIRMING');
    const total = t.price * n;
    const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest';
    const lines = [
      `Please confirm your booking:`,
      ``,
      `Event:  ${c.title}`,
      `Venue:  ${c.venue}`,
      `Date:   ${new Date(c.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}`,
      `Ticket: ${t.name}  x${n}`,
      `Total:  ₹${total.toLocaleString('en-IN')}`,
      ``,
      `Name:   ${name}`,
      `Email:  ${user?.email || '—'}`,
    ].join('\n');
    botSay(lines, [
      { label: '✅ Confirm & Book', action: () => doBook(n) },
      { label: '❌ Cancel', action: doCancel },
    ]);
  }

  function doCancel() {
    userSay('Cancel');
    setConcert(null); setTicket(null); setQty(1); setStep('GREET');
    botSay('Booking cancelled. Let me know if you want to browse more events!', [
      { label: '🎵 Browse Events', action: doBrowse }
    ]);
  }

  async function doBook(n: number) {
    if (!concert || !ticket || !user) return;
    userSay('Confirm & Book');
    botSay('Processing your booking…');
    const payload = {
      user_id: user.id,
      booking_id: 'FST' + Date.now().toString(36).toUpperCase(),
      ticket_id: 'TKT-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      event_id: concert.id,
      event_title: concert.title,
      event_date: concert.date,
      event_time: concert.time,
      venue: concert.venue,
      ticket_type: ticket.name,
      ticket_type_id: ticket.id,
      quantity: n,
      total_amount: ticket.price * n,
      name: user.user_metadata?.full_name || user.email?.split('@')[0],
      email: user.email,
      phone: '',
      payment_method: 'Chatbot',
      status: 'confirmed',
      image: concert.thumb,
    };
    const { error } = await supabase.from('bookings').insert([payload]);
    if (error) {
      botSay(`❌ Booking failed: ${error.message}`, [{ label: '🔄 Try Again', action: () => doBook(n) }]);
    } else {
      setConcert(null); setTicket(null); setQty(1); setStep('GREET');
      botSay(`🎉 Booking confirmed! ID: **${payload.booking_id}**\nCheck your Festora profile to view your tickets.`, [
        { label: '🎵 Book Another', action: doBrowse }
      ], concert);
    }
  }

  const OPENROUTER_API_KEY = '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';

  async function fetchQwenResponse(userText: string) {
    setTyping(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'Festora Standalone',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'qwen/qwen-2.5-72b-instruct:free',
          messages: [
            { role: 'system', content: 'You are Festora Assistant, a helpful AI booking agent for live music concerts and festivals in India. Be friendly, enthusiastic, and concise. Limit responses to 1-3 short paragraphs.' },
            { role: 'user', content: userText }
          ]
        })
      });

      const data = await response.json();
      setTyping(false);

      if (data.choices && data.choices[0] && data.choices[0].message) {
        setMsgs(p => [...p, { id: uid(), sender: 'bot', text: data.choices[0].message.content, opts: [{ label: '🎵 Browse Events', action: doBrowse }] }]);
      } else {
        botSay("I'm having trouble connecting to my AI brain. Want to browse events instead?", [{ label: '🎵 Browse Events', action: doBrowse }]);
      }
    } catch (error) {
      setTyping(false);
      botSay("I'm having trouble connecting to my AI brain. Want to browse events instead?", [{ label: '🎵 Browse Events', action: doBrowse }]);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = input.trim();
    if (!val || typing) return;
    setInput('');
    userSay(val);

    if (step === 'ENTER_QTY') {
      const n = parseInt(val, 10);
      if (isNaN(n) || n < 1 || n > 10) {
        botSay('Please enter a number between 1 and 10.');
      } else {
        doConfirm(n);
      }
    } else {
      const lower = val.toLowerCase();
      const triggers = ['browse', 'event', 'show', 'concert', 'book', 'ticket', 'festival', 'discovery', 'buy', 'purchase', 'happen', 'what\'s on', 'find show', 'find event'];
      if (triggers.some(t => lower.includes(t))) {
        doBrowse();
      } else {
        fetchQwenResponse(val);
      }
    }
  };

  const lastId = msgs[msgs.length - 1]?.id;

  async function handleLogin() {
    doLogin(qty);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  function savePendingBooking(n?: number) {
    if (concert && ticket && n) {
      sessionStorage.setItem('festora_pending_booking', JSON.stringify({
        savedConcert: concert,
        savedTicket: ticket,
        savedQty: n
      }));
    }
  }

  const [isRecording, setIsRecording] = useState(false);

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // We don't auto-submit here in React version to let user review, 
      // but we could if desired. Let's match the widget behavior.
      handleSubmitDirect(transcript);
    };
    recognition.start();
  };

  const handleSubmitDirect = (val: string) => {
    if (!val || typing) return;
    setInput('');
    userSay(val);

    if (step === 'ENTER_QTY') {
      const n = parseInt(val, 10);
      if (isNaN(n) || n < 1 || n > 10) {
        botSay('Please enter a number between 1 and 10.');
      } else {
        doConfirm(n);
      }
    } else {
      const lower = val.toLowerCase();
      const triggers = ['browse', 'event', 'show', 'concert', 'book', 'ticket', 'festival', 'discovery', 'buy', 'purchase', 'happen', 'what\'s on', 'find show', 'find event'];
      if (triggers.some(t => lower.includes(t))) {
        doBrowse();
      } else {
        fetchQwenResponse(val);
      }
    }
  };

  async function doLogin(pendingQty?: number) {
    userSay('Sign in with Google');
    savePendingBooking(pendingQty);
    try {
      // Always redirect back to THIS chatbot page, not the main Festora site
      const chatbotUrl = window.location.origin + window.location.pathname;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: chatbotUrl }
      });
      if (error) throw error;
      botSay('Opening Google sign-in… Come back to this page after signing in and your booking will resume automatically! 🎵');
    } catch {
      botSay("Couldn't open sign-in. Make sure your Supabase anon key is set in the .env file.");
    }
  }



  return (
    <div className="app-container">
      <div className="chatbot-window">
        {/* Header */}
        <div className="chatbot-header">
          <div className="bot-avatar"><Bot size={20} color="white" /></div>
          <div className="header-info">
            <h2>Festora Assistant</h2>
            <p>{user ? `${user.user_metadata?.full_name || user.email}` : 'Sign in to book tickets'}</p>
          </div>
          {user && (
            <button className="logout-btn" title="Sign out" onClick={() => supabase.auth.signOut()}>✕</button>
          )}
          {!user && (
            <button className="login-pill" onClick={() => doLogin()}>Sign in</button>
          )}
        </div>

        {/* Messages */}
        <div className="chat-history">
          {msgs.map(m => (
            <div key={m.id} className={`message ${m.sender}`}>
              {m.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
              ))}
              {m.concert && (
                <div className="concert-card-mini">
                  <img src={m.concert.thumb} alt={m.concert.title} />
                  <div>
                    <strong>{m.concert.title}</strong>
                    <span>{m.concert.venue}</span>
                    <span className="price-tag">{m.concert.priceRange}</span>
                  </div>
                </div>
              )}
              {m.opts && (
                <div className="message-options">
                  {m.opts.map((o, i) => (
                    <button
                      key={i}
                      className="option-btn"
                      disabled={typing || m.id !== lastId}
                      onClick={o.action}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="typing-indicator">
              <div className="dot" /><div className="dot" /><div className="dot" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <form className="input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={step === 'ENTER_QTY' ? 'Number of tickets (1–10)…' : 'Type a message…'}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={typing}
            />
            <button
              type="button"
              className={`voice-btn ${isRecording ? 'recording' : ''}`}
              onClick={startVoiceInput}
              title="Voice Input"
              style={{ background: 'none', border: 'none', color: isRecording ? '#EF4444' : '#7c3aed', cursor: 'pointer', padding: '0 8px', display: 'flex', alignItems: 'center' }}
            >
              <Mic size={20} className={isRecording ? 'pulse' : ''} />
            </button>
            <button type="submit" className="send-btn" disabled={!input.trim() || typing}>
              <Send size={16} />
            </button>
          </form>
          <p className="powered-by">Powered by Festora · Supabase</p>
        </div>
      </div>
    </div>
  );
}

async function fetchEvents() {
  const { data, error } = await supabase.from('events').select('*');
  if (error) return [];
  return data;
}

export async function handlePrompt(prompt: string): Promise<string> {
  if (prompt.toLowerCase().includes('yuvan')) {
    const events = await fetchEvents();
    const yuvanEvent = events.find(e => e.name && e.name.toLowerCase().includes('yuvan'));
    if (yuvanEvent) {
      return `Yuvan Concert Details:\nName: ${yuvanEvent.name}\nDate: ${yuvanEvent.date}\nVenue: ${yuvanEvent.venue}`;
    } else {
      return 'No Yuvan concert found.';
    }
  }
  // Add more logic for other queries here
  return 'Sorry, I could not find what you asked for.';
}
