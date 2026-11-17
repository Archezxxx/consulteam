import { useState } from 'react';
import { countries, riasec, typePalette } from './content';
import { studyFields, studyUniversities, universitiesForCountry } from './studyCatalog';
import { rankUniversities, universityImage } from './UniversityDirectory';

const labels = {
  ru: { eyebrow: 'ПОСЛЕ ТЕСТА', title: 'Где учиться с твоим профилем', intro: 'Здесь собраны страны, расходы, возможности грантов и примеры университетов с подходящими направлениями. Полный список вузов открыт в каталоге.', focus: 'Профиль интересов', count: 'университетов в каталоге', match: 'Подходящие направления', all: 'Посмотреть все университеты', note: 'Стоимость и условия зависят от программы и года поступления. Консультант уточнит актуальные данные.', tuition: 'Обучение', living: 'Проживание', grants: 'Гранты', countryInfo: 'О стране', universityList: 'Все вузы' },
  ky: { eyebrow: 'ТЕСТТЕН КИЙИН', title: 'Профилиң менен кайда окуса болот', intro: 'Бул жерде өлкөлөр, чыгымдар, гранттар жана ылайыктуу багыттары бар университеттердин мисалдары бар. Толук тизме каталогдо.', focus: 'Кызыгуу профили', count: 'университет каталогдо', match: 'Ылайыктуу багыттар', all: 'Бардык университеттерди көрүү', note: 'Баалар жана шарттар программага жана окууга тапшыруу жылына жараша өзгөрөт. Кеңешчи актуалдуу маалыматты тактайт.', tuition: 'Окуу акысы', living: 'Жашоо', grants: 'Гранттар', countryInfo: 'Өлкө жөнүндө', universityList: 'Бардык ЖОЖдор' },
  en: { eyebrow: 'AFTER THE TEST', title: 'Where your profile could take you', intro: 'Compare countries, costs, scholarships and a university example with relevant fields. The full university list is in the directory.', focus: 'Interest profile', count: 'universities in the directory', match: 'Relevant fields', all: 'Explore all universities', note: 'Costs and requirements vary by programme and intake year. An adviser will confirm current details.', tuition: 'Tuition', living: 'Living costs', grants: 'Scholarships', countryInfo: 'About the country', universityList: 'All universities' },
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
        return <article className="study-preview" key={country.id}>
          <div className="study-preview-photo" data-crop={university.photoCrop || undefined}>{photo ? <img src={photo} alt={`${university.name} — ${country.names[lang]}`} loading="lazy" decoding="async" /> : null}<span>{country.names[lang]}</span></div>
          <div className="study-preview-copy">
            <h5>{university.name}</h5><p>{university.city}</p>
            <span className="study-preview-caption">{t.match}</span>
            <div className="study-preview-fields">{(matches.length ? matches : university.fields.slice(0, 2)).map((field) => <span key={field}>{studyFields[field].label[lang]}</span>)}</div>
            <dl className="study-preview-facts">
              <div><dt>{t.tuition}</dt><dd>{country.tuition[lang]}</dd></div>
              <div><dt>{t.living}</dt><dd>{country.living[lang]}</dd></div>
              <div><dt>{t.grants}</dt><dd>{country.grants[lang]}</dd></div>
            </dl>
            <div className="study-preview-links"><a href={`/countries/${country.id}`}>{t.countryInfo} <span aria-hidden="true">↗</span></a><a href={`/universities?type=${focus}#study-${country.id}`}>{t.universityList} <span aria-hidden="true">→</span></a></div>
          </div>
        </article>;
      })}
    </div>
    <div className="study-preview-footer"><p>{t.note}</p><a className="button button--black" href={`/universities?type=${focus}`}>{t.all} <span aria-hidden="true">→</span></a><span>{studyUniversities.length} {t.count}</span></div>
  </section>;
}
