// =============================================
// FESTORA - Auth, Toast, Utils
// =============================================

// ---- TOAST SYSTEM ----
const Toast = (() => {
    let container;
    const init = () => {
        container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    };
    const icons = {
        success: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>`,
        error: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,
        info: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#9F67FF" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`
    };
    const show = (message, type = 'info', duration = 3500) => {
        init();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `${icons[type]}<span class="toast-msg">${message}</span><button class="toast-close" onclick="this.parentElement.remove()">×</button>`;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(40px)'; toast.style.transition = 'all 0.3s ease'; setTimeout(() => toast.remove(), 300); }, duration);
    };
    return { show, success: (m) => show(m, 'success'), error: (m) => show(m, 'error'), info: (m) => show(m, 'info') };
})();

// ---- CONFIGURATION (REPLACE WITH YOUR KEYS) ----
const SUPABASE_URL = 'https://awdoignuguvsktagucdo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZG9pZ251Z3V2c2t0YWd1Y2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzM1MjAsImV4cCI6MjA4Nzg0OTUyMH0.Uezm4wV5C_9YEVFEBEP4tGIzo_gHMWFmSZnzftTLHnY';
const RAZORPAY_KEY = 'YOUR_RAZORPAY_KEY_ID';

const supabaseClient = window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL'
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// ---- AUTH SYSTEM ----
const Auth = (() => {
    let sessionCache = null;
    let favoritesCache = [];
    let bookingsCache = [];

    const checkAuthSync = async () => {
        if (!supabaseClient) return false;
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            sessionCache = session;
            if (session) {
                // Fetch user data
                const favs = await supabaseClient.from('favorites').select('event_id').eq('user_id', session.user.id);
                if (favs.data) favoritesCache = favs.data.map(f => f.event_id);

                const bks = await supabaseClient.from('bookings').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
                if (bks.data) bookingsCache = bks.data;
            }
            return !!session;
        } catch (e) { console.error('Supabase check auth error', e); return false; }
    };

    const getSession = () => sessionCache;

    const isLoggedIn = () => !!sessionCache;

    const getUser = () => {
        if (!sessionCache) return null;
        return {
            id: sessionCache.user.id,
            name: sessionCache.user.user_metadata.full_name || sessionCache.user.email.split('@')[0],
            email: sessionCache.user.email,
            avatar: sessionCache.user.user_metadata.avatar_url || sessionCache.user.email[0].toUpperCase()
        };
    };

    const loginWithGoogle = async () => {
        if (!supabaseClient) return Toast.error('Supabase keys missing! Check app.js configuration.');
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin + window.location.pathname.replace(/(login|register)\.html/, 'index.html') }
        });
        if (error) Toast.error(error.message);
    };

    const logout = async () => {
        if (!supabaseClient) { sessionCache = null; window.location.href = 'index.html'; return; }
        await supabaseClient.auth.signOut();
        sessionCache = null;
        window.location.href = 'index.html';
    };

    const getBookings = () => bookingsCache;
    const getFavorites = () => favoritesCache;

    const addBooking = async (booking) => {
        booking.user_id = sessionCache?.user?.id;
        bookingsCache.unshift(booking);
        if (supabaseClient && booking.user_id) {
            await supabaseClient.from('bookings').insert(booking);
        }
    };

    const toggleFavorite = async (eventId) => {
        if (!sessionCache) return false;
        const idx = favoritesCache.indexOf(eventId);
        if (idx === -1) {
            favoritesCache.push(eventId);
            if (supabaseClient) await supabaseClient.from('favorites').insert({ user_id: sessionCache.user.id, event_id: eventId });
        } else {
            favoritesCache.splice(idx, 1);
            if (supabaseClient) await supabaseClient.from('favorites').delete().match({ user_id: sessionCache.user.id, event_id: eventId });
        }
        return idx === -1;
    };

    const isFavorite = (eventId) => favoritesCache.includes(eventId);

    const updateUser = async (updates) => {
        if (!sessionCache || !supabaseClient) return;
        Toast.info('Profile update not fully implemented in Supabase without edge functions, but simulated here.');
    };

    return { checkAuthSync, loginWithGoogle, logout, isLoggedIn, getSession, getUser, updateUser, addBooking, getBookings, getFavorites, toggleFavorite, isFavorite };
})();

