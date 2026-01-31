const CONFIG = {
    businessName: "Fundo Palmira",
    address: "Campiña, Av. Centenario 1587, Huacho",
    phoneTel: "+51 900 000 000", // cámbialo
    whatsappNumber: "51900000000", // cámbialo (sin +, solo números)
    mapsLink: "https://maps.app.goo.gl/DTMoVSpuYsPeqQJT7",

    // ✅ IMÁGENES: solo cambia rutas y listo
    images: {
        hero: "images/hero.jpg",
        heroSide: "images/local.jpg",
        about: "images/local.jpg"
    },

    hero: {
        subtitle: "Ideal para almuerzos familiares, grupos y fines de semana: buena sazón, espacios amplios y naturaleza.",
        chips: ["🌿 Ambiente campestre", "🍽️ Comida criolla", "👨‍👩‍👧‍👦 Ideal para familias", "🎉 Eventos y celebraciones"]
    },

    // Horario (0=Dom, 1=Lun...)
    schedule: {
        1: {
            open: "12:00",
            close: "17:30"
        },
        2: {
            open: "12:00",
            close: "17:30"
        },
        3: {
            open: "12:00",
            close: "17:30"
        },
        4: {
            open: "12:00",
            close: "17:30"
        },
        5: {
            open: "12:00",
            close: "17:30"
        },
        6: {
            open: "12:00",
            close: "17:30"
        },
        0: {
            open: "12:00",
            close: "17:30"
        }
    },

    featuredMenu: [{
            name: "Chancho al palo",
            desc: "Clásico campestre, ideal para compartir.",
            price: 45.00,
            image: "images/platos/chancho.jpg"
        },
        {
            name: "Arroz con pato",
            desc: "Tradicional, con toque norteño.",
            price: 50.00,
            image: "images/platos/arroz-pato.jpg"
        },
        {
            name: "Pachamanca (porción)",
            desc: "Sabor andino en versión campestre.",
            price: 40.00,
            image: "images/platos/pachamanca.jpg"
        },
        {
            name: "Parrilla familiar",
            desc: "Para grupo: carnes + guarniciones.",
            price: 120.00,
            image: "images/platos/parrilla.jpg"
        }
    ],

    features: [{
            title: "Espacios amplios",
            desc: "Zonas al aire libre para disfrutar con calma."
        },
        {
            title: "Ideal para grupos",
            desc: "Familias, amigos y celebraciones."
        },
        {
            title: "Sazón criolla",
            desc: "Platos típicos con porciones generosas."
        },
        {
            title: "Reservas rápidas",
            desc: "Coordina por WhatsApp o llamada."
        }
    ],

    gallery: [
        "images/galeria/g1.jpg",
        "images/galeria/g2.jpg",
        "images/galeria/g3.jpg",
        "images/galeria/g4.jpg",
    ],

    events: [{
            title: "Domingo familiar",
            desc: "Recomendado para grupos y reservas tempranas."
        },
        {
            title: "Fechas festivas",
            desc: "Capacidad limitada en feriados: consulta disponibilidad."
        },
        {
            title: "Cumpleaños / celebraciones",
            desc: "Separación de mesas y coordinación por WhatsApp."
        }
    ],

    socials: [{
            name: "Facebook",
            url: "https://www.facebook.com/elfundopalmira", // <-- cambia esto
            icon: "images/icons/facebook.svg" // <-- ruta a tu SVG
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/elfundopalmira?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", // <-- cambia esto
            icon: "images/icons/instagram.svg" // <-- ruta a tu SVG
        },
        // Opcional: si luego tienes TikTok
        // {
        //   name: "TikTok",
        //   url: "https://tiktok.com/@tu_cuenta",
        //   icon: "images/icons/tiktok.svg"
        // }
    ],

};

// ---------- Helpers ----------
const qs = (s, r = document) => r.querySelector(s);
const money = (n) => `S/ ${Number(n).toFixed(2)}`;
const waUrl = (msg) => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

function parseTimeToMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
}

function todaySchedule() {
    const day = new Date().getDay();
    return CONFIG.schedule[day];
}

function isOpenNow() {
    const s = todaySchedule();
    if (!s) return {
        open: false,
        label: "Cerrado",
        info: "Hoy cerrado"
    };

    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const o = parseTimeToMinutes(s.open);
    const c = parseTimeToMinutes(s.close);
    const open = nowMin >= o && nowMin < c;

    return {
        open,
        label: open ? "Abierto" : "Cerrado",
        info: `Hoy: ${s.open}–${s.close}`
    };
}

function setImgOrFallback(imgEl, src) {
    // Si no hay src o falla carga -> ocultar imagen (no rompe layout)
    if (!src) {
        imgEl.style.display = "none";
        return;
    }
    imgEl.src = src;
    imgEl.onerror = () => {
        imgEl.style.display = "none";
    };
}

