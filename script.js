// ─── NAVBAR SCROLL ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ─── MOBILE MENU ───
  function openMobileMenu() {
    document.getElementById('mobileMenu').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // ─── TESTIMONIAL SLIDER ───
  let testiIndex = 0;
  const track = document.getElementById('testiTrack');
  const cards = track.querySelectorAll('.testi-card');
  const dotsContainer = document.getElementById('testiDots');

  function getVisible() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const visible = getVisible();
    const total = Math.ceil(cards.length / visible);
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'testi-dot' + (i === 0 ? ' active' : '');
      d.onclick = () => goToTesti(i);
      dotsContainer.appendChild(d);
    }
  }

  function updateTesti() {
    const visible = getVisible();
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${testiIndex * visible * cardW}px)`;
    const dots = dotsContainer.querySelectorAll('.testi-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === testiIndex));
  }

  function slideTesti(dir) {
    const visible = getVisible();
    const total = Math.ceil(cards.length / visible);
    testiIndex = (testiIndex + dir + total) % total;
    updateTesti();
  }

  function goToTesti(i) {
    testiIndex = i;
    updateTesti();
  }

  buildDots();
  window.addEventListener('resize', () => { testiIndex = 0; buildDots(); updateTesti(); });
  setInterval(() => slideTesti(1), 5000);

  // ─── BOOKING FORM ───
  function submitBooking() {
    const name    = document.getElementById('bName').value.trim();
    const phone   = document.getElementById('bPhone').value.trim();
    const email   = document.getElementById('bEmail').value.trim();
    const date    = document.getElementById('bDate').value;
    const time    = document.getElementById('bTime').value;
    const service = document.getElementById('bService').value;
    const notes   = document.getElementById('bNotes').value.trim();

    // Validation
    if (!name || !phone || !date || !time || !service) {
      alert('Please fill in all required fields (Name, Phone, Date, Time & Service).');
      return;
    }

    // Format date nicely e.g. "Saturday, 15 March 2026"
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    // Format time nicely e.g. "2:30 PM"
    const [hh, mm] = time.split(':');
    const h = parseInt(hh);
    const formattedTime = `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${mm} ${h >= 12 ? 'PM' : 'AM'}`;

    // Build the WhatsApp message
    const msg =
`✂️ *NEW APPOINTMENT REQUEST*
━━━━━━━━━━━━━━━━━━━━
💈 *Hairport Salon — Where Style Takes Flight*
━━━━━━━━━━━━━━━━━━━━

👤 *Client Details*
• Name   : ${name}
• Phone  : ${phone}${email ? `\n• Email  : ${email}` : ''}

