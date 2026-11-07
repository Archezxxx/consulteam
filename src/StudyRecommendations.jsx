import { useState } from 'react';
import { countries, riasec, typePalette } from './content';
import { studyFields, studyUniversities, universitiesForCountry } from './studyCatalog';
import { rankUniversities, universityImage } from './UniversityDirectory';

const labels = {
  ru: { eyebrow: 'ПОСЛЕ ТЕСТА', title: 'Где учиться с твоим профилем', intro: 'Подобрали по одному примеру из каждой страны. Открой полный каталог, чтобы сравнить все университеты из презентаций Consulteam.', focus: 'Профиль интересов', count: 'университетов в каталоге', match: 'Подходящие направления', all: 'Посмотреть все университеты', note: 'Направления помогают начать выбор. Консультант уточнит актуальные программы, условия поступления и стоимость.' },
  ky: { eyebrow: 'ТЕСТТЕН КИЙИН', title: 'Профилиң менен кайда окуса болот', intro: 'Ар бир өлкөдөн бирден мисал тандадык. Consulteam презентацияларындагы бардык университеттерди толук каталогдон салыштыр.', focus: 'Кызыгуу профили', count: 'университет каталогдо', match: 'Ылайыктуу багыттар', all: 'Бардык университеттерди көрүү', note: 'Багыттар тандоону баштоого жардам берет. Кеңешчи актуалдуу программаларды, кабыл алуу шарттарын жана баасын тактайт.' },
  en: { eyebrow: 'AFTER THE TEST', title: 'Where your profile could take you', intro: 'One example from each country. Open the full directory to compare every university in the Consulteam presentations.', focus: 'Interest profile', count: 'universities in the directory', match: 'Relevant fields', all: 'Explore all universities', note: 'These fields are a starting point. An adviser will confirm current programmes, admission requirements and costs.' },
};

export default function StudyRecommendations({ lang, topTypes }) {
  const t = labels[lang] || labels.ru;
  const [focus, setFocus] = useState(topTypes[0]);

  return <section className="study-recommendations" aria-labelledby="study-title">
    <p className="study-eyebrow">{t.eyebrow}</p>
    <h4 id="study-title">{t.title}</h4>
    <p className="study-intro">{t.intro}</p>
    <div className="study-focus"><strong>{t.focus}</strong><div>{topTypes.map((type) => <button type="button" key={type} aria-pressed={focus === type} onClick={() => setFocus(type)} style={{ '--focus-color': typePalette[type] }}>{type} · {riasec[lang][type].name}</button>)}</div></div>
    <div className="study-preview-grid">
      {countries.map((country) => {
        const university = rankUniversities(universitiesForCountry(country.id), focus)[0];
        const matches = university.fields.filter((field) => studyFields[field].types.includes(focus)).slice(0, 2);
        const photo = universityImage(university);
        return <a className="study-preview" key={country.id} href={`/universities?type=${focus}#study-${country.id}`}>
          <div className="study-preview-photo" data-crop={university.photoCrop || undefined}>{photo ? <img src={photo} alt={`${university.name} — ${country.names[lang]}`} loading="lazy" decoding="async" /> : null}<span>{country.names[lang]}</span></div>
          <div className="study-preview-copy"><h5>{university.name}</h5><p>{university.city}</p><span className="study-preview-caption">{t.match}</span><div className="study-preview-fields">{matches.map((field) => <span key={field}>{studyFields[field].label[lang]}</span>)}</div><b aria-hidden="true">↗</b></div>
        </a>;
      })}
    </div>
    <div className="study-preview-footer"><p>{t.note}</p><a className="button button--black" href={`/universities?type=${focus}`}>{t.all} <span aria-hidden="true">→</span></a><span>{studyUniversities.length} {t.count}</span></div>
  </section>;
}