// ---- NAVBAR SETUP ----
function setupNavbar() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

        const session = Auth.getSession();
        const navActions = document.getElementById('nav-actions');
        if (navActions) {
                if (session) {
                        // Use Gmail avatar if available, else fallback to initial
                        let avatarHtml = '';
                        if (session.user && session.user.user_metadata && session.user.user_metadata.avatar_url) {
                                avatarHtml = `<img src="${session.user.user_metadata.avatar_url}" alt="avatar" class="nav-avatar-img" style="width:32px;height:32px;border-radius:50%">`;
                        } else {
                                const initial = session.name && session.name !== 'undefined' ? session.name[0].toUpperCase() : (session.email ? session.email[0].toUpperCase() : '?');
                                avatarHtml = `<div class="nav-avatar" title="${session.name || ''}">${initial}</div>`;
                        }
                        navActions.innerHTML = `
                <div class="nav-search">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input type="text" placeholder="Search events..." id="nav-search-input" onkeydown="if(event.key==='Enter')navSearch()">
                </div>
                <a href="profile.html" style="text-decoration:none">
                    ${avatarHtml}
                </a>
                <button class="btn btn-outline btn-sm" onclick="Auth.logout()">Logout</button>`;
                } else {
                        navActions.innerHTML = `
                <div class="nav-search">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input type="text" placeholder="Search events..." id="nav-search-input" onkeydown="if(event.key==='Enter')navSearch()">
                </div>
                <a href="login.html" class="btn btn-outline btn-sm">Log In</a>
                <a href="register.html" class="btn btn-primary btn-sm">Sign Up</a>`;
                }
        }
    // Hamburger
    const ham = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (ham && mobileMenu) {
        ham.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }
}

function navSearch() {
    const q = document.getElementById('nav-search-input')?.value.trim();
    if (q) window.location.href = `events.html?q=${encodeURIComponent(q)}`;
}

// ---- REQUIRE AUTH ----
function requireAuth() {
    if (!Auth.isLoggedIn()) {
        LS.set('festora_redirect', window.location.href);
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// ---- FORMAT HELPERS ----
const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
};
const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;
const genreClass = (g) => ({ edm: 'badge-edm', jazz: 'badge-jazz', rock: 'badge-rock', pop: 'badge-pop', 'hip-hop': 'badge-hip-hop', classical: 'badge-classical' }[g] || 'badge-primary');
const genreLabel = (g) => ({ edm: 'Electronic', jazz: 'Jazz', rock: 'Rock', pop: 'Pop', 'hip-hop': 'Hip-Hop', classical: 'Classical' }[g] || g);

// ---- PAGE LOADER ----
function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.4s ease';
        setTimeout(() => loader.remove(), 400);
    }
}

// ---- QR CODE ----
function generateQR(canvas, text) {
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    // Simple pattern QR simulation
    ctx.fillStyle = '#1A1A2E';
    const mod = 21;
    const cell = size / mod;
    const data = [];
    for (let i = 0; i < mod; i++) { data[i] = []; for (let j = 0; j < mod; j++) data[i][j] = Math.random() > 0.5 ? 1 : 0; }
    // Finder patterns
    [[0, 0], [0, mod - 7], [mod - 7, 0]].forEach(([r, c]) => {
        for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
            data[r + i][c + j] = (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) ? 1 : 0;
        }
    });
    for (let i = 0; i < mod; i++) for (let j = 0; j < mod; j++) {
        if (data[i][j]) { ctx.fillStyle = '#1A1A2E'; ctx.fillRect(j * cell, i * cell, cell - 0.5, cell - 0.5); }
    }
}

// ---- EMAILJS TICKET ----
async function sendTicketEmail(booking) {
    // Using EmailJS - user must configure their own keys
    const templateParams = {
        to_email: booking.email,
        to_name: booking.name,
        event_name: booking.eventTitle,
        event_date: formatDate(booking.eventDate),
        event_venue: booking.venue,
        ticket_id: booking.ticketId,
        ticket_type: booking.ticketType,
        quantity: booking.quantity,
        total_amount: formatPrice(booking.totalAmount),
        booking_id: booking.bookingId,
        seat_info: booking.seats || 'Open Access',
    };

    // Check if emailjs is loaded
    if (typeof emailjs !== 'undefined' && emailjs.send) {
        try {
            await emailjs.send('service_festora', 'template_ticket', templateParams);
            return true;
        } catch (e) {
            console.warn('EmailJS error:', e);
            return false;
        }
    }
    return false; // EmailJS not configured, ticket shown on screen
}

// ---- GENERATE BOOKING ----
function createBooking(event, ticketType, qty, userInfo, paymentInfo) {
    return {
        bookingId: 'FST' + Date.now().toString(36).toUpperCase(),
        ticketId: 'TKT-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        venue: event.venue,
        ticketType: ticketType.name,
        ticketTypeId: ticketType.id,
        quantity: qty,
        pricePerTicket: ticketType.price,
        totalAmount: ticketType.price * qty,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone || '',
        paymentMethod: paymentInfo.method,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
        genre: event.genre,
        image: event.thumb
    };
}

window.addEventListener('DOMContentLoaded', async () => {
    await Auth.checkAuthSync();
    setupNavbar();
    setTimeout(hideLoader, 600);
});