🗓️ *Appointment Details*
• Service : ${service}
• Date    : ${formattedDate}
• Time    : ${formattedTime}
${notes ? `\n📝 *Special Requests*\n${notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━
📍 Diksha Apartment, More, near UCO Bank,
   Arrah Kalinagar, Durgapur – 713212
📞 +91 8158966616
⏰ Open Daily: 10:00 AM – 8:00 PM
━━━━━━━━━━━━━━━━━━━━
_Booked via hairportsalon.com_`;

    // Open WhatsApp FIRST (must happen directly inside user click event, not in setTimeout)
    // Otherwise browsers block it as a popup
    const waURL = `https://wa.me/918158966616?text=${encodeURIComponent(msg)}`;
    window.open(waURL, '_blank');

    // Then show success screen
    document.getElementById('formFields').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }

  // ─── CONTACT FORM ───
  function submitContact() {
    const name    = document.getElementById('cName').value.trim();
    const contact = document.getElementById('cContact').value.trim();
    const subject = document.getElementById('cSubject').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    if (!name || !contact) {
      alert('Please fill in your name and contact details.');
      return;
    }

    const msg =
`💬 *NEW MESSAGE — Hairport Salon*
━━━━━━━━━━━━━━━━━━━━
💈 *Hairport Salon — Where Style Takes Flight*
━━━━━━━━━━━━━━━━━━━━

👤 *From*
• Name    : ${name}
• Contact : ${contact}
${subject ? `\n📌 *Subject*\n${subject}\n` : ''}${message ? `\n📝 *Message*\n${message}\n` : ''}
━━━━━━━━━━━━━━━━━━━━
📍 Diksha Apartment, More, near UCO Bank,
   Arrah Kalinagar, Durgapur – 713212
📞 +91 8158966616
⏰ Open Daily: 10:00 AM – 8:00 PM
━━━━━━━━━━━━━━━━━━━━
_Sent via hairportsalon.com_`;

    // Open WhatsApp FIRST directly in click handler (no setTimeout = no popup block)
    const waURL = `https://wa.me/918158966616?text=${encodeURIComponent(msg)}`;
    window.open(waURL, '_blank');

    // Then show success
    document.getElementById('contactMsg').style.display = 'block';
    document.getElementById('contactBtn').disabled = true;
    document.getElementById('contactBtn').style.opacity = '0.5';
  }

  // ─── SET DEFAULT DATE & TIME FOR BOOKING ───
  const dateInput = document.getElementById('bDate');
  const timeInput = document.getElementById('bTime');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
  if (timeInput) {
    const now = new Date();
    // Add 30 minutes to current time
    now.setMinutes(now.getMinutes() + 30);
    // Round up to nearest 30-minute slot
    const mins = now.getMinutes();
    const roundedMins = mins <= 30 ? 30 : 0;
    if (mins > 30) now.setHours(now.getHours() + 1);
    now.setMinutes(roundedMins);
    now.setSeconds(0);
    const h = now.getHours();
    const m = now.getMinutes();
    // Clamp within salon hours (10:00 - 20:00)
    const clampedH = h < 10 ? 10 : h >= 20 ? 19 : h;
    const clampedM = h >= 20 ? 30 : m;
    const timeStr = `${String(clampedH).padStart(2,'0')}:${String(clampedM).padStart(2,'0')}`;
    timeInput.value = timeStr;
  }