// ---------- Render ----------
function renderHero() {
    qs("#bizName").textContent = CONFIG.businessName;
    qs("#bizName2").textContent = CONFIG.businessName;
    qs("#bizAddress").textContent = CONFIG.address;
    qs("#bizAddress2").textContent = CONFIG.address;
    qs("#addressLong").textContent = CONFIG.address;
    qs("#bizWhats").textContent = `+${CONFIG.whatsappNumber}`;

    qs("#heroSubtitle").textContent = CONFIG.hero.subtitle;

    // Hero background (imagen)
    const heroBg = qs("#heroBg");
    heroBg.style.background =
        `linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.82)), url("${CONFIG.images.hero}") center/cover no-repeat`;

    setImgOrFallback(qs("#heroSideImg"), CONFIG.images.heroSide);
    setImgOrFallback(qs("#aboutImg"), CONFIG.images.about);

    // Chips
    const chips = qs("#heroChips");
    chips.innerHTML = "";
    CONFIG.hero.chips.forEach(t => {
        const span = document.createElement("span");
        span.className = "chip";
        span.textContent = t;
        chips.appendChild(span);
    });

    // Maps buttons
    qs("#btnMaps").href = CONFIG.mapsLink;
    qs("#btnMaps2").href = CONFIG.mapsLink;

    // Tel
    qs("#btnCall").href = `tel:${CONFIG.phoneTel.replace(/\s/g,"")}`;

    // Map iframe (embed genérico por query; funciona sin pb)
    const mapIframe = qs("#mapIframe");
    mapIframe.src = `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.businessName + " Huacho")}&output=embed`;
}

function renderSchedule() {
    const st = isOpenNow();
    const badge = qs("#openBadge");
    const today = qs("#todayHours");
    const compact = qs("#hoursCompact");
    const long = qs("#hoursLong");

    today.textContent = st.info;
    compact.textContent = st.info.replace("Hoy: ", "");
    long.textContent = "Consulta por WhatsApp (horario puede variar por fecha).";

    badge.textContent = st.open ? "🟢 Abierto" : "🔴 Cerrado";
    badge.classList.toggle("badge--open", st.open);
    badge.classList.toggle("badge--closed", !st.open);
}

function renderMenu() {
    const grid = qs("#menuGrid");
    grid.innerHTML = "";

    CONFIG.featuredMenu.forEach(item => {
        const card = document.createElement("article");
        card.className = "cardProd";
        card.innerHTML = `
        <div class="cardProd__imgWrap">
          <img alt="${item.name}" loading="lazy">
        </div>
        <div class="cardProd__body">
          <h3 class="cardProd__title">${item.name}</h3>
          <p class="cardProd__desc">${item.desc}</p>
          <div class="cardProd__row">
            <div class="price">${money(item.price)}</div>
            <button class="btn btn--wa" type="button">Pedir</button>
          </div>
        </div>
      `;

        const img = card.querySelector("img");
        setImgOrFallback(img, item.image);

        const btn = card.querySelector("button");
        btn.addEventListener("click", () => {
            const msg =
                `Hola 👋, quisiera reservar/consultar en *${CONFIG.businessName}*.\n\n` +
                `Me interesa: *${item.name}* (${money(item.price)})\n` +
                `¿Está disponible hoy? ¿Podemos reservar mesa?`;
            window.open(waUrl(msg), "_blank", "noopener");
        });

        grid.appendChild(card);
    });
}

function renderFeatures() {
    const grid = qs("#featuresGrid");
    grid.innerHTML = "";
    CONFIG.features.forEach(f => {
        const el = document.createElement("div");
        el.className = "feature";
        el.innerHTML = `<div class="feature__t">${f.title}</div><div class="feature__d">${f.desc}</div>`;
        grid.appendChild(el);
    });
}

function renderGallery() {
    const g = qs("#galleryGrid");
    g.innerHTML = "";
    CONFIG.gallery.forEach(src => {
        const img = document.createElement("img");
        img.loading = "lazy";
        img.alt = "Foto Fundo Palmira";
        img.src = src;
        img.onerror = () => img.style.display = "none";
        g.appendChild(img);
    });
}

function renderEvents() {
    const grid = qs("#eventsGrid");
    grid.innerHTML = "";
    CONFIG.events.forEach(e => {
        const el = document.createElement("div");
        el.className = "eventCard";
        el.innerHTML = `<div class="eventCard__t">${e.title}</div><p class="eventCard__d">${e.desc}</p>`;
        grid.appendChild(el);
    });
}

function renderSocials() {
    const wrap = qs("#socials");
    if (!wrap) return;

    wrap.innerHTML = "";

    (CONFIG.socials || []).forEach(s => {
        const a = document.createElement("a");
        a.className = "social";
        a.href = s.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("aria-label", s.name);
        a.title = s.name;

        const img = document.createElement("img");
        img.src = s.icon;
        img.alt = s.name;
        img.loading = "lazy";
        img.onerror = () => {
            a.style.display = "none";
        };

        a.appendChild(img);
        wrap.appendChild(a);
    });
}


function setupWhatsLinks() {
    const msg =
        `Hola 👋, quisiera reservar en *${CONFIG.businessName}*.\n` +
        `¿Tienen disponibilidad hoy? ¿Horario y ubicación exacta?\n\n` +
        `Gracias 🙌`;
    const url = waUrl(msg);

    ["btnWhatsTop", "btnWhatsHeader", "btnWhatsHero", "btnWhatsMobile", "btnWhatsCTA", "fabWhats"]
    .forEach(id => {
        const el = qs(`#${id}`);
        if (el) el.href = url;
    });
}

function setupMobileNav() {
    const btn = qs("#btnHamburger");
    const nav = qs("#mobileNav");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => nav.classList.toggle("is-open"));
    nav.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => nav.classList.remove("is-open"));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) nav.classList.remove("is-open");
    });
}

// ---------- Init ----------
function init() {
    qs("#year").textContent = new Date().getFullYear();

    renderHero();
    renderSchedule();
    renderMenu();
    renderFeatures();
    renderGallery();
    renderEvents();
    renderSocials();
    setupWhatsLinks();
    setupMobileNav();


    setInterval(renderSchedule, 60000);
}

document.addEventListener("DOMContentLoaded", init);