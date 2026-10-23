import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import CareerQuiz from './CareerQuiz';
import { content, countries, riasec, TYPE_ORDER, typePalette } from './content';

const BASE_URL = import.meta.env.BASE_URL || '/';
const WHATSAPP = '996709694959';

function asset(path) {
  if (!path || path.startsWith('http')) return path || '';
  return `${BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" className={direction === 'left' ? 'icon-flip' : ''}>
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Brand({ light = false }) {
  return (
    <a href="#top" className={`brand${light ? ' brand--light' : ''}`} aria-label="Consulteam — home">
      <span className="brand-mark" aria-hidden="true"><span>C</span><span>T</span></span>
      <span className="brand-word">CONSULTEAM</span>
    </a>
  );
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function LanguageSwitcher({ lang, onChange, compact = false }) {
  return (
    <div className={`language-switcher${compact ? ' language-switcher--compact' : ''}`} role="group" aria-label="Language">
      {['ky', 'ru', 'en'].map((code) => (
        <button key={code} type="button" className={lang === code ? 'is-active' : ''} aria-pressed={lang === code} onClick={() => onChange(code)}>
          {code}
        </button>
      ))}
    </div>
  );
}

function Header({ lang, setLang, copy }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);
  const links = [
    ['#quiz', copy.nav.quiz],
    ['#approach', copy.nav.approach],
    ['#destinations', copy.nav.destinations],
    ['#exams', copy.nav.exams],
  ];

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher lang={lang} onChange={setLang} />
          <a className="header-contact" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">{copy.nav.contact}<span aria-hidden="true">↗</span></a>
          <button type="button" className={`menu-button${open ? ' is-open' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Menu">
            <span /><span />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} aria-label="Mobile navigation">
            {links.map(([href, label], index) => <a key={href} href={href} onClick={close}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>)}
            <LanguageSwitcher lang={lang} onChange={(code) => { setLang(code); close(); }} compact />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function PresentationViewer({ country, lang, onClose }) {
  const [slide, setSlide] = useState(1);
  const [loading, setLoading] = useState(true);
  const total = country.presentation.slides;
  const countryName = country.names[lang];
  const next = useCallback(() => setSlide((value) => Math.min(total, value + 1)), [total]);
  const previous = useCallback(() => setSlide((value) => Math.max(1, value - 1)), []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, onClose, previous]);

  useEffect(() => setLoading(true), [slide]);

  return (
    <div className="viewer-overlay" role="dialog" aria-modal="true" aria-label={`${countryName} presentation`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="viewer-panel">
        <div className="viewer-header">
          <div><p>{countryName}</p><span>{slide} / {total}</span></div>
          <button type="button" className="icon-button icon-button--light" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>
        <div className="viewer-progress"><span style={{ width: `${(slide / total) * 100}%` }} /></div>
        <div className="viewer-stage">
          <button type="button" className="viewer-arrow viewer-arrow--left" onClick={previous} disabled={slide === 1} aria-label="Previous slide"><ArrowIcon direction="left" /></button>
          {loading && <div className="viewer-loading" aria-label="Loading" />}
          <img src={asset(`${country.presentation.folder}/${slide}.jpg`)} alt={`${countryName}, slide ${slide}`} onLoad={() => setLoading(false)} />
          <button type="button" className="viewer-arrow viewer-arrow--right" onClick={next} disabled={slide === total} aria-label="Next slide"><ArrowIcon /></button>
        </div>
      </div>
    </div>
  );
}

function CountryModal({ country, lang, copy, onClose, onPresentation }) {
  const name = country.names[lang];

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const message = encodeURIComponent(`${lang === 'ky' ? 'Салам! Мага' : lang === 'ru' ? 'Здравствуйте! Меня интересует обучение в' : 'Hello! I am interested in studying in'} ${name}.`);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="country-modal-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="country-modal">
        <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        <div className="country-modal-image">
          <img src={asset(country.image)} alt={name} />
          <div><p>{copy.destinations.destination}</p><h2 id="country-modal-title">{name}</h2></div>
        </div>
        <div className="country-modal-body">
          <dl className="country-facts">
            <div><dt>{copy.destinations.tuition}</dt><dd>{country.tuition}</dd></div>
            <div><dt>{copy.destinations.living}</dt><dd>{country.living}</dd></div>
            <div className="country-fact-wide"><dt>{copy.destinations.grants}</dt><dd>{country.grants}</dd></div>
          </dl>
          <div className="country-universities">
            <p>{copy.destinations.universities}</p>
            <ol>{country.universities.map((university) => <li key={university}>{university}</li>)}</ol>
          </div>
          <div className="modal-actions">
            {country.presentation && <button type="button" className="button button--outline" onClick={() => onPresentation(country)}>{copy.destinations.presentation}</button>}
            <a className="button button--blue" href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer">{copy.destinations.ask}<ArrowIcon /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyModal({ copy, onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="privacy-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="privacy-modal">
        <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        <p className="eyebrow">Legal</p>
        <h2 id="privacy-title">{copy.privacyTitle}</h2>
        <p>{copy.privacyText}</p>
      </div>
    </div>
  );
}

