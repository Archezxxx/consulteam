import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CareerQuiz from './CareerQuiz';
import TestGate, { saveProffTestResult } from './TestGate';
import { content, countries, riasec, TYPE_ORDER, typePalette } from './content';

const CareerScene = lazy(() => import('./CareerScene'));

const BASE_URL = import.meta.env.BASE_URL || '/';
const WHATSAPP = '996709694959';

function asset(path) {
  if (!path || path.startsWith('http')) return path || '';
  return `${BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
}

function Arrow({ back = false }) {
  return <span aria-hidden="true" className={back ? 'arrow arrow--back' : 'arrow'}>→</span>;
}

function CloseIcon() {
  return <span aria-hidden="true" className="close-glyph">×</span>;
}

function Brand({ inverse = false }) {
  return (
    <a className={`brand${inverse ? ' brand--inverse' : ''}`} href="/" aria-label="Consulteam — home">
      <span className="brand-mark" aria-hidden="true"><img src={asset('/favicon.svg')} alt="" /></span>
      <span>Consulteam</span>
    </a>
  );
}

function Reveal({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function LanguageSwitcher({ lang, onChange }) {
  return (
    <div className="language-switcher" role="group" aria-label="Language">
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
  const links = [
    ['/test', copy.nav.quiz],
    ['/how-it-works', copy.nav.approach],
    ['/types', lang === 'ky' ? 'Типтер' : lang === 'ru' ? 'Типы' : 'Types'],
    ['/countries', copy.nav.destinations],
    ['/exams', copy.nav.exams],
  ];

  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([href, label]) => <a key={href} href={href} aria-current={window.location.pathname === href ? 'page' : undefined}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <LanguageSwitcher lang={lang} onChange={setLang} />
        <a className="header-cta" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">{copy.nav.contact}</a>
        <button type="button" className={`menu-button${open ? ' is-open' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Menu">
          <span /><span />
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} aria-label="Mobile navigation">
            {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <LanguageSwitcher lang={lang} onChange={(code) => { setLang(code); setOpen(false); }} />
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function RiasecShape({ lang }) {
  const profiles = riasec[lang];
  return (
    <div className="riasec-shape" aria-label="Six RIASEC career types">
      <div className="riasec-core"><strong>15</strong><span>{lang === 'ky' ? 'суроо' : lang === 'ru' ? 'вопросов' : 'questions'}</span></div>
      {TYPE_ORDER.map((type, index) => (
        <div className={`riasec-node riasec-node--${index + 1}`} key={type} style={{ '--node': typePalette[type] }}>
          <strong>{type}</strong><span>{profiles[type].name}</span>
        </div>
      ))}
    </div>
  );
}

function Hero({ lang, copy }) {
  const hasWebGL = (() => {
    try {
      const canvas = document.createElement('canvas');
      return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  })();
  return (
    <section id="top" className="hero chapter chapter--yellow">
      <div className="hero-copy">
        <h1>{copy.hero.title}</h1>
        <p className="hero-lead">{copy.hero.lead}</p>
        <a className="button button--black hero-cta-desktop" href="/test">{copy.hero.primary}<Arrow /></a>
      </div>
      <div className="hero-shape-wrap">{hasWebGL ? <Suspense fallback={<RiasecShape lang={lang} />}><CareerScene /></Suspense> : <RiasecShape lang={lang} />}</div>
      <a className="button button--black hero-cta-mobile" href="/test">{copy.hero.primary}<Arrow /></a>
    </section>
  );
}

function RouteSection({ copy }) {
  const images = ['/italy.jpg', '/taiwan.jpg', '/malaysia.jpg'];
  const colors = ['var(--lime)', 'var(--sky)', 'var(--blue)'];
  return (
    <section className="route-section chapter chapter--stone" aria-labelledby="route-title">
      <div className="section-heading route-heading">
        <h2 id="route-title">{copy.approach.title}</h2>
        <p>{copy.approach.intro}</p>
      </div>
      <div className="route-tiles">
        {copy.approach.steps.map((step, index) => (
          <Reveal className={`route-step route-step--${index + 1}`} key={step.title} delay={index * 0.08}>
            <div className="route-photo" style={{ '--tile': colors[index] }}><img src={asset(images[index])} alt="" loading="lazy" /></div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TypeSection({ lang, copy }) {
  const profiles = riasec[lang];
  return (
    <section id="types" className="types-section chapter chapter--black" aria-labelledby="types-title">
      <div className="types-intro">
        <h2 id="types-title">{copy.types.title}</h2>
        <p>{copy.types.intro}</p>
      </div>
      <div className="type-bands">
        {TYPE_ORDER.map((type, index) => (
          <Reveal key={type} delay={index * 0.04}>
            <article className={`type-band type-band--${type}`} style={{ '--band': typePalette[type] }}>
              <strong>{type}</strong>
              <div><h3>{profiles[type].name}</h3><p>{profiles[type].oneLine}</p></div>
              <p>{profiles[type].summary}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
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
        <div className="viewer-header"><div><strong>{countryName}</strong><span>{slide} / {total}</span></div><button type="button" onClick={onClose} aria-label="Close"><CloseIcon /></button></div>
        <div className="viewer-stage">
          <button type="button" className="viewer-arrow viewer-arrow--left" onClick={previous} disabled={slide === 1} aria-label="Previous slide"><Arrow back /></button>
          {loading ? <div className="viewer-loading" aria-label="Loading" /> : null}
          <img src={asset(`${country.presentation.folder}/${slide}.jpg`)} alt={`${countryName}, slide ${slide}`} onLoad={() => setLoading(false)} />
          <button type="button" className="viewer-arrow viewer-arrow--right" onClick={next} disabled={slide === total} aria-label="Next slide"><Arrow /></button>
        </div>
      </div>
    </div>
  );
}

function CountryModal({ country, lang, copy, onClose, onPresentation }) {
  const name = country.names[lang];
  const message = encodeURIComponent(`${lang === 'ky' ? 'Салам! Мага' : lang === 'ru' ? 'Здравствуйте! Меня интересует обучение в' : 'Hello! I am interested in studying in'} ${name}.`);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="country-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="country-modal">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        <img className="country-modal-photo" src={asset(country.image)} alt={name} />
        <div className="country-modal-body">
          <h2 id="country-title">{name}</h2>
          <div className="country-facts">
            <div><span>{copy.destinations.tuition}</span><strong>{country.tuition}</strong></div>
            <div><span>{copy.destinations.living}</span><strong>{country.living}</strong></div>
            <div><span>{copy.destinations.grants}</span><strong>{country.grants}</strong></div>
          </div>
          <div className="country-universities"><h3>{copy.destinations.universities}</h3><ul>{country.universities.map((university) => <li key={university}>{university}</li>)}</ul></div>
          <div className="modal-actions">
            {country.presentation ? <button type="button" className="button button--soft" onClick={() => onPresentation(country)}>{copy.destinations.presentation}</button> : null}
            <a className="button button--black" href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer">{copy.destinations.ask}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyModal({ copy, onClose }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="privacy-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="privacy-modal"><button type="button" className="modal-close" onClick={onClose} aria-label="Close"><CloseIcon /></button><h2 id="privacy-title">{copy.privacyTitle}</h2><p>{copy.privacyText}</p></div>
    </div>
  );
}

function DestinationSection({ lang, copy, onSelect }) {
  const strips = ['var(--blue)', 'var(--blue-deep)', 'var(--blue)', 'var(--blue-deep)', 'var(--blue)', 'var(--blue-deep)'];
  return (
    <section id="destinations" className="destinations-section chapter chapter--coral" aria-labelledby="destinations-title">
      <div className="section-heading section-heading--split">
        <h2 id="destinations-title">{copy.destinations.title}</h2><p>{copy.destinations.intro}</p>
      </div>
      <div className="destination-gallery">
        {countries.map((country, index) => (
          <Reveal key={country.id} className="destination-tile" delay={(index % 3) * 0.06}>
            <button type="button" onClick={() => onSelect(country)} aria-label={`${copy.destinations.explore}: ${country.names[lang]}`}>
              <img src={asset(country.image)} alt={country.names[lang]} loading="lazy" />
              <span className="destination-label" style={{ '--strip': strips[index] }}><strong>{country.names[lang]}</strong><span>{copy.destinations.explore}</span></span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExamsSection({ copy }) {
  return (
    <section id="exams" className="exams-section chapter chapter--green" aria-labelledby="exams-title">
      <div className="section-heading section-heading--split"><h2 id="exams-title">{copy.exams.title}</h2><p>{copy.exams.intro}</p></div>
      <div className="exam-poster-list">
        {copy.exams.cards.map((exam, index) => (
          <Reveal key={exam.title} delay={index * 0.05}>
            <article className="exam-poster-line">
              <h3>{exam.title}</h3>
              <div><p>{exam.text} {copy.exams.target}: {exam.score}</p></div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CtaSection({ copy }) {
  return (
    <section className="cta-section chapter chapter--sky" aria-labelledby="cta-title">
      <div className="cta-copy"><h2 id="cta-title">{copy.cta.title}</h2><p>{copy.cta.text}</p></div>
      <div className="consult-panel" data-ui>
        <p>{copy.quiz.resultTitle}</p>
        <div className="consult-code"><span>R</span><span>I</span><span>A</span></div>
        <p>{copy.quiz.disclaimer}</p>
        <a className="button button--black" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">{copy.cta.button}<Arrow /></a>
      </div>
    </section>
  );
}

function Footer({ copy, onPrivacy }) {
  return (
    <footer className="site-footer chapter chapter--blue">
      <div className="footer-top"><Brand inverse /><p>{copy.footer.address}<br />{copy.footer.hours}</p><a className="footer-back" href="#top" aria-label="Back to top">↑</a></div>
      <div className="footer-contact"><p>{copy.footer.text}</p><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">+996 709 694 959</a></div>
      <div className="footer-meta"><button type="button" onClick={onPrivacy}>{copy.footer.privacy}</button><a href="https://www.instagram.com/consultteam.kg/" target="_blank" rel="noreferrer">Instagram</a><span>{copy.footer.rights}</span></div>
    </footer>
  );
}

const pageTitles = {
  ru: { route: 'Как мы помогаем', types: 'Найди свой тип', countries: 'Страны и возможности', exams: 'Подготовка к экзаменам', test: 'Профориентационный тест' },
  ky: { route: 'Кантип жардам беребиз', types: 'Өз тибиңди тап', countries: 'Өлкөлөр жана мүмкүнчүлүктөр', exams: 'Экзаменге даярдык', test: 'Кесип тандоо тести' },
  en: { route: 'How we help', types: 'Find your type', countries: 'Countries and opportunities', exams: 'Exam preparation', test: 'Career orientation test' },
};

function PageIntro({ title, lead, number }) {
  return <section className="page-intro chapter" id="top"><span className="page-intro-number">{number} / CONSULTEAM</span><h1>{title}</h1><p>{lead}</p></section>;
}

function PageLinks({ lang }) {
  const items = {
    ru: [['/how-it-works', '01', 'Путь к обучению', 'Узнай, как мы помогаем выбрать направление и подготовиться.'], ['/types', '02', 'Шесть типов интересов', 'Изучи сильные стороны и подходящие профессии.'], ['/countries', '03', 'Страны обучения', 'Сравни варианты и стоимость обучения.'], ['/exams', '04', 'Экзамены', 'Подготовься к языковым тестам.']],
    ky: [['/how-it-works', '01', 'Окууга жол', 'Багыт тандоого жана даярданууга кантип жардам беребиз.'], ['/types', '02', 'Алты кызыгуу тиби', 'Күчтүү жактарыңды жана кесиптерди изилде.'], ['/countries', '03', 'Окуу өлкөлөрү', 'Варианттарды жана окуу баасын салыштыр.'], ['/exams', '04', 'Экзамендер', 'Тил сынактарына даярдан.']],
    en: [['/how-it-works', '01', 'Your study path', 'See how we help you choose and prepare.'], ['/types', '02', 'Six interest types', 'Explore strengths and career options.'], ['/countries', '03', 'Study destinations', 'Compare your options and costs.'], ['/exams', '04', 'Exams', 'Prepare for language tests.']],
  };
  return <section className="page-links chapter"><div className="page-links-heading"><span>EXPLORE</span><h2>{lang === 'ky' ? 'Кийинки кадамың' : lang === 'ru' ? 'Выбери следующий шаг' : 'Choose your next step'}</h2></div><div className="page-links-grid">{items[lang].map(([href, number, title, lead]) => <a className="page-link" href={href} key={href}><span>{number}</span><h3>{title}</h3><p>{lead}</p><b aria-hidden="true">↗</b></a>)}</div></section>;
}

export default function App() {
  const [lang, setLang] = useState('ru');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [presentation, setPresentation] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [submission, setSubmission] = useState(null);
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const copy = content[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'ky' ? 'ky' : lang;
  }, [lang]);

  useEffect(() => {
    const modalOpen = Boolean(selectedCountry || presentation || privacyOpen);
    document.body.classList.toggle('modal-open', modalOpen);
    return () => document.body.classList.remove('modal-open');
  }, [selectedCountry, presentation, privacyOpen]);

  const openPresentation = (country) => {
    setSelectedCountry(null);
    setPresentation(country);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header lang={lang} setLang={setLang} copy={copy} />
      <main id="main">
        {path === '/' && <><Hero lang={lang} copy={copy} /><PageLinks lang={lang} /><CtaSection copy={copy} /></>}
        {path === '/how-it-works' && <><PageIntro title={pageTitles[lang].route} lead={copy.approach.intro} number="01" /><RouteSection copy={copy} /><CtaSection copy={copy} /></>}
        {path === '/types' && <><PageIntro title={pageTitles[lang].types} lead={copy.types.intro} number="02" /><TypeSection lang={lang} copy={copy} /><div className="page-end-cta chapter"><a href="/test" className="button button--black">{copy.hero.primary}<Arrow /></a></div></>}
        {path === '/test' && <><PageIntro title={pageTitles[lang].test} lead={copy.quiz.intro} number="TEST" />{submission ? <CareerQuiz lang={lang} copy={copy} onComplete={(scores) => saveProffTestResult(submission, scores)} /> : <TestGate lang={lang} onRegistered={setSubmission} />}</>}
        {path === '/countries' && <><PageIntro title={pageTitles[lang].countries} lead={copy.destinations.intro} number="03" /><DestinationSection lang={lang} copy={copy} onSelect={setSelectedCountry} /><CtaSection copy={copy} /></>}
        {path === '/exams' && <><PageIntro title={pageTitles[lang].exams} lead={copy.exams.intro} number="04" /><ExamsSection copy={copy} /><CtaSection copy={copy} /></>}
        {!['/', '/how-it-works', '/types', '/test', '/countries', '/exams'].includes(path) && <><PageIntro title="404" lead={lang === 'ky' ? 'Барак табылган жок.' : lang === 'ru' ? 'Страница не найдена.' : 'Page not found.'} number="404" /><div className="page-end-cta chapter"><a href="/" className="button button--black">Consulteam <Arrow /></a></div></>}
      </main>
      <Footer copy={copy} onPrivacy={() => setPrivacyOpen(true)} />

      <AnimatePresence>
        {selectedCountry ? <CountryModal key="country-modal" country={selectedCountry} lang={lang} copy={copy} onClose={() => setSelectedCountry(null)} onPresentation={openPresentation} /> : null}
        {presentation ? <PresentationViewer key="presentation-viewer" country={presentation} lang={lang} onClose={() => setPresentation(null)} /> : null}
        {privacyOpen ? <PrivacyModal key="privacy-modal" copy={copy} onClose={() => setPrivacyOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
