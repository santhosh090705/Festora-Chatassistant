// Modern Chat Assistant Widget with API integration
(function() {
  // Create floating button
  const chatBtn = document.createElement('div');
  chatBtn.id = 'modern-chat-btn';
  chatBtn.style.position = 'fixed';
  chatBtn.style.right = '32px';
  chatBtn.style.bottom = '32px';
  chatBtn.style.width = '64px';
  chatBtn.style.height = '64px';
  chatBtn.style.background = 'linear-gradient(135deg,#a78bfa,#f472b6)';
  chatBtn.style.borderRadius = '50%';
  chatBtn.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
  chatBtn.style.display = 'flex';
  chatBtn.style.alignItems = 'center';
  chatBtn.style.justifyContent = 'center';
  chatBtn.style.zIndex = '9999';
  chatBtn.style.cursor = 'pointer';
  chatBtn.innerHTML = `<svg width='32' height='32' viewBox='0 0 24 24' fill='none'><circle cx='12' cy='12' r='12' fill='url(#grad)'/><rect x='7' y='9' width='10' height='6' rx='2' fill='white'/><rect x='9' y='11' width='6' height='2' rx='1' fill='#a78bfa'/><defs><linearGradient id='grad' x1='0' y1='0' x2='24' y2='24'><stop stop-color='#a78bfa'/><stop offset='1' stop-color='#f472b6'/></linearGradient></defs></svg>`;
  document.body.appendChild(chatBtn);

  // Create popup chat
  const chatPopup = document.createElement('div');
  chatPopup.id = 'modern-chat-popup';
  chatPopup.style.position = 'fixed';
  chatPopup.style.right = '32px';
  chatPopup.style.bottom = '110px';
  chatPopup.style.width = '370px';
  chatPopup.style.maxHeight = '520px';
  chatPopup.style.height = '520px';
  chatPopup.style.background = '#181826';
  chatPopup.style.borderRadius = '18px';
  chatPopup.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
  chatPopup.style.zIndex = '9999';
  chatPopup.style.display = 'none';
  chatPopup.style.flexDirection = 'column';
  chatPopup.style.overflow = 'hidden';
  chatPopup.innerHTML = `
    <div style="background:linear-gradient(135deg,#a78bfa,#f472b6);color:#fff;padding:16px 22px;font-weight:700;font-size:1.2rem;display:flex;align-items:center;gap:8px">
      <span style='font-size:1.5rem;'>💬</span> Festora Assistant
      <button id="modern-chat-close" style="margin-left:auto;background:none;border:none;color:#fff;font-size:1.3rem;cursor:pointer">×</button>
    </div>
    <div id="modern-chat-messages" style="flex:1;padding:18px;overflow-y:auto;font-size:1rem;color:#eee"></div>
    <form id="modern-chat-form" style="display:flex;padding:14px 18px;background:#23233a;gap:10px">
      <input id="modern-chat-input" type="text" placeholder="Ask me anything..." style="flex:1;padding:10px 14px;border-radius:10px;border:none;font-size:1rem;background:#181826;color:#fff" autocomplete="off" />
      <button type="submit" style="background:linear-gradient(135deg,#a78bfa,#f472b6);color:#fff;border:none;padding:10px 18px;border-radius:10px;font-weight:600;cursor:pointer">Send</button>
    </form>
  `;
  document.body.appendChild(chatPopup);

  // Show popup on button click
  chatBtn.onclick = () => {
    chatPopup.style.display = 'flex';
  };
  // Hide popup on close
  chatPopup.querySelector('#modern-chat-close').onclick = () => {
    chatPopup.style.display = 'none';
  };

  // Chat logic
  const chatMessages = chatPopup.querySelector('#modern-chat-messages');
  const chatForm = chatPopup.querySelector('#modern-chat-form');
  const chatInput = chatPopup.querySelector('#modern-chat-input');

  function addChatMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.style.marginBottom = '12px';
    msg.style.textAlign = sender === 'user' ? 'right' : 'left';
    msg.innerHTML = `<span style="background:${sender==='user'?'#a78bfa':'#23233a'};color:#fff;padding:10px 14px;border-radius:10px;display:inline-block;max-width:80%">${text}</span>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function fetchAssistantReply(question) {
    // Replace with your real API endpoint
    const apiUrl = 'https://festora-backend-api.example.com/assistant'; // <-- Update to your backend endpoint
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      return data.reply ? data.reply : 'Sorry, I could not fetch a reply.';
    } catch (err) {
      return 'Sorry, there was an error connecting to the assistant.';
    }
  }

  chatForm.onsubmit = async (e) => {
    e.preventDefault();
    const question = chatInput.value.trim();
    if (!question) return;
    addChatMessage(question, 'user');
    chatInput.value = '';
    addChatMessage('Thinking...', 'bot');
    const botMsg = await fetchAssistantReply(question);
    // Remove 'Thinking...' and add real reply
    chatMessages.lastChild.remove();
    addChatMessage(botMsg, 'bot');
  };

  addChatMessage('Hi! I am Festora Assistant. How can I help you?', 'bot');
})();
