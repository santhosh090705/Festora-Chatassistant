# Festora – Event Booking Platform

Festora is a modern web application for discovering and booking tickets to concerts, festivals, and events across India. It features user authentication, ticket management, payment integration, and a smart AI-powered chat assistant.

## Features
- Browse and search for upcoming events
- User registration and login (Supabase authentication)
- Book tickets and view bookings
- Add events to favorites
- Secure online payments (Razorpay integration)
- Instant ticket delivery to Gmail
- Responsive, mobile-friendly UI
- **Smart AI Chat Assistant:** Qwen 2.5-powered bot with voice support (TTS/STT)

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (Vanilla & React)
- **Auth & Data:** Supabase
- **Payments:** Razorpay
- **AI:** Qwen 2.5 via OpenRouter
- **Deployment:** Netlify

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/santhosh090705/Festora.git
cd Festora
```

### 2. Local Development
For development, use Vite (recommended) or a simple server:
```bash
npm install
npm run dev
```

### 3. Setup
- **Supabase:** Replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `js/app.js`
- **AI:** Add your OpenRouter API key to `js/chatbot-widget.js`
- **Payments:** Replace `RAZORPAY_KEY` in `js/app.js`

## License
MIT

---

**Live Demo:** [festora-bookingsite.netlify.app](https://festora-bookingsite.netlify.app)
**Author:** Santhosh
