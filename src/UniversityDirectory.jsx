import { useState } from 'react';
import { countries, riasec, TYPE_ORDER, typePalette } from './content';
import { studyFields, studyUniversities, universitiesForCountry } from './studyCatalog';

const labels = {
  ru: { title: 'Университеты и направления', lead: 'Все учебные заведения из презентаций Consulteam — в шести странах. Выбери тип интересов, чтобы увидеть подходящие направления.', focus: 'Профиль интересов', all: 'Все направления', count: 'учебных заведений', match: 'Подходит к профилю', fields: 'Направления для обсуждения', deck: 'Слайд презентации', source: 'Официальная информация', rank: 'Рейтинг QS World University Rankings 2027 указан только для подтверждённых записей именно этого университета.', note: 'Перечень программ, условия поступления, язык обучения и стоимость консультант уточнит по актуальному набору.' },
  ky: { title: 'Университеттер жана багыттар', lead: 'Consulteam презентацияларындагы алты өлкөнүн бардык окуу жайлары. Ылайыктуу багыттарды көрүү үчүн кызыгуу тибин танда.', focus: 'Кызыгуу профили', all: 'Бардык багыттар', count: 'окуу жайы', match: 'Профилге ылайык', fields: 'Талкуулай турган багыттар', deck: 'Презентация слайды', source: 'Расмий маалымат', rank: 'QS World University Rankings 2027 көрсөткүчү так ушул университет боюнча текшерилгенде гана берилди.', note: 'Программаларды, кабыл алуу шарттарын, окуу тилин жана баасын кеңешчи актуалдуу маалымат боюнча тактайт.' },
  en: { title: 'Universities and study fields', lead: 'Every institution featured in the Consulteam presentations, across six countries. Choose an interest type to highlight relevant fields.', focus: 'Interest profile', all: 'All fields', count: 'institutions', match: 'Profile match', fields: 'Fields to discuss', deck: 'Presentation slide', source: 'Official information', rank: 'QS World University Rankings 2027 is shown only where the exact institution was verified.', note: 'An adviser will confirm current programmes, admission requirements, language of instruction and costs.' },
};

export function universityImage(university) {
  return university.photo || (university.slide ? `/presentations/${university.country}/${university.slide}.jpg` : null);
}

export function rankUniversities(options, focus) {
  return [...options].sort((a, b) => {
    if (!focus) return options.indexOf(a) - options.indexOf(b);
    const matches = (item) => item.fields.filter((field) => studyFields[field].types.includes(focus)).length;
    return matches(b) - matches(a) || (a.qs?.sort ?? Infinity) - (b.qs?.sort ?? Infinity) || options.indexOf(a) - options.indexOf(b);
  });
}

export function UniversityCard({ university, focus, lang = 'ru', index }) {
  const t = labels[lang] || labels.ru;
  const orderedFields = [...university.fields].sort((a, b) =>
    Number(studyFields[b].types.includes(focus)) - Number(studyFields[a].types.includes(focus))
  );
  const matches = focus && orderedFields.some((field) => studyFields[field].types.includes(focus));
  const sourceHref = university.slide ? universityImage(university) : university.sourceUrl;
  const photo = universityImage(university);

  return <article className={`study-university${matches ? ' study-university--match' : ''}`}>
    <div className="study-university-photo" data-crop={university.photoCrop || undefined}>
      {photo ? <img src={photo} alt={`${university.name} — ${t.deck.toLowerCase()}`} loading="lazy" decoding="async" /> : <div className="study-university-photo-placeholder" aria-hidden="true"><span>{university.name.split(' ').slice(0, 2).join(' ')}</span></div>}
      <span className="study-photo-country">{countries.find((country) => country.id === university.country)?.names[lang]}</span>
    </div>
    <div className="study-university-content">
      <div className="study-university-top">
        <span className="study-university-index">{String(index + 1).padStart(2, '0')}</span>
        {university.qs ? <a className="study-rank" href={university.qs.url} target="_blank" rel="noopener noreferrer" aria-label={`QS World University Rankings 2027: ${university.qs.rank}`}>QS 2027 · #{university.qs.rank} ↗</a> : null}
      </div>
      <h3>{university.name}</h3>
      <p className="study-university-city">{university.city}</p>
      {matches ? <p className="study-match-dot"><span aria-hidden="true" />{t.match}</p> : null}
      <p className="study-field-caption">{t.fields}</p>
      <div className="study-field-list">{orderedFields.map((field) => <span key={field} className={focus && studyFields[field].types.includes(focus) ? 'is-match' : ''}>{studyFields[field].label[lang]}</span>)}</div>
      <a className="study-source" href={sourceHref} target="_blank" rel="noopener noreferrer">{university.slide ? `${t.deck} ${university.slide}` : t.source} <span aria-hidden="true">↗</span></a>
    </div>
  </article>;
}

export default function UniversityDirectory({ lang }) {
  const t = labels[lang] || labels.ru;
  const initialType = new URLSearchParams(window.location.search).get('type');
  const [focus, setFocus] = useState(TYPE_ORDER.includes(initialType) ? initialType : null);

  return <>
    <section className="page-intro chapter" id="top"><span className="page-intro-number">UNIVERSITIES / CONSULTEAM</span><h1>{t.title}</h1><p>{t.lead}</p></section>
    <section className="university-directory chapter" aria-label={t.title}>
      <div className="university-directory-lead"><div><span className="study-eyebrow">06 / {countries.length}</span><h2>{studyUniversities.length} <span>{t.count}</span></h2></div><p>{t.note}</p></div>
      <div className="study-focus"><strong>{t.focus}</strong><div><button type="button" aria-pressed={!focus} onClick={() => setFocus(null)}>{t.all}</button>{TYPE_ORDER.map((type) => <button type="button" key={type} aria-pressed={focus === type} onClick={() => setFocus(type)} style={{ '--focus-color': typePalette[type] }}>{type} · {riasec[lang][type].name}</button>)}</div></div>
      <nav className="study-country-nav" aria-label={t.title}>{countries.map((country) => <a key={country.id} href={`#study-${country.id}`}>{country.names[lang]} <span>{universitiesForCountry(country.id).length}</span></a>)}</nav>
      <p className="study-rank-note">{t.rank}</p>
      {countries.map((country, countryIndex) => {
        const options = universitiesForCountry(country.id);
        return <section key={country.id} id={`study-${country.id}`} className="study-country-section" aria-labelledby={`study-${country.id}-title`}>
          <div className="study-country-title"><span>{String(countryIndex + 1).padStart(2, '0')}</span><h2 id={`study-${country.id}-title`}>{country.names[lang]}</h2><strong>{options.length}</strong></div>
          <div className="study-university-grid">{rankUniversities(options, focus).map((university, index) => <UniversityCard key={university.id} university={university} focus={focus} lang={lang} index={index} />)}</div>
        </section>;
      })}
    </section>
  </>;
}