// ─── SERVICE MODAL DATA ───
const services = [
  {
    icon: '<i class="fas fa-cut"></i>',
    title: 'Haircuts & Styling',
    desc: 'Our expert stylists deliver precision cuts and runway-inspired styling tailored specifically to your face shape, hair texture, lifestyle, and personality. Whether you want a bold new look or a refined classic, we make every cut count.',
    includes: [
      'Personalised consultation with your stylist',
      'Shampoo & conditioning treatment',
      'Precision cut tailored to face shape',
      'Blow-dry & finish styling',
      'Style tips & home care advice'
    ]
  },
  {
    icon: '<i class="fas fa-palette"></i>',
    title: 'Hair Coloring & Highlights',
    desc: 'From sun-kissed balayage to bold vivids, rich all-over colour, and subtle money-piece highlights — our colour specialists craft stunning, head-turning results using premium professional products.',
    includes: [
      'In-depth colour consultation',
      'Strand test & skin patch test',
      'Premium colour or bleach application',
      'Balayage, ombre, highlights or full colour',
      'Toning & glossing treatment',
      'Aftercare product recommendation'
    ]
  },
  {
    icon: '<i class="fas fa-spa"></i>',
    title: 'Hair Spa & Treatments',
    desc: 'Revive and restore your hair with our luxurious spa therapies. Using advanced deep-conditioning formulas and nourishing masks, we target damage, frizz, breakage, and dullness — leaving your hair silky, strong, and radiant.',
    includes: [
      'Hair & scalp health assessment',
      'Deep cleansing shampoo',
      'Customised nourishing mask or keratin treatment',
      'Scalp massage & steam therapy',
      'Conditioning rinse & blow-dry',
      'Personalised aftercare plan'
    ]
  },
  {
    icon: '<i class="fas fa-user-tie"></i>',
    title: 'Beard Grooming',
    desc: 'A sharp beard makes the man. Our skilled groomers handle everything from precise shaping and trimming to full beard transformations — keeping your facial hair looking clean, defined, and effortlessly stylish.',
    includes: [
      'Beard style consultation',
      'Hot towel prep & softening',
      'Precision trim & shape',
      'Beard line-up & edge detailing',
      'Moisturising beard oil treatment',
      'Finishing & styling'
    ]
  },
  {
    icon: '<i class="fas fa-star"></i>',
    title: 'Facial & Skin Care',
    desc: 'Reveal your natural radiance with our results-driven facials. Tailored to your skin type and concerns — whether oily, dry, sensitive, or combination — each facial is a deeply relaxing, skin-transforming experience.',
    includes: [
      'Skin type & concern analysis',
      'Deep pore cleansing',
      'Exfoliation & blackhead extraction',
      'Customised face mask',
      'Facial massage & serum application',
      'SPF & moisturiser finish'
    ]
  },
  {
    icon: '<i class="fas fa-magic"></i>',
    title: 'Makeup Services',
    desc: 'Our makeup artists bring out your best features with flawless application for any occasion. From soft and natural everyday looks to full glam for events, parties, and special occasions — we make you shine.',
    includes: [
      'Pre-makeup skin prep & primer',
      'Foundation & concealer matching',
      'Eye, lip & contour application',
      'Setting & long-lasting finish',
      'Party, event & occasion looks',
      'Bridal & engagement makeup available'
    ]
  },
  {
    icon: '<i class="fas fa-heart"></i>',
    title: 'Bridal Grooming',
    desc: 'Your wedding day deserves nothing but perfection. Our comprehensive bridal packages are designed to make you look and feel absolutely breathtaking — from the first trial to the final look on your big day.',
    includes: [
      'Bridal consultation & trial session',
      'Bridal hair styling & updo',
      'Full bridal makeup with premium products',
      'Mehndi & pre-bridal skin treatments',
      'Day-of touch-up kit provided',
      'Bridesmaid packages available'
    ]
  },
  {
    icon: '<i class="fas fa-leaf"></i>',
    title: 'Waxing & Beauty',
    desc: 'Achieve smooth, long-lasting results with our gentle yet effective waxing services and full beauty treatments. Our trained therapists ensure a comfortable, hygienic experience every single time.',
    includes: [
      'Full body or targeted waxing',
      'Face waxing (upper lip, brows, chin)',
      'Threading & eyebrow shaping',
      'Arm, leg & underarm waxing',
      'Post-wax soothing lotion',
      'Manicure & pedicure available'
    ]
  },
  {
    icon: '<i class="fas fa-hand-sparkles"></i>',
    title: 'Bridal Mehendi',
    desc: 'Our skilled mehendi artists create breathtaking bridal designs that are as unique as your love story. From traditional patterns to fusion styles, every stroke is crafted with precision and artistry.',
    includes: [
      'Bridal full hand & feet mehendi',
      'Traditional, Arabic & fusion designs',
      'Pre-bridal consultation & design selection',
      'Premium quality natural henna',
      'Quick-dry technique for dark colour',
      'Bridesmaid & family mehendi packages'
    ]
  },
  {
    icon: '<i class="fas fa-paint-brush"></i>',
    title: 'Nail Art',
    desc: 'Express your personality through your nails with our creative nail art services. From elegant minimalism to bold statement designs, our nail artists transform your nails into tiny works of art.',
    includes: [
      'Nail shaping, filing & buffing',
      'Gel, acrylic & regular polish options',
      'Custom nail art & design work',
      'French tips, ombre & glitter styles',
      'Nail extension services',
      'Cuticle care & nourishing treatment'
    ]
  }
];

let currentService = null;

function openServiceModal(index) {
  const s = services[index];
  currentService = s.title;
  document.getElementById('modalIcon').innerHTML = s.icon;
  document.getElementById('modalTitle').textContent = s.title;
  document.getElementById('modalDesc').textContent = s.desc;
  const list = document.getElementById('modalList');
  list.innerHTML = s.includes.map(item => `<li>${item}</li>`).join('');
  const modal = document.getElementById('serviceModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  document.getElementById('serviceModal').style.display = 'none';
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === document.getElementById('serviceModal')) closeServiceModal();
}

function bookThisService() {
  closeServiceModal();
  // Pre-select the service in the booking form
  const select = document.getElementById('bService');
  if (select && currentService) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(currentService.split('&')[0].trim())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeServiceModal();
});
