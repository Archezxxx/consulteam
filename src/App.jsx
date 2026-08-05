import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { locales } from './locales';

// Resolve a public asset path against Vite's base URL (works both in dev and on GitHub Pages).
const asset = (p) => {
  if (!p) return p;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${String(p).replace(/^\//, '')}`;
};

// ================= ANIMATIONS =================
function Reveal({ children, delay = 0, style = {}, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const yOffset = direction === 'up' ? 40 : direction === 'down' ? -40 : 0;
  const xOffset = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: yOffset, x: xOffset }} animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} style={style}>
      {children}
    </motion.div>
  );
}

// ================= COMPONENTS =================
function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{ display: 'flex', background: 'var(--bg-alt)', borderRadius: '100px', padding: '4px', border: '1px solid var(--border-light)' }}>
      {['ru', 'ky', 'en'].map(l => (
        <div key={l} style={{ position: 'relative' }}>
          {lang === l && <motion.div layoutId="langBg" style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--primary)', borderRadius: '100px', zIndex: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
          <button onClick={() => setLang(l)} style={{ position: 'relative', zIndex: 1, background: 'transparent', color: lang === l ? '#fff' : 'var(--text-muted)', border: 'none', padding: '0.4rem 1rem', cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', transition: 'color 0.3s' }}>
            {l}
          </button>
        </div>
      ))}
    </div>
  );
}

// ================= PRESENTATION VIEWER =================
function PresentationViewer({ presentation, countryName, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const totalSlides = presentation.slides;
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(s => s + 1);
      setIsLoading(true);
    }
  }, [currentSlide, totalSlides]);

  const goPrev = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide(s => s - 1);
      setIsLoading(true);
    }
  }, [currentSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'Escape') { onClose(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onClose]);

  // Preload next slide
  useEffect(() => {
    if (currentSlide < totalSlides) {
      const img = new Image();
      img.src = asset(`${presentation.folder}/${currentSlide + 1}.jpg`);
    }
  }, [currentSlide, totalSlides, presentation.folder]);

  const slideUrl = asset(`${presentation.folder}/${currentSlide}.jpg`);
  const progress = (currentSlide / totalSlides) * 100;

  return (
    <div className="presentation-overlay" onClick={onClose}>
      <div className="presentation-viewer" onClick={e => e.stopPropagation()} ref={containerRef}>
        {/* Header */}
        <div className="presentation-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={onClose} className="pres-close-btn" title="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h3 className="pres-title">{countryName}</h3>
              <p className="pres-subtitle">Slide {currentSlide} / {totalSlides}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="pres-action-btn"
              title={isZoomed ? 'Fit to screen' : 'Zoom in'}
            >
              {isZoomed ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              )}
            </button>
            <button onClick={onClose} className="pres-action-btn" title="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pres-progress-track">
          <div className="pres-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Slide Area */}
        <div
          className={`pres-slide-area ${isZoomed ? 'pres-zoomed' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Prev Button */}
          <button
            onClick={goPrev}
            disabled={currentSlide === 1}
            className="pres-nav-btn pres-nav-prev"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Slide Image */}
          <div className="pres-slide-container">
            {isLoading && (
              <div className="pres-loader">
                <div className="pres-spinner" />
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={slideUrl}
                alt={`Slide ${currentSlide}`}
                className="pres-slide-img"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onLoad={() => setIsLoading(false)}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            onClick={goNext}
            disabled={currentSlide === totalSlides}
            className="pres-nav-btn pres-nav-next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="pres-thumbnails">
          <div className="pres-thumbnails-inner">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => { setCurrentSlide(num); setIsLoading(true); }}
                className={`pres-thumb ${num === currentSlide ? 'pres-thumb-active' : ''}`}
              >
                <img
                  src={asset(`${presentation.folder}/${num}.jpg`)}
                  alt={`Thumbnail ${num}`}
                  draggable={false}
                />
                <span className="pres-thumb-num">{num}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= MODALS =================
function CountryModal({ country, modalT, contactT, onClose, onOpenPresentation }) {
  if (!country) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--bg-alt)', color: 'var(--text-dark)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.background='var(--border-light)'} onMouseLeave={e => e.currentTarget.style.background='var(--bg-alt)'}>✕</button>
        
        <div className="modal-header-img" style={{ position: 'relative', height: '240px', overflow: 'hidden', background: 'var(--bg-alt)' }}>
          {country.image.startsWith('bg') ? (
            <div className={country.image} style={{ width: '100%', height: '100%' }} />
          ) : (
            <img src={asset(country.image)} alt={country.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = asset('/harvard.jpg'); }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,17,40,0.8) 0%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
            <span className="tag-outline" style={{ color: '#fff', borderColor: '#fff', marginBottom: '10px' }}>Destination</span>
            <h2 className="modal-title" style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{country.name}</h2>
          </div>
        </div>

        <div className="modal-body" style={{ padding: '32px' }}>
          <div className="modal-stats-grid">
            <div style={{ background: 'var(--bg-alt)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{modalT.tuitionTitle}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-dark)' }}>{country.tuition}</p>
            </div>
            <div style={{ background: 'var(--bg-alt)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{modalT.livingTitle}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-dark)' }}>{country.living}</p>
            </div>
            <div style={{ gridColumn: '1 / -1', background: 'var(--primary)', padding: '20px', borderRadius: 'var(--radius-lg)', color: '#fff' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{modalT.scholarsTitle}</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.4 }}>{country.scholarships}</p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>{modalT.unisTitle}</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
            {country.topUnis.map((u, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} /> {u}
              </li>
            ))}
          </ul>

          {country.presentation && (
            <button
              onClick={() => onOpenPresentation(country)}
              className="btn-secondary"
              style={{ width: '100%', padding: '1.1rem', marginBottom: '12px', justifyContent: 'center', border: '2px solid var(--primary)', color: 'var(--primary)', background: 'rgba(51, 84, 255, 0.05)', cursor: 'pointer' }}
            >
              {modalT.presentationCta} <span style={{ fontSize: '1.2rem' }}>📑</span>
            </button>
          )}
          <a href={`https://wa.me/996709694959?text=Здравствуйте! Интересует обучение в стране: ${country.name}`} target="_blank" rel="noreferrer" className="btn-primary" style={{ width: '100%', padding: '1.1rem' }}>
            {modalT.contactCta} <span style={{ fontSize: '1.2rem' }}>💬</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function PrivacyModal({ title, text, onClose }) {
  if (!text) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '32px' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--bg-alt)', color: 'var(--text-dark)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10, fontSize: '1.2rem' }}>✕</button>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '20px', paddingRight: '40px' }}>{title}</h2>
        <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
          {text}
        </div>
      </div>
    </div>
  );
}

