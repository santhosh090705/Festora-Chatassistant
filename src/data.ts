// Data extracted exact match from Festora/js/data.js

export interface TicketType {
    id: string;
    name: string;
    price: number;
    desc: string;
    available: number;
}

export interface EventMatch {
    id: number;
    slug: string;
    title: string;
    artist: string;
    band: string;
    genre: string;
    type: string;
    date: string;
    time: string;
    venue: string;
    city: string;
    state: string;
    description: string;
    image: string;
    thumb: string;
    price: number;
    priceRange: string;
    seats: number;
    available: number;
    tags: string[];
    badge: string | null;
    rating: number;
    reviews: number;
    ticketTypes: TicketType[];
    lineup: string[];
}

export const EVENTS: EventMatch[] = [
    {
        id: 1, slug: "lollapalooza-india-2026",
        title: "Lollapalooza India 2026",
        artist: "Linkin Park, Playboi Carti, YUNGBLUD", band: "Multiple International Artists",
        genre: "rock", type: "festival",
        date: "2026-01-24", time: "14:00",
        venue: "Mahalaxmi Racecourse, Mumbai",
        city: "Mumbai", state: "Maharashtra",
        description: "The fourth edition of Lollapalooza India returns to Mahalaxmi Racecourse, Mumbai. Headlined by the legendary Linkin Park making their long-awaited India comeback, alongside Playboi Carti, YUNGBLUD and Kehlani. India's finest artists round out the lineup across multiple stages. A 2-day mega festival from 2 PM to 10 PM both days.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
        price: 4999, priceRange: "₹4,999 – ₹19,999",
        seats: 60000, available: 8240,
        tags: ["rock", "international", "linkin park", "festival", "multi-stage"],
        badge: "hot", rating: 4.9, reviews: 6480,
        ticketTypes: [
            { id: "general", name: "General Admission (2-Day)", price: 4999, desc: "Both days, open field access", available: 6000 },
            { id: "vip", name: "VIP Pass (2-Day)", price: 9999, desc: "Premium viewing deck + lounge + bar", available: 1800 },
            { id: "platinum", name: "Platinum All-Access", price: 19999, desc: "Backstage access + artist meet & greet + premium hospitality", available: 440 }
        ],
        lineup: ["Linkin Park", "Playboi Carti", "YUNGBLUD", "Kehlani", "Indian Artists TBA"]
    },
    {
        id: 2, slug: "nh7-weekender-2026",
        title: "NH7 Weekender 2026",
        artist: "Prateek Kuhad, KING, Indian Ocean", band: "Multiple Artists",
        genre: "pop", type: "festival",
        date: "2026-03-13", time: "15:00",
        venue: "Mahalakshmi Lawns, Pune",
        city: "Pune", state: "Maharashtra",
        description: "India's 'Happiest Music Festival' returns to Pune with a stunning 3-day lineup. Prateek Kuhad, KING, Indian Ocean, Nucleya & Friends, Raftaar x Kr$na, Talwiinder, Aditya Gadhvi and more take the stage at Mahalakshmi Lawns. NH7 Weekender is where good music meets great vibes — a celebration of independent Indian music.",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
        price: 2999, priceRange: "₹2,999 – ₹9,999",
        seats: 20000, available: 5200,
        tags: ["indie", "folk", "pop", "hip-hop", "happy festival", "family"],
        badge: "hot", rating: 4.8, reviews: 3840,
        ticketTypes: [
            { id: "day1", name: "Day Pass (Single Day)", price: 2999, desc: "Entry for 1 day of your choice", available: 3000 },
            { id: "weekend", name: "Weekend Pass (3-Day)", price: 6999, desc: "All 3 days + camping option", available: 1800 },
            { id: "vip", name: "VIP Weekend Pass", price: 9999, desc: "3 days + VIP lounge + priority entry", available: 400 }
        ],
        lineup: ["Prateek Kuhad", "KING", "Indian Ocean", "Nucleya & Friends", "Raftaar x Kr$na", "Talwiinder", "Aditya Gadhvi", "Aditya Rikhari"]
    },
    {
        id: 3, slug: "calvin-harris-india-tour-bengaluru",
        title: "Calvin Harris India Tour – Bengaluru",
        artist: "Calvin Harris", band: "Calvin Harris",
        genre: "edm", type: "concert",
        date: "2026-04-17", time: "20:00",
        venue: "NICE Grounds, Bengaluru",
        city: "Bengaluru", state: "Karnataka",
        description: "Global superstar Calvin Harris makes his epic India debut! The world's highest-paid DJ brings his legendary production and greatest hits to Bengaluru, kicking off a 3-city India tour powered by Sunburn. Expect hits from Funk Wav Bounces, 18 Months, Motion and more in a spectacular live AV show.",
        image: "https://images.unsplash.com/photo-1571266028027-5d3a0e2b7f4e?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1571266028027-5d3a0e2b7f4e?w=400&q=80",
        price: 3499, priceRange: "₹3,499 – ₹14,999",
        seats: 15000, available: 3100,
        tags: ["edm", "calvin harris", "international", "dj", "sunburn"],
        badge: "hot", rating: 4.9, reviews: 2100,
        ticketTypes: [
            { id: "general", name: "General Standing", price: 3499, desc: "Open floor access", available: 2400 },
            { id: "silver", name: "Silver Zone", price: 5999, desc: "Designated viewing area with better sightlines", available: 500 },
            { id: "gold", name: "Gold VIP", price: 9999, desc: "Front viewing section + bar access", available: 150 },
            { id: "platinum", name: "Platinum Package", price: 14999, desc: "Pit access + complimentary drinks + premium merch", available: 50 }
        ],
        lineup: ["Calvin Harris"]
    },
    {
        id: 4, slug: "bandland-2026-bengaluru",
        title: "Bandland 2026 – Muse India Debut",
        artist: "Muse, Train", band: "Multiple Rock Bands",
        genre: "rock", type: "festival",
        date: "2026-02-14", time: "17:00",
        venue: "NICE Grounds, Bengaluru",
        city: "Bengaluru", state: "Karnataka",
        description: "India's biggest rock festival returns for Valentine's Day weekend. The biggest draw: MUSE makes their long-awaited India debut! The British rock icons are joined by American rock legends Train and a stacked lineup of international and Indian rock acts. A 2-day rock spectacular you simply cannot miss.",
        image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80",
        price: 3999, priceRange: "₹3,999 – ₹12,999",
        seats: 25000, available: 4800,
        tags: ["rock", "muse", "train", "international", "2-day"],
        badge: "hot", rating: 4.8, reviews: 1890,
        ticketTypes: [
            { id: "day", name: "Single Day Pass", price: 3999, desc: "1 day of your choice", available: 3500 },
            { id: "both", name: "Both Days Pass", price: 6999, desc: "Access to both festival days", available: 1100 },
            { id: "vip", name: "Rockstar VIP (Both Days)", price: 12999, desc: "Premium stage-front area + hospitality lounge", available: 200 }
        ],
        lineup: ["Muse", "Train", "Indian Rock Acts TBA"]
    },
    {
        id: 5, slug: "sunburn-festival-goa-2026",
        title: "Sunburn Festival Goa 2026",
        artist: "International DJ Lineup", band: "Various International DJs",
        genre: "edm", type: "festival",
        date: "2026-12-31", time: "16:00",
        venue: "Anjuna Beach Grounds, North Goa",
        city: "Goa", state: "Goa",
        description: "Asia's largest and most iconic dance music festival returns to Goa for New Year's Eve! Sunburn Festival 2026 is a 2-day extravaganza at Anjuna, Mapusa, North Goa, welcoming the New Year with the world's biggest electronic music stars, jaw-dropping stage production, and the legendary Goa sunset. The ultimate NYE experience.",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
        price: 4499, priceRange: "₹4,499 – ₹17,999",
        seats: 50000, available: 12000,
        tags: ["edm", "NYE", "dj", "beach", "goa", "asia largest"],
        badge: "hot", rating: 4.9, reviews: 8920,
        ticketTypes: [
            { id: "general", name: "General (2 Days)", price: 4499, desc: "Both days open grounds access", available: 9000 },
            { id: "vip", name: "VIP (2 Days)", price: 9999, desc: "Premium viewing + lounge + complimentary drink on entry", available: 2400 },
            { id: "platinum", name: "Platinum NYE", price: 17999, desc: "Table seating + bottle service + VIP host", available: 600 }
        ],
        lineup: ["Lineup TBA – International Artists", "India's top DJs"]
    },
    {
        id: 6, slug: "rolling-loud-india-2026",
        title: "Rolling Loud India 2026",
        artist: "International Hip-Hop Lineup", band: "Multiple Hip-Hop Artists",
        genre: "hip-hop", type: "festival",
        date: "2026-11-22", time: "15:00",
        venue: "DY Patil Stadium, Navi Mumbai",
        city: "Navi Mumbai", state: "Maharashtra",
        description: "The world's largest and most iconic hip-hop festival, Rolling Loud, returns for its second India edition at DY Patil Stadium in Navi Mumbai. A 2-day celebration of rap, trap and hip-hop culture with massive international headliners alongside India's finest rap artists. The biggest hip-hop event India has ever seen.",
        image: "https://images.unsplash.com/photo-1571512599285-9bda1f5bff32?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1571512599285-9bda1f5bff32?w=400&q=80",
        price: 3999, priceRange: "₹3,999 – ₹14,999",
        seats: 40000, available: 11500,
        tags: ["hip-hop", "rap", "trap", "rolling loud", "international"],
        badge: "new", rating: 4.8, reviews: 1240,
        ticketTypes: [
            { id: "general", name: "General (2 Days)", price: 3999, desc: "Both days floor access", available: 9000 },
            { id: "vip", name: "VIP (2 Days)", price: 7999, desc: "Premium area + skip-the-queue", available: 2000 },
            { id: "platinum", name: "Artist Experience", price: 14999, desc: "Meet & greet + platinum zone + merch bundle", available: 500 }
        ],
        lineup: ["Headliners TBA (International)", "DIVINE", "Raftaar", "Seedhe Maut", "Kr$na", "Encore ABJ"]
    },
    {
        id: 7, slug: "keinemusik-mumbai-2026",
        title: "Keinemusik Mumbai 2026",
        artist: "Keinemusik Collective", band: "&ME, Rampa, Adam Port, Reznik",
        genre: "edm", type: "club",
        date: "2026-03-27", time: "17:00",
        venue: "Mahalaxmi Racecourse, Mumbai",
        city: "Mumbai", state: "Maharashtra",
        description: "Berlin's legendary electronic music collective Keinemusik — comprising &ME, Rampa, Adam Port and Reznik — brings their iconic open-air daytime experience to Mumbai's Mahalaxmi Racecourse. Known for their deep, melodic, hypnotic sets that last for hours, Keinemusik is a bucket-list experience for any electronic music fan.",
        image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&q=80",
        price: 2999, priceRange: "₹2,999 – ₹8,999",
        seats: 8000, available: 1800,
        tags: ["edm", "techno", "melodic", "keinemusik", "berlin", "open-air"],
        badge: "hot", rating: 4.9, reviews: 740,
        ticketTypes: [
            { id: "general", name: "General Entry", price: 2999, desc: "Open grounds access", available: 1400 },
            { id: "vip", name: "VIP Terrace", price: 5999, desc: "Elevated terrace + 1 drink token", available: 300 },
            { id: "platinum", name: "Platinum Table", price: 8999, desc: "Reserved table for 4 + bottle service", available: 100 }
        ],
        lineup: ["&ME", "Rampa", "Adam Port", "Reznik"]
    },
    {
        id: 8, slug: "ziro-festival-2026-arunachal",
        title: "Ziro Festival of Music 2026",
        artist: "Indian Independent Artists", band: "Multiple Indian & International Artists",
        genre: "pop", type: "festival",
        date: "2026-09-25", time: "14:00",
        venue: "Ziro Valley, Lower Subansiri",
        city: "Ziro", state: "Arunachal Pradesh",
        description: "Nestled in the breathtaking Ziro Valley of Arunachal Pradesh, the Ziro Festival of Music is India's most unique and magical music festival. Set against a stunning backdrop of rice paddies and mountains, this boutique festival celebrates independent Indian folk, jazz, electronica and world music in an eco-friendly, outdoor setting.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80",
        price: 3500, priceRange: "₹3,500 – ₹8,500",
        seats: 5000, available: 1900,
        tags: ["folk", "indie", "world music", "northeast", "nature", "boutique"],
        badge: "new", rating: 4.9, reviews: 1540,
        ticketTypes: [
            { id: "general", name: "Festival Pass (4 Days)", price: 3500, desc: "All 4 days access, camping grounds", available: 1600 },
            { id: "camping", name: "Camping + Festival (4 Days)", price: 5500, desc: "4 days + organized tent camping", available: 250 },
            { id: "vip", name: "VIP Glamping Package", price: 8500, desc: "Luxury tent stay + meals + priority entry", available: 50 }
        ],
        lineup: ["Shilpa Rao", "Swarathma", "Indian Ocean", "Dualist Inquiry", "Barmer Boys", "Gauley Bhai", "International Artists TBA"]
    },
    {
        id: 9, slug: "echoes-of-earth-bengaluru-2026",
        title: "Echoes of Earth 2026",
        artist: "Monolink, Bedouin, Stavroz", band: "International Electronic Artists",
        genre: "edm", type: "festival",
        date: "2026-12-12", time: "16:00",
        venue: "Embassy International Riding School, Bengaluru",
        city: "Bengaluru", state: "Karnataka",
        description: "India's most celebrated sustainability-focused electronic music festival returns for 2026. Echoes of Earth is set in the lush, sprawling Embassy Riding School, blending world-class electronic music with nature-themed art installations and zero-waste principles. A festival where you immerse yourself in music AND the environment.",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
        price: 3999, priceRange: "₹3,999 – ₹11,999",
        seats: 10000, available: 3200,
        tags: ["edm", "techno", "sustainability", "art", "nature", "eco-festival"],
        badge: "new", rating: 4.9, reviews: 2100,
        ticketTypes: [
            { id: "general", name: "Festival Pass (2 Days)", price: 3999, desc: "Both days open grounds", available: 2600 },
            { id: "vip", name: "VIP Forest Lounge", price: 7999, desc: "Premium lounge area with nature canopy + 2 drinks", available: 480 },
            { id: "platinum", name: "Earth Platinum", price: 11999, desc: "Exclusive area + sustainably catered dining + merchandise", available: 120 }
        ],
        lineup: ["Monolink (Live)", "Bedouin", "Stavroz", "Sebastian Mullaert", "Anish Kumar", "Varijashree Venugopal", "Aroop Roy"]
    }
];