function Hero({ copy }) {
  return (
    <section id="top" className="hero">
      <div className="shell hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="hero-lead">{copy.hero.lead}</p>
          <div className="hero-actions">
            <a className="button button--blue" href="#quiz">{copy.hero.primary}<ArrowIcon /></a>
            <a className="text-link" href="#destinations">{copy.hero.secondary}<ArrowIcon /></a>
          </div>
          <p className="hero-note"><span aria-hidden="true" />{copy.hero.note}</p>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.12 }}>
          <div className="hero-image-wrap"><img src={asset('/taiwan.jpg')} alt={copy.hero.photoAlt} /></div>
          <div className="hero-stamp" aria-label="RIASEC: six career types">
            <span>RIASEC</span><strong>6×</strong><small>career<br />directions</small>
          </div>
          <div className="hero-code" aria-hidden="true">R · I · A · S · E · C</div>
        </motion.div>
      </div>
      <div className="trust-strip" aria-label="Test overview">
        <div className="shell trust-grid">{copy.trust.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
      </div>
    </section>
  );
}

function Approach({ copy }) {
  return (
    <section id="approach" className="section approach-section">
      <div className="shell">
        <Reveal className="section-intro section-intro--split">
          <div><p className="eyebrow">{copy.approach.eyebrow}</p><h2>{copy.approach.title}</h2></div>
          <p>{copy.approach.intro}</p>
        </Reveal>
        <div className="step-list">
          {copy.approach.steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.08}>
              <article className="step-row"><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TypeMap({ lang, copy }) {
  const profiles = riasec[lang];
  return (
    <section className="section type-section" aria-labelledby="type-map-title">
      <div className="shell">
        <Reveal className="section-intro type-intro">
          <div><p className="eyebrow">{copy.types.eyebrow}</p><h2 id="type-map-title">{copy.types.title}</h2></div>
          <p>{copy.types.intro}</p>
        </Reveal>
        <div className="type-spectrum">
          {TYPE_ORDER.map((type, index) => (
            <Reveal key={type} delay={index * 0.05}>
              <article className="type-row" style={{ '--type-color': typePalette[type] }}>
                <span className="type-letter">{type}</span>
                <div><h3>{profiles[type].name}</h3><p>{profiles[type].oneLine}</p></div>
                <p className="type-summary">{profiles[type].summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Destinations({ lang, copy, onSelect }) {
  return (
    <section id="destinations" className="section destination-section" aria-labelledby="destinations-title">
      <div className="shell">
        <Reveal className="section-intro section-intro--split">
          <div><p className="eyebrow">{copy.destinations.eyebrow}</p><h2 id="destinations-title">{copy.destinations.title}</h2></div>
          <p>{copy.destinations.intro}</p>
        </Reveal>
        <div className="destination-grid">
          {countries.map((country, index) => (
            <Reveal key={country.id} className={`destination-item destination-item--${index + 1}`} delay={(index % 3) * 0.08}>
              <button type="button" className="destination-card" onClick={() => onSelect(country)} aria-label={`${copy.destinations.explore}: ${country.names[lang]}`}>
                <img src={asset(country.image)} alt={country.names[lang]} loading="lazy" />
                <span className="destination-shade" />
                <span className="destination-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="destination-content"><strong>{country.names[lang]}</strong><span>{copy.destinations.explore} ↗</span></span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Exams({ copy }) {
  const images = ['/ielts.jpg', '/toefl.png', '/sat.jpg'];
  return (
    <section id="exams" className="section exam-section" aria-labelledby="exam-title">
      <div className="shell">
        <Reveal className="section-intro section-intro--split">
          <div><p className="eyebrow">{copy.exams.eyebrow}</p><h2 id="exam-title">{copy.exams.title}</h2></div>
          <p>{copy.exams.intro}</p>
        </Reveal>
        <div className="exam-list">
          {copy.exams.cards.map((exam, index) => (
            <Reveal key={exam.title} delay={index * 0.08}>
              <article className="exam-row">
                <span className="exam-number">0{index + 1}</span>
                <div className="exam-logo"><img src={asset(images[index])} alt="" /></div>
                <div className="exam-copy"><h3>{exam.title}</h3><p>{exam.text}</p><span>{exam.meta}</span></div>
                <div className="exam-score"><span>{copy.exams.target}</span><strong>{exam.score}</strong></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ copy, onPrivacy }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <Brand light />
          <p>{copy.footer.text}</p>
          <a className="footer-whatsapp" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
        </div>
        <div className="footer-bottom">
          <div><span>{copy.footer.address}</span><span>{copy.footer.hours}</span></div>
          <button type="button" onClick={onPrivacy}>{copy.footer.privacy}</button>
          <span>{copy.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [lang, setLang] = useState('ru');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [presentation, setPresentation] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const copy = content[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'ky' ? 'ky' : lang;
  }, [lang]);

  useEffect(() => {
    const modalOpen = Boolean(selectedCountry || presentation || privacyOpen);
    document.body.classList.toggle('modal-open', modalOpen);
    return () => document.body.classList.remove('modal-open');
  }, [selectedCountry, presentation, privacyOpen]);

  useEffect(() => {
    if (window.location.hash) {
      const timer = window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' }), 150);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  const openPresentation = (country) => {
    setSelectedCountry(null);
    setPresentation(country);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header lang={lang} setLang={setLang} copy={copy} />
      <main id="main">
        <Hero copy={copy} />
        <Approach copy={copy} />
        <TypeMap lang={lang} copy={copy} />
        <CareerQuiz lang={lang} copy={copy} />
        <Destinations lang={lang} copy={copy} onSelect={setSelectedCountry} />
        <Exams copy={copy} />
        <section className="cta-section">
          <div className="shell cta-grid">
            <Reveal><p className="eyebrow eyebrow--light">{copy.cta.eyebrow}</p><h2>{copy.cta.title}</h2></Reveal>
            <Reveal delay={0.08}><p>{copy.cta.text}</p><a className="button button--paper" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">{copy.cta.button}<ArrowIcon /></a></Reveal>
          </div>
        </section>
      </main>
      <Footer copy={copy} onPrivacy={() => setPrivacyOpen(true)} />

      <AnimatePresence>
        {selectedCountry && <CountryModal key="country-modal" country={selectedCountry} lang={lang} copy={copy} onClose={() => setSelectedCountry(null)} onPresentation={openPresentation} />}
        {presentation && <PresentationViewer key="presentation-viewer" country={presentation} lang={lang} onClose={() => setPresentation(null)} />}
        {privacyOpen && <PrivacyModal key="privacy-modal" copy={copy} onClose={() => setPrivacyOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