// ================= MAIN APP =================
const moreCountriesText = { ru: 'Больше стран', ky: 'Дагы өлкөлөр', en: 'More Countries' };
const lessCountriesText = { ru: 'Свернуть', ky: 'Жыйнаштыруу', en: 'Show Less' };

function App() {
  const [lang, setLang] = useState('ru');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [presentationData, setPresentationData] = useState(null);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const t = locales[lang];

  // Countries with presentations shown first
  const featuredCountries = t.destinations.countries.filter(c => c.presentation);
  const otherCountries = t.destinations.countries.filter(c => !c.presentation);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (selectedCountry || showPrivacy || presentationData) ? 'hidden' : 'auto';
  }, [selectedCountry, showPrivacy, presentationData]);

  const handleOpenPresentation = useCallback((country) => {
    setSelectedCountry(null);
    // Small delay to let modal close animation happen
    setTimeout(() => {
      setPresentationData({ presentation: country.presentation, name: country.name });
    }, 100);
  }, []);

  return (
    <div>
      {selectedCountry && <CountryModal country={selectedCountry} modalT={t.destinations.modal} contactT={t.whatsAppText} onClose={() => setSelectedCountry(null)} onOpenPresentation={handleOpenPresentation} />}
      {showPrivacy && <PrivacyModal title={t.legal.privacyTitle} text={t.legal.privacyText} onClose={() => setShowPrivacy(false)} />}
      {presentationData && (
        <PresentationViewer
          presentation={presentationData.presentation}
          countryName={presentationData.name}
          onClose={() => setPresentationData(null)}
        />
      )}

      {/* =========== NAV =========== */}
      <nav className={`main-nav ${scrolled ? 'header-scrolled' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>
          <img src={asset('/logo.png')} alt="Logo" className="nav-logo" style={{ height: '65px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; }} />
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a href="#about" className="nav-link">{t.nav.about}</a>
            <a href="#destinations" className="nav-link">{t.nav.destinations}</a>
            <a href="#exams" className="nav-link">{t.nav.exams}</a>
          </div>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </nav>

      {/* =========== HERO (DIGIBIZ SPLIT) =========== */}
      <section className="hero-section">
        
        {/* Abstract Background Shapes */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'var(--bg-alt)', borderRadius: '50%', zIndex: -1 }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(51, 84, 255, 0.05)', borderRadius: '50%', zIndex: -1 }} />

        <div className="hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gap: '3rem', alignItems: 'center', width: '100%' }}>
          
          {/* Left Text */}
          <div>
            <Reveal delay={0.2} direction="right">
              <div className="tag-outline" style={{ marginBottom: '1.5rem' }}>✨ {t.hero.badge}</div>
            </Reveal>
            <Reveal delay={0.4} direction="right">
              <h1 className="hero-h1">
                {t.hero.title} <br/>
                <span style={{ color: 'var(--primary)' }}>{t.hero.country}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.6} direction="right">
              <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '480px' }}>
                {t.hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.8} direction="right">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#destinations" className="btn-primary">{t.hero.cta} <span>✈️</span></a>
                <a href="https://www.instagram.com/consultteam.kg/" target="_blank" rel="noreferrer" className="btn-secondary">Instagram</a>
                <a href="https://t.me/+56UxGvvdmtU5NDMy" target="_blank" rel="noreferrer" className="btn-secondary">Telegram</a>
              </div>
            </Reveal>
          </div>

          {/* Right Floating Arch Images */}
          <div className="hero-images-wrapper">
            <Reveal delay={0.4} direction="left" style={{ position: 'absolute', top: 0, right: 0, width: '65%', height: '80%', zIndex: 2 }}>
              <div className="shape-float" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-arch)', overflow: 'hidden', border: '8px solid var(--bg-main)', boxShadow: 'var(--shadow-soft)' }}>
                <img src={asset('/taiwan.jpg')} alt="Taiwan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.src=asset('/harvard.jpg')} />
              </div>
            </Reveal>
            <Reveal delay={0.6} direction="up" style={{ position: 'absolute', bottom: 0, left: 0, width: '55%', height: '60%', zIndex: 3 }}>
              <div className="shape-float-delay" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-arch)', overflow: 'hidden', border: '8px solid var(--bg-main)', boxShadow: 'var(--shadow-soft)' }}>
                <img src={asset('/italy.jpg')} alt="Italy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.src=asset('/oxford.jpg')} />
              </div>
            </Reveal>
            
            {/* Playful elements */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '10%', left: '10%', zIndex: 4 }}>
              <svg width="50" height="50" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="var(--primary)" strokeWidth="2" strokeDasharray="10 10" /></svg>
            </motion.div>
            <div className="hero-badge-float" style={{ position: 'absolute', bottom: '15%', right: '0%', zIndex: 4, background: 'var(--secondary)', color: '#fff', padding: '0.8rem 1.25rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.05rem', transform: 'rotate(-5deg)', boxShadow: '0 10px 20px rgba(255, 94, 51, 0.3)' }}>
              100% SUCCESS
            </div>
          </div>
        </div>
      </section>

      {/* =========== ABOUT (DIGIBIZ CARDS) =========== */}
      <section className="section-block" id="about" style={{ background: 'var(--bg-alt)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <Reveal>
              <span className="tag-outline" style={{ marginBottom: '1.5rem' }}>{t.nav.about}</span>
              <h2 className="section-h2" style={{ marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                {t.about.title} <span style={{ color: 'var(--primary)' }}>{t.about.titleHighlight}</span>
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>{t.about.desc}</p>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {t.about.principles.map((principle, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div style={{ background: 'var(--bg-card)', padding: '2.5rem 2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-soft)', height: '100%', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.transform='translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                  <div className="icon-circle" style={{ width: '60px', height: '60px', fontSize: '1.75rem', marginBottom: '1.5rem', background: 'rgba(51, 84, 255, 0.1)' }}>
                    {i === 0 ? '🎯' : i === 1 ? '📈' : '🤝'}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>{principle}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.about.features[i] || t.about.features[3]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========== DESTINATIONS (ARCH CARDS) =========== */}
      <section className="section-block" id="destinations" style={{ background: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <Reveal>
                <span className="tag-outline" style={{ marginBottom: '1rem' }}>{t.nav.destinations}</span>
                <h2 className="section-h2">{t.destinations.title} <span style={{ color: 'var(--primary)' }}>{t.destinations.titleHighlight}</span></h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '400px' }}>{t.destinations.subtitle}</p>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {featuredCountries.map((country, i) => (
              <Reveal key={country.id} delay={i * 0.1}>
                <div className="arch-card" onClick={() => setSelectedCountry(country)}>
                  <div className="arch-img-wrap">
                    {country.image.startsWith('bg') ? (
                      <div className={country.image} />
                    ) : (
                      <img src={asset(country.image)} alt={country.name} onError={e => e.target.src=asset('/harvard.jpg')} />
                    )}
                  </div>
                  <div className="arch-content">
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>{country.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>Explore &rarr;</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Expandable Other Countries */}
          <AnimatePresence>
            {showAllCountries && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem', marginTop: '2.5rem' }}>
                  {otherCountries.map((country, i) => (
                    <Reveal key={country.id} delay={i * 0.1}>
                      <div className="arch-card" onClick={() => setSelectedCountry(country)}>
                        <div className="arch-img-wrap">
                          {country.image.startsWith('bg') ? (
                            <div className={country.image} />
                          ) : (
                            <img src={asset(country.image)} alt={country.name} onError={e => e.target.src=asset('/harvard.jpg')} />
                          )}
                        </div>
                        <div className="arch-content">
                          <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>{country.name}</h3>
                          <p style={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>Explore &rarr;</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More / Less Button */}
          <Reveal delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button
                onClick={() => setShowAllCountries(!showAllCountries)}
                className="btn-secondary"
                style={{ padding: '1rem 3rem', cursor: 'pointer', gap: '0.8rem' }}
              >
                {showAllCountries ? lessCountriesText[lang] : moreCountriesText[lang]}
                <span style={{ fontSize: '1.1rem', transition: 'transform 0.3s', display: 'inline-block', transform: showAllCountries ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========== EXAMS =========== */}
      <section className="section-block" id="exams" style={{ background: 'var(--bg-alt)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="tag-outline" style={{ marginBottom: '1rem' }}>{t.nav.exams}</span>
              <h2 className="section-h2">{t.exams.title} <span style={{ color: 'var(--primary)' }}>{t.exams.titleHighlight}</span></h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {t.exams.cards.map((exam, i) => (
              <Reveal key={exam.title} delay={i * 0.15}>
                <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', padding: '2rem 1.75rem', boxShadow: 'var(--shadow-soft)', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', height: '100%', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.transform='translateY(-6px)'} onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8px', border: '1px solid var(--border-light)' }}>
                      <img src={asset(exam.img)} alt={exam.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={e => { e.target.style.display='none'; }} />
                    </div>
                    <span style={{ background: 'rgba(51, 84, 255, 0.08)', color: 'var(--primary)', fontWeight: 800, padding: '0.35rem 0.9rem', borderRadius: '100px', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                      {exam.score}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.75rem' }}>{exam.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>{exam.desc}</p>
                  
                  {exam.format && (
                    <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '0.3rem' }}>
                        Формат / Разделы
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                        {exam.format}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========== CTA SECTION (DIGIBIZ SOLID BLOCK) =========== */}
      <section className="section-block" style={{ background: 'var(--primary)', textAlign: 'center' }}>
        <Reveal>
          <h2 className="section-h2" style={{ color: '#fff', marginBottom: '1.5rem' }}>Ready to conquer the world?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>{t.footer.desc}</p>
          <a href="https://wa.me/996709694959" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#fff', color: 'var(--primary)', padding: '1.1rem 3.5rem', fontSize: '1.15rem' }}>
            {t.whatsAppText.contactUs} 💬
          </a>
        </Reveal>
      </section>

      {/* =========== FOOTER =========== */}
      <footer className="section-block" style={{ background: 'var(--text-dark)', color: '#fff', paddingBottom: '3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="display-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3rem', marginBottom: '3.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <img src={asset('/logo.png')} alt="Logo" style={{ height: '80px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} onError={e => e.target.style.display='none'} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '400px', marginBottom: '2rem' }}>{t.footer.desc}</p>
              
              {/* Social Links */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="https://www.instagram.com/consultteam.kg/" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.8rem 1.5rem', fontSize: '1rem', boxShadow: 'none' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  Instagram
                </a>
                <a href="https://www.threads.com/@consulteam.kg" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.8rem 1.5rem', fontSize: '1rem', boxShadow: 'none' }}>
                  <svg width="20" height="20" viewBox="0 0 192 192" fill="currentColor" style={{ marginRight: '8px' }}><path d="M141.5 88.6c-.7-.3-1.4-.6-2.1-.9-1.2-22.7-13.6-35.7-34.5-35.9h-.3c-12.5 0-22.9 5.3-29.3 15l11.5 7.9c4.8-7.2 12.3-8.8 17.8-8.8h.2c6.9 0 12.1 2 15.4 5.9 2.4 2.9 4 6.8 4.8 11.8-6-1-12.5-1.3-19.4-.9-19.5 1.1-32 12.5-31.2 28.3.4 8 4.4 14.9 11.2 19.4 5.8 3.8 13.2 5.6 21 5.2 10.2-.6 18.2-4.5 23.8-11.6 4.2-5.4 6.9-12.4 8.1-21.2 4.9 3 8.5 6.9 10.5 11.6 3.4 8 3.6 21.2-7.1 31.9-9.4 9.4-20.7 13.4-37.8 13.6-19 0-33.3-6.1-42.6-18.1-8.7-11.3-13.2-27.5-13.4-48.3.2-20.8 4.7-37 13.4-48.3 9.3-12 23.6-18.1 42.6-18.1 19.1.1 33.6 6.3 43.1 18.3 4.7 5.9 8.2 13.3 10.6 21.9l13.5-3.6c-2.9-10.6-7.4-19.7-13.6-27.5-12.1-15.3-29.9-23.2-52.9-23.4h-.1c-22.9.2-40.5 8.1-52.3 23.5C11.7 62.1 6.5 81.2 6.3 105v.1c.2 23.8 5.4 42.9 15.5 56.7 11.8 15.4 29.4 23.3 52.3 23.5h.1c20.4-.1 34.7-5.5 46.5-17.2 15.5-15.5 15-34.9 9.9-46.8-3.7-8.6-10.7-15.5-20.3-20.2zm-35.4 45.3c-8.7.5-17.7-3.4-18.1-11.6-.3-6.1 4.3-12.8 18.6-13.7 1.6-.1 3.2-.1 4.8-.1 5.2 0 10.1.5 14.5 1.5-1.6 20.5-11.2 23.4-19.8 23.9z"/></svg>
                  Threads
                </a>
                <a href="https://t.me/+56UxGvvdmtU5NDMy" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.8rem 1.5rem', fontSize: '1rem', boxShadow: 'none' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  Telegram
                </a>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>Контакты</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: '1rem' }}>📍 {t.footer.location}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: '1rem' }}>🕒 {t.footer.workingHours}</p>
              <a href="https://wa.me/996709694959" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>{t.footer.contact} &rarr;</a>
            </div>
            
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>Юр. Информация</h4>
              <button onClick={() => setShowPrivacy(true)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s', padding: 0 }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.7)'}>
                {t.legal.privacyTitle}
              </button>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>{t.footer.rights}</p>
            <button onClick={() => window.scrollTo(0,0)} className="icon-circle" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', cursor: 'pointer' }}>
              &uarr;
            </button>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Action Button */}
      <a href="https://wa.me/996709694959" target="_blank" rel="noreferrer" className="whatsapp-float">
        <svg viewBox="0 0 32 32" width="34" height="34" fill="white">
          <path d="M16.11 2.2C8.38 2.2 2.1 8.49 2.1 16.23c0 2.47.65 4.88 1.88 7.02L2.09 30l6.91-1.81c2.08 1.13 4.4 1.73 6.81 1.73h.01c7.73 0 14.01-6.29 14.01-14.03S23.54 2.2 15.8 2.2h.31zm0 23.46c-2.09 0-4.14-.56-5.94-1.63l-.43-.25-4.41 1.15 1.18-4.3-.28-.44a11.59 11.59 0 01-1.78-6.19c0-6.42 5.23-11.65 11.66-11.65 3.12 0 6.04 1.22 8.24 3.42a11.65 11.65 0 013.4 8.24c0 6.41-5.23 11.65-11.64 11.65zm6.38-8.73c-.35-.17-2.08-1.02-2.4-1.14-.33-.11-.56-.17-.8.17-.23.35-.9 1.14-1.11 1.37-.2.23-.42.26-.77.08s-1.48-.55-2.82-1.75c-1.04-.93-1.75-2.08-1.95-2.43-.2-.35-.02-.54.16-.71.16-.16.35-.41.53-.61.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.17-.8-1.92-1.1-2.63-.28-.69-.58-.6-.8-.61h-.67c-.23 0-.61.09-.93.44s-1.22 1.19-1.22 2.91c0 1.72 1.25 3.38 1.42 3.6.17.23 2.46 3.75 5.95 5.26 2.37 1.02 3.25 1.05 4.3 0.88.85-.14 2.08-.85 2.37-1.66.29-.82.29-1.52.2-1.66-.08-.14-.31-.23-.66-.41z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
