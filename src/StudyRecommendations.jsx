import { useEffect, useState } from 'react';
import { countries, riasec, typePalette } from './content';

const API = import.meta.env.VITE_PROFFTEST_API_URL || 'https://crm.consulteam.edu.kg/api/public/proff-tests';

const copy = {
  ru: { eyebrow: 'ПОСЛЕ ТЕСТА', title: 'Где можно учиться', intro: 'Твой профиль помогает выбрать направление. Сравни страны и университеты, затем обсуди программу, бюджет и требования с консультантом.', focus: 'Интересующее направление', countries: 'Страны для обучения', universities: 'Университеты для рассмотрения', catalog: 'Программы из каталога Consulteam', faculty: 'Факультет', program: 'Специальность', loading: 'Подбираем программы…', unavailable: 'Список программ сейчас недоступен. Консультант поможет подобрать их лично.', more: 'Все страны и условия', note: 'Возможность поступления, наличие мест, язык и стоимость уточняются индивидуально. Тест не гарантирует зачисление.' },
  ky: { eyebrow: 'ТЕСТТЕН КИЙИН', title: 'Кайда окуса болот', intro: 'Профилиң багыт тандоого жардам берет. Өлкөлөрдү жана университеттерди карап, программа, бюджет жана талаптарды кеңешчи менен талкуула.', focus: 'Кызыктырган багыт', countries: 'Окуу өлкөлөрү', universities: 'Карап көрө турган университеттер', catalog: 'Consulteam каталогундагы программалар', faculty: 'Факультет', program: 'Адистик', loading: 'Программалар тандалууда…', unavailable: 'Программалар тизмеси азыр жеткиликсиз. Кеңешчи жеке тандоого жардам берет.', more: 'Бардык өлкөлөр жана шарттар', note: 'Кабыл алуу, орундар, тил жана баа жеке такталат. Тест кабыл алууга кепилдик бербейт.' },
  en: { eyebrow: 'AFTER THE TEST', title: 'Where you could study', intro: 'Your profile helps narrow down a field. Explore countries and universities, then discuss programs, budget, and entry requirements with an adviser.', focus: 'Explore a direction', countries: 'Study destinations', universities: 'Universities to consider', catalog: 'Programs in the Consulteam catalog', faculty: 'Faculty', program: 'Program', loading: 'Finding programs…', unavailable: 'Programs are temporarily unavailable. An adviser can help you choose.', more: 'All countries and details', note: 'Admission, places, language, and fees require individual confirmation. The test does not guarantee admission.' },
};

export default function StudyRecommendations({ lang, topTypes }) {
  const t = copy[lang];
  const [focus, setFocus] = useState(topTypes[0]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const order = [focus, ...topTypes.filter((type) => type !== focus)].join('');
    setLoading(true);
    setError(false);
    fetch(`${API}/study-options?types=${order}`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('catalog unavailable'); return response.json(); })
      .then((result) => setPrograms(result.items || []))
      .catch((caught) => { if (caught.name !== 'AbortError') setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [focus, topTypes.join('')]);

  return <section className="study-recommendations" aria-labelledby="study-title">
    <p className="study-eyebrow">{t.eyebrow}</p>
    <h4 id="study-title">{t.title}</h4>
    <p className="study-intro">{t.intro}</p>
    <div className="study-focus"><strong>{t.focus}</strong><div>{topTypes.map((type) => <button type="button" key={type} aria-pressed={focus === type} onClick={() => setFocus(type)} style={{ '--focus-color': typePalette[type] }}>{type} · {riasec[lang][type].name}</button>)}</div></div>
    <h5>{t.countries}</h5>
    <div className="study-countries">{countries.map((country) => <article key={country.id} className="study-country"><div className="study-country-head"><span>{country.names[lang]}</span><a href={`/countries#${country.id}`} aria-label={`${t.more}: ${country.names[lang]}`}>↗</a></div><p>{t.universities}</p><ul>{country.universities.map((university) => <li key={university}>{university}</li>)}</ul></article>)}</div>
    <div className="study-program-head"><h5>{t.catalog}</h5><span>{loading ? t.loading : error ? t.unavailable : `${programs.length}`}</span></div>
    {!loading && !error && <div className="study-programs">{programs.map((item, index) => <article key={`${item.university}-${item.program}-${index}`}><span className="study-program-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{item.university}</strong><p>{item.city} · {item.country}</p></div><div><small>{t.faculty}</small><span>{item.faculty}</span></div><div><small>{t.program}</small><span>{item.program}</span></div></article>)}</div>}
    <p className="study-note">{t.note}</p>
    <a className="button button--outline" href="/countries">{t.more} <span aria-hidden="true">→</span></a>
  </section>;
}
