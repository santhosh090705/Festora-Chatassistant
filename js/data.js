// =============================================
// FESTORA – Real India Events 2026
// =============================================

const EVENTS = [
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
  },
  {
    id: 10, slug: "magnetic-fields-nomads-rajasthan-2026",
    title: "Magnetic Fields – Nomads 2026",
    artist: "Rival Consoles, Vieux Farka Touré, Barker", band: "International Electronic & World Artists",
    genre: "edm", type: "festival",
    date: "2026-02-06", time: "18:00",
    venue: "Abheygarh Khetri Fort, Rajasthan",
    city: "Khetri", state: "Rajasthan",
    description: "India's most intimate and curated music festival reinvents itself as 'Nomads' at the majestic Abheygarh Khetri Fort in Rajasthan. Set within a desert palace, Magnetic Fields is an immersive 3-day experience blending electronic music, world sounds and Rajasthani heritage. Artists confirmed: Rival Consoles, Vieux Farka Touré, Barker, and Karshni.",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&q=80",
    price: 5999, priceRange: "₹5,999 – ₹25,000",
    seats: 2000, available: 480,
    tags: ["electronic", "world music", "curated", "boutique", "palace", "rajasthan"],
    badge: "hot", rating: 5.0, reviews: 860,
    ticketTypes: [
      { id: "general", name: "Festival Pass (3 Days)", price: 5999, desc: "All 3 days access", available: 320 },
      { id: "camping", name: "Camping Package (3 Days)", price: 12000, desc: "Festival pass + tented campsite + breakfast", available: 140 },
      { id: "glamping", name: "Palace Glamping", price: 25000, desc: "Luxury room in Abheygarh + all-inclusive meals + full access", available: 20 }
    ],
    lineup: ["Rival Consoles", "Vieux Farka Touré", "Barker", "Karshni", "More TBA"]
  },
  {
    id: 11, slug: "dgtl-india-bengaluru-2026",
    title: "DGTL India – Bengaluru 2026",
    artist: "International Techno & Electronic DJs", band: "Multiple Artists",
    genre: "edm", type: "festival",
    date: "2026-05-09", time: "16:00",
    venue: "Central Grounds, Bengaluru",
    city: "Bengaluru", state: "Karnataka",
    description: "The globally renowned DGTL festival lands in Bengaluru with its signature blend of cutting-edge techno and electronic music, stunning stage design and commitment to sustainability. DGTL India brings the best of Amsterdam's festival culture to the Garden City — a forward-thinking, immersive 2-day electronic experience.",
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&q=80",
    price: 2499, priceRange: "₹2,499 – ₹8,499",
    seats: 12000, available: 4600,
    tags: ["techno", "electronic", "dgtl", "sustainable", "2-day"],
    badge: null, rating: 4.7, reviews: 680,
    ticketTypes: [
      { id: "day1", name: "Day 1 Pass", price: 2499, desc: "Saturday entry", available: 2800 },
      { id: "day2", name: "Day 2 Pass", price: 2499, desc: "Sunday entry", available: 1500 },
      { id: "weekend", name: "Weekend Pass (Both Days)", price: 3999, desc: "Saturday + Sunday", available: 300 }
    ],
    lineup: ["Lineup TBA – International Techno Artists", "Indian Electronic Artists"]
  },
  {
    id: 12, slug: "anyma-aeden-mumbai-2026",
    title: "Anyma – ÆDEN World Tour Mumbai",
    artist: "Anyma (Matteo Milleri)", band: "Anyma",
    genre: "edm", type: "concert",
    date: "2026-11-21", time: "21:00",
    venue: "Mahalaxmi Racecourse, Mumbai",
    city: "Mumbai", state: "Maharashtra",
    description: "One of electronic music's most hyped artists of the decade, Anyma (Matteo Milleri of Tale of Us), brings his sold-out ÆDEN World Tour to Mumbai. After blowing up Coachella and selling out arenas worldwide, Anyma brings his breathtaking audio-visual journey — combining techno, melodic music and mind-bending visuals — for one special night in India.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
    price: 3999, priceRange: "₹3,999 – ₹15,999",
    seats: 8000, available: 1240,
    tags: ["edm", "techno", "anyma", "tale of us", "coachella", "aeden tour"],
    badge: "hot", rating: 4.9, reviews: 390,
    ticketTypes: [
      { id: "general", name: "General Standing", price: 3999, desc: "Open floor", available: 900 },
      { id: "vip", name: "VIP Silver Floor", price: 7999, desc: "Premium central standing section", available: 250 },
      { id: "platinum", name: "Platinum Front Pit", price: 15999, desc: "Front-of-stage pit + merchandise + complimentary drinks", available: 90 }
    ],
    lineup: ["Anyma (Matteo Milleri of Tale of Us)"]
  },

  // ── INDIAN ARTIST CONCERTS ──────────────────────────────────────────────

  {
    id: 13, slug: "anirudh-rockstar-xv-hyderabad",
    title: "Rockstar Anirudh XV – Hyderabad",
    artist: "Anirudh Ravichander", band: "Anirudh Ravichander",
    genre: "bollywood", type: "concert",
    date: "2026-03-21", time: "18:00",
    venue: "Gachibowli Outdoor Stadium, Hyderabad",
    city: "Hyderabad", state: "Telangana",
    description: "Celebrate 15 legendary years of Anirudh Ravichander with his blockbuster 'Rockstar Anirudh XV: 15 Years With You' tour! The maestro behind Leo, Jawan, Vikram, Valimai, Master and countless mass anthems performs LIVE for the first time ever in Hyderabad. Expect a visual and musical spectacle with your favourite tracks performed with a live band, dancers and mind-blowing stage production. An evening Tamil music fans will never forget!",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80",
    price: 1999, priceRange: "₹1,999 – ₹5,999",
    seats: 40000, available: 7800,
    tags: ["tamil", "anirudh", "kollywood", "live concert", "15 years"],
    badge: "hot", rating: 4.9, reviews: 5280,
    ticketTypes: [
      { id: "silver", name: "Silver", price: 1999, desc: "Standing area – Side zones", available: 5000 },
      { id: "gold", name: "Gold", price: 2999, desc: "Centre Standing – Great sightlines", available: 2200 },
      { id: "platinum", name: "Platinum", price: 4999, desc: "Premium front section + fast-track entry", available: 500 },
      { id: "diamond", name: "Diamond VIP", price: 5999, desc: "Front pit + exclusive lounge + meet & greet pass", available: 100 }
    ],
    lineup: ["Anirudh Ravichander (Live)"]
  },

  {
    id: 14, slug: "ar-rahman-wonderment-tour-jaipur",
    title: "A.R. Rahman – The Wonderment Tour",
    artist: "A.R. Rahman", band: "A.R. Rahman & Live Orchestra",
    genre: "classical", type: "concert",
    date: "2026-04-18", time: "19:00",
    venue: "JECC Ground, Jaipur",
    city: "Jaipur", state: "Rajasthan",
    description: "The Oscar-winning, Grammy-winning legend A.R. Rahman brings 'The Wonderment Tour' to Jaipur! An emotional, awe-inspiring concert featuring 30 years of timeless music — from Roja, Dil Se and Lagaan to Slumdog Millionaire, Highway and beyond — performed live with a full orchestra and choir against the magical backdrop of Jaipur. A once-in-a-lifetime musical experience.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
    price: 1499, priceRange: "₹1,499 – ₹9,999",
    seats: 30000, available: 6400,
    tags: ["ar rahman", "oscar winner", "orchestra", "bollywood", "tamil", "world music"],
    badge: "hot", rating: 5.0, reviews: 9120,
    ticketTypes: [
      { id: "general", name: "General Standing", price: 1499, desc: "Open standing area", available: 4500 },
      { id: "gold", name: "Gold Seated", price: 3999, desc: "Reserved seating with excellent view", available: 1500 },
      { id: "platinum", name: "Platinum Seated", price: 6999, desc: "Premium orchestra-side seating", available: 350 },
      { id: "vip", name: "VIP Diamond", price: 9999, desc: "Front-row reserved + AR Rahman meet & greet ballot", available: 50 }
    ],
    lineup: ["A.R. Rahman", "Live Orchestra & Choir", "Special Guests TBA"]
  },

  {
    id: 15, slug: "hip-hop-tamizha-rotdm-homecoming-chennai",
    title: "Hip Hop Tamizha – ROTDM The Home Coming Finale",
    artist: "Hip Hop Tamizha Aadhi", band: "Hip Hop Tamizha",
    genre: "hip-hop", type: "concert",
    date: "2026-03-07", time: "17:00",
    venue: "YMCA Ground, Nandanam, Chennai",
    city: "Chennai", state: "Tamil Nadu",
    description: "The grand finale of Hip Hop Tamizha's 'Return of the Dragon Machi (ROTDM) World Tour' is BACK in Chennai — the city that started it all! Aadhi and his crew bring the ultimate homecoming concert to Nandanam, performing a high-energy setlist featuring chart-topping hits, nostalgic classics and brand new anthems, backed by a live band, incredible dancers, and breathtaking stage production. A historic night for Tamil Hip-Hop.",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854cfde?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1598387993441-a364f854cfde?w=400&q=80",
    price: 999, priceRange: "₹999 – ₹3,999",
    seats: 20000, available: 4200,
    tags: ["hip-hop tamizha", "tamil hip-hop", "aadhi", "ROTDM", "world tour finale", "chennai"],
    badge: "hot", rating: 4.9, reviews: 3640,
    ticketTypes: [
      { id: "general", name: "General Standing", price: 999, desc: "Open standing zone", available: 3000 },
      { id: "gold", name: "Gold Zone", price: 1999, desc: "Central dedicated viewing zone", available: 900 },
      { id: "vip", name: "VIP Front Zone", price: 2999, desc: "Front section + express entry", available: 250 },
      { id: "platinum", name: "Platinum Meet & Greet", price: 3999, desc: "Front pit + post-show M&G with Aadhi", available: 50 }
    ],
    lineup: ["Hip Hop Tamizha Aadhi", "Live Band", "Special Guest Rappers TBA"]
  },

  {
    id: 16, slug: "shankar-ehsaan-loy-raagon-delhi",
    title: "Shankar-Ehsaan-Loy – Raag-On Tour Delhi",
    artist: "Shankar Ehsaan Loy", band: "Shankar Mahadevan, Ehsaan Noorani, Loy Mendonsa",
    genre: "bollywood", type: "concert",
    date: "2026-03-27", time: "19:00",
    venue: "NSIC Exhibition Ground, Okhla, Delhi",
    city: "Delhi", state: "Delhi",
    description: "The iconic trio Shankar Mahadevan, Ehsaan Noorani and Loy Mendonsa bring their spectacular 'Raag-On' live concert tour to Delhi! Relive the greatest soundtracks of Indian cinema — Dil Chahta Hai, Kal Ho Na Ho, Don, Lakshya, Rock On, Bunty Aur Babli, Zindagi Na Milegi Dobara, Bhaag Milkha Bhaag and so much more. An evening of pure nostalgia and incredible live music.",
    image: "https://images.unsplash.com/photo-1501386761578-eaa54b9e7a1e?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1501386761578-eaa54b9e7a1e?w=400&q=80",
    price: 1499, priceRange: "₹1,499 – ₹7,999",
    seats: 18000, available: 5600,
    tags: ["shankar ehsaan loy", "bollywood", "live band", "nostalgia", "hindi cinema", "raag-on"],
    badge: "hot", rating: 4.8, reviews: 2980,
    ticketTypes: [
      { id: "general", name: "General Lawn", price: 1499, desc: "Open lawn standing", available: 4000 },
      { id: "silver", name: "Silver Seated", price: 2999, desc: "Reserved seats – Side zones", available: 1200 },
      { id: "gold", name: "Gold Seated", price: 4999, desc: "Premium block reserved seats", available: 350 },
      { id: "vip", name: "VIP Lounge", price: 7999, desc: "Premium seating + lounge access + complimentary dinner", available: 50 }
    ],
    lineup: ["Shankar Mahadevan", "Ehsaan Noorani", "Loy Mendonsa", "Live Orchestra"]
  },

  {
    id: 17, slug: "yuvan-shankar-raja-live-malaysia-india",
    title: "Yuvan Shankar Raja – U1niverse Live",
    artist: "Yuvan Shankar Raja", band: "Yuvan Shankar Raja",
    genre: "bollywood", type: "concert",
    date: "2026-06-14", time: "18:30",
    venue: "Jawaharlal Nehru Indoor Stadium, Chennai",
    city: "Chennai", state: "Tamil Nadu",
    description: "The incomparable Yuvan Shankar Raja — Tamil cinema's ultimate musical genius — performs LIVE at the iconic JLN Indoor Stadium. Expect a massive setlist spanning his phenomenal career: from Vinnai Thandi Varuvaaya (VTV) and Mankatha to recent blockbusters Kanguva and beyond. A night of soul-stirring music, bass-heavy beats and pure Yuvan magic that every fan dreams of experiencing.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
    price: 1299, priceRange: "₹1,299 – ₹4,999",
    seats: 15000, available: 3900,
    tags: ["yuvan", "tamil", "youtube shankar raja", "U1", "kollywood", "love songs"],
    badge: "new", rating: 4.9, reviews: 4120,
    ticketTypes: [
      { id: "general", name: "General", price: 1299, desc: "General standing – rear sections", available: 2800 },
      { id: "gold", name: "Gold Seated", price: 2499, desc: "Reserved seating – good view", available: 900 },
      { id: "platinum", name: "Platinum Seated", price: 3999, desc: "Premium numbered seat, centre block", available: 170 },
      { id: "vip", name: "VIP Diamond", price: 4999, desc: "Front-row + M&G ballot + exclusive merch", available: 30 }
    ],
    lineup: ["Yuvan Shankar Raja (Live)", "Special Playback Singers TBA"]
  },

  {
    id: 18, slug: "divine-king-rap-concert-mumbai",
    title: "DIVINE x KING – Mumbai Rap Night",
    artist: "DIVINE, KING", band: "DIVINE & KING",
    genre: "hip-hop", type: "concert",
    date: "2026-04-11", time: "20:00",
    venue: "National Sports Club of India (NSCI) Dome, Mumbai",
    city: "Mumbai", state: "Maharashtra",
    description: "Mumbai's own DIVINE and the fastest-rising star KING join forces for an epic joint rap concert at NSCI Dome. DIVINE brings the streets of Dharavi to life with his raw, authentic Gully Boy-era bangers and latest tracks, while KING mesmerises with his melodic rap and cult fanbase. Two of India's biggest hip-hop names on one stage — an electric night of Mumbai rap culture.",
    image: "https://images.unsplash.com/photo-1571512599285-9bda1f5bff32?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1571512599285-9bda1f5bff32?w=400&q=80",
    price: 999, priceRange: "₹999 – ₹4,499",
    seats: 8000, available: 2100,
    tags: ["divine", "king", "gully boy", "mumbai rap", "hindi hip-hop", "desi rap"],
    badge: "hot", rating: 4.8, reviews: 1890,
    ticketTypes: [
      { id: "general", name: "General Floor", price: 999, desc: "Open standing floor", available: 1600 },
      { id: "gold", name: "Gold Zone", price: 1999, desc: "Dedicated central zone", available: 380 },
      { id: "vip", name: "VIP Pit", price: 3499, desc: "Front pit section + early entry", available: 100 },
      { id: "platinum", name: "Platinum Backstage", price: 4499, desc: "Front pit + backstage access + artist selfie", available: 20 }
    ],
    lineup: ["DIVINE", "KING", "Special Guest TBA"]
  },

  {
    id: 19, slug: "nucleya-bass-yatra-bengaluru",
    title: "Nucleya – Bass Yatra Tour Bengaluru",
    artist: "Nucleya", band: "Nucleya",
    genre: "edm", type: "concert",
    date: "2026-05-23", time: "20:00",
    venue: "Palace Grounds, Bengaluru",
    city: "Bengaluru", state: "Karnataka",
    description: "India's bass music overlord Nucleya brings his bone-rattling, earth-shaking 'Bass Yatra' tour to Bengaluru's iconic Palace Grounds! Known for blending electronic bass music with Indian folk elements, Nucleya is one of the most unique acts in the world. Expect bangers like Baby Khatam, Aaja, Laung Gawacha, Street Dancer performed through a MASSIVE sound system. Bass music fans, this one's for you.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    price: 799, priceRange: "₹799 – ₹2,999",
    seats: 12000, available: 5400,
    tags: ["nucleya", "bass music", "indian edm", "electronic", "bass yatra"],
    badge: "new", rating: 4.8, reviews: 2240,
    ticketTypes: [
      { id: "general", name: "General Floor", price: 799, desc: "Open standing – all zones access", available: 4500 },
      { id: "gold", name: "Gold Zone", price: 1499, desc: "Elevated viewing deck", available: 700 },
      { id: "vip", name: "VIP Lounge", price: 2999, desc: "VIP zone, complimentary 1 drink + priority queue", available: 200 }
    ],
    lineup: ["Nucleya (DJ Set)", "Opening Acts TBA"]
  },

  {
    id: 20, slug: "prateek-kuhad-cold-mess-tour-delhi",
    title: "Prateek Kuhad – Cold Mess Tour Delhi",
    artist: "Prateek Kuhad", band: "Prateek Kuhad & Band",
    genre: "pop", type: "concert",
    date: "2026-07-18", time: "19:30",
    venue: "Siri Fort Auditorium, Delhi",
    city: "Delhi", state: "Delhi",
    description: "India's most beloved indie folk-pop singer-songwriter, Prateek Kuhad, comes home to Delhi for a special headline show. Fresh off his critically acclaimed global tour and NH7 Weekender, Prateek performs intimate songs from his Cold Mess, In Tokens and Charms, and new albums with his full live band. Expect lush, emotional performances of 'Kasoor', 'Tune Kaha', 'oh love', and more.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    price: 799, priceRange: "₹799 – ₹3,499",
    seats: 5000, available: 2200,
    tags: ["prateek kuhad", "indie", "folk-pop", "cold mess", "acoustic", "english hindi"],
    badge: null, rating: 4.9, reviews: 3360,
    ticketTypes: [
      { id: "general", name: "General Standing", price: 799, desc: "Standing floor access", available: 1800 },
      { id: "seated", name: "Seated Gallery", price: 1999, desc: "Numbered seat in the gallery", available: 350 },
      { id: "vip", name: "VIP Seated", price: 3499, desc: "Front-section reserved seat + soundcheck access", available: 50 }
    ],
    lineup: ["Prateek Kuhad", "Full Live Band"]
  },

  {
    id: 21, slug: "arijit-singh-tribute-candlelight-delhi",
    title: "Candlelight: Tribute to Arijit Singh – Delhi",
    artist: "Candlelight Live Orchestra", band: "Live Symphony Orchestra",
    genre: "classical", type: "concert",
    date: "2026-03-14", time: "19:30",
    venue: "Shri Ram Centre for Performing Arts, Delhi",
    city: "Delhi", state: "Delhi",
    description: "Experience the soulful music of Arijit Singh like never before — performed by a stunning live string orchestra in an intimate candlelit setting at the prestigious Shri Ram Centre. Over 60 candles and spectacular string arrangements of 'Tum Hi Ho', 'Channa Mereya', 'Ae Dil Hai Mushkil', 'Khairiyat', 'Agar Tum Saath Ho' and more beloved hits. A magical, romantic evening not to be missed.",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80",
    price: 1299, priceRange: "₹1,299 – ₹3,999",
    seats: 500, available: 148,
    tags: ["arijit singh", "candlelight", "tribute", "orchestra", "romantic", "bollywood"],
    badge: "hot", rating: 4.9, reviews: 1840,
    ticketTypes: [
      { id: "general", name: "Standard", price: 1299, desc: "General seating", available: 100 },
      { id: "gold", name: "Gold", price: 2499, desc: "Premium centre seats", available: 40 },
      { id: "vip", name: "VIP Front Row", price: 3999, desc: "Front row + candlelight welcome drink", available: 8 }
    ],
    lineup: ["Live String Orchestra", "Special Guest Vocalists TBA"]
  },

  {
    id: 22, slug: "diljit-dosanjh-born-to-shine-india",
    title: "Diljit Dosanjh – Born to Shine India Tour",
    artist: "Diljit Dosanjh", band: "Diljit Dosanjh",
    genre: "pop", type: "concert",
    date: "2026-08-29", time: "19:00",
    venue: "DY Patil Stadium, Navi Mumbai",
    city: "Navi Mumbai", state: "Maharashtra",
    description: "After his legendary record-breaking Dil-Luminati Tour across India, the King of Punjabi pop and Bollywood crossover, Diljit Dosanjh, returns bigger than ever! His 'Born to Shine India' shows at DY Patil Stadium will be an unforgettable spectacle. From chart-toppers GOAT, Lover, Do You Know, Born To Shine to his Bollywood classics — Diljit live is an experience unlike any other.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
    price: 2499, priceRange: "₹2,499 – ₹12,999",
    seats: 50000, available: 9600,
    tags: ["diljit dosanjh", "punjabi pop", "bollywood", "born to shine", "stadium concert"],
    badge: "hot", rating: 4.9, reviews: 7840,
    ticketTypes: [
      { id: "silver", name: "Silver", price: 2499, desc: "Side standing zones", available: 7000 },
      { id: "gold", name: "Gold", price: 4999, desc: "Centre standing – main floor", available: 2000 },
      { id: "platinum", name: "Platinum", price: 8999, desc: "VIP floor section + fast track entry", available: 500 },
      { id: "diamond", name: "Diamond VIP", price: 12999, desc: "Front pit + hospitality lounge + Diljit selfie draw", available: 100 }
    ],
    lineup: ["Diljit Dosanjh", "Live Band", "Special Guests TBA"]
  }
];

const GENRES = [
  { id: "all", label: "All", icon: "🎵" },
  { id: "rock", label: "Rock", icon: "🎸" },
  { id: "edm", label: "Electronic", icon: "🎧" },
  { id: "jazz", label: "Jazz", icon: "🎷" },
  { id: "pop", label: "Pop", icon: "🎤" },
  { id: "hip-hop", label: "Hip-Hop", icon: "🎤" },
  { id: "bollywood", label: "Bollywood", icon: "🎬" },
  { id: "classical", label: "Orchestral", icon: "🎹" }
];

const CITIES = [
  "All Cities", "Mumbai", "Navi Mumbai", "Pune", "Bengaluru",
  "Delhi", "Chennai", "Hyderabad", "Jaipur", "Goa", "Khetri", "Ziro"
];

// localStorage helpers
const LS = {
  get: (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(key)
};
