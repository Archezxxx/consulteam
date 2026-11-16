import { useEffect, useRef, useState } from 'react';
import { caseStories, casesLabels } from './casesData';

const regions = ['all', 'turkey', 'taiwan', 'europe'];

export function CasesPreview({ lang }) {
  const t = casesLabels[lang];
  return <section className="cases-preview chapter" aria-labelledby="cases-preview-title">
    <div className="cases-preview-copy">
      <span className="cases-kicker">{t.eyebrow}</span>
      <h2 id="cases-preview-title">{t.previewTitle}</h2>
      <p>{t.previewLead}</p>
      <a className="button button--black" href="/cases">{t.seeAll}<span aria-hidden="true">↗</span></a>
    </div>
    <div className="cases-preview-images" aria-hidden="true">
      <img src={caseStories[0].photos[0].src} alt="" loading="lazy" />
      <img src={caseStories[1].photos[2].src} alt="" loading="lazy" />
      <img src={caseStories[2].photos[2].src} alt="" loading="lazy" />
    </div>
  </section>;
}

export default function CasesPage({ lang }) {
  const t = casesLabels[lang];
  const [region, setRegion] = useState('all');
  const [selection, setSelection] = useState(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const visibleStories = region === 'all' ? caseStories : caseStories.filter((story) => story.region === region);
  const selectedStory = selection ? caseStories.find((story) => story.id === selection.id) : null;
  const selectedPhoto = selectedStory?.photos[selection.index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selection && !dialog.open) dialog.showModal();
    if (!selection && dialog.open) dialog.close();
  }, [selection]);

  useEffect(() => {
    if (!selection) return undefined;
    const onKey = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      setSelection((current) => ({ ...current, index: (current.index + step + selectedStory.photos.length) % selectedStory.photos.length }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selection, selectedStory]);

  const openPhoto = (event, id, index) => {
    openerRef.current = event.currentTarget;
    setSelection({ id, index });
  };
  const closePhoto = () => {
    setSelection(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };
  const movePhoto = (step) => setSelection((current) => ({
    ...current,
    index: (current.index + step + selectedStory.photos.length) % selectedStory.photos.length,
  }));

  return <>
    <section className="cases-hero chapter" id="top" aria-labelledby="cases-title">
      <div className="cases-hero-copy">
        <span className="cases-kicker">{t.eyebrow}</span>
        <h1 id="cases-title">{t.title}</h1>
        <p>{t.lead}</p>
        <a href="#case-stories" className="cases-scroll-link">{t.seeAll}<span aria-hidden="true">↓</span></a>
      </div>
      <div className="cases-hero-photos" aria-hidden="true">
        <img src={caseStories[0].photos[0].src} alt="" fetchPriority="high" />
        <img src={caseStories[1].photos[2].src} alt="" />
        <img src={caseStories[2].photos[2].src} alt="" />
      </div>
    </section>

    <section className="cases-collection chapter" id="case-stories" aria-label={t.eyebrow}>
      <div className="cases-filter" role="group" aria-label={t.eyebrow}>
        {regions.map((item) => <button key={item} type="button" className={region === item ? 'is-active' : ''} aria-pressed={region === item} onClick={() => setRegion(item)}>{t[item]}</button>)}
      </div>
      <div className="cases-stories">
        {visibleStories.map((story, storyIndex) => <article className="case-story" id={story.id} key={story.id}>
          <div className="case-story-heading">
            <div><span className="case-story-index">{String(caseStories.indexOf(story) + 1).padStart(2, '0')} / 04 {story.year ? `· ${story.year}` : ''}</span><h2>{story.title[lang]}</h2></div>
            <p>{story.description[lang]}</p>
          </div>
          <div className={`case-photo-grid case-photo-grid--${storyIndex % 2 ? 'reverse' : 'forward'}${story.photos.length === 4 ? ' case-photo-grid--four' : ''}`}>
            {story.photos.map((item, index) => <button key={item.src} className="case-photo" type="button" onClick={(event) => openPhoto(event, story.id, index)} aria-label={`${t.gallery}: ${item.caption[lang]}`}>
              <img src={item.src} alt={item.caption[lang]} loading="lazy" decoding="async" />
              <span aria-hidden="true">↗</span>
            </button>)}
          </div>
        </article>)}
      </div>
    </section>

    <section className="cases-contact chapter" aria-labelledby="cases-contact-title">
      <div><h2 id="cases-contact-title">{t.contactTitle}</h2><p>{t.contactLead}</p></div>
      <a className="button button--black" href="https://wa.me/996709694959" target="_blank" rel="noreferrer">{t.contact}<span aria-hidden="true">↗</span></a>
    </section>

    <dialog ref={dialogRef} className="cases-lightbox" onClose={closePhoto} onClick={(event) => { if (event.target === event.currentTarget) closePhoto(); }} aria-label={selectedPhoto?.caption[lang] || t.gallery}>
      {selectedPhoto && <div className="cases-lightbox-inner">
        <div className="cases-lightbox-top"><span>{selectedStory.title[lang]} · {selection.index + 1} / {selectedStory.photos.length}</span><button type="button" onClick={closePhoto} autoFocus aria-label={t.close}>×</button></div>
        <div className="cases-lightbox-stage"><button type="button" onClick={() => movePhoto(-1)} aria-label={t.previous}>←</button><img src={selectedPhoto.src} alt={selectedPhoto.caption[lang]} /><button type="button" onClick={() => movePhoto(1)} aria-label={t.next}>→</button></div>
        <p>{selectedPhoto.caption[lang]}</p>
      </div>}
    </dialog>
  </>;
}
