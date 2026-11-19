import { careerExperiments } from './careerTrialData';
import { typePalette } from './content';

const labels = {
  ru: {
    eyebrow: 'ПРОВЕРЬ НА ПРАКТИКЕ', title: 'Как понять, нравится ли тебе профессия',
    intro: 'Выбери одну задачу на этой неделе. Попробуй обычную часть работы, а не только красивое название профессии.',
    action: 'Попробуй', reflection: 'После задания спроси себя',
    questions: ['Было ли интересно в процессе?', 'Хотелось ли разобраться глубже?', 'Повторил бы ты это ещё раз?'],
    note: 'Одна попытка не решает выбор навсегда. Если задача понравилась, поговори со специалистом или найди короткую практику.',
  },
  ky: {
    eyebrow: 'ИШ ЖҮЗҮНДӨ СЫНА', title: 'Кесип сага жагаарын кантип билсе болот',
    intro: 'Ушул жумада бир тапшырманы танда. Кесиптин атын эле эмес, күнүмдүк ишинин бир бөлүгүн сынап көр.',
    action: 'Сынап көр', reflection: 'Тапшырмадан кийин өзүңө суроо бер',
    questions: ['Иштеп жатканда кызыктуу болдубу?', 'Дагы тереңирээк билгиң келдиби?', 'Муну кайра кылгың келеби?'],
    note: 'Бир аракет акыркы чечим эмес. Жакса, ошол кесиптеги адам менен сүйлөш же кыска практика изде.',
  },
  en: {
    eyebrow: 'TRY IT FOR REAL', title: 'How to find out whether a career suits you',
    intro: 'Choose one task this week. Try a small part of the everyday work, beyond the job title.',
    action: 'Try this', reflection: 'Afterwards, ask yourself',
    questions: ['Did I enjoy the process?', 'Did I want to learn more?', 'Would I do it again?'],
    note: 'One try is not a final decision. If you enjoy it, talk to a professional or look for a short placement.',
  },
};


export default function CareerExperiments({ lang, topTypes }) {
  const language = labels[lang] ? lang : 'ru';
  const t = labels[language];
  const suggestions = careerExperiments(topTypes, language);

  return <section className="career-experiments" aria-labelledby="career-experiments-title">
    <p className="career-experiments-eyebrow">{t.eyebrow}</p>
    <h4 id="career-experiments-title">{t.title}</h4>
    <p className="career-experiments-intro">{t.intro}</p>
    <div className="career-experiments-grid">
      {suggestions.map(({ type, name, task }) => <article key={`${type}-${name}`} className="career-experiment" style={{ '--trial-color': typePalette[type] }}>
        <div className="career-experiment-head"><span>{type}</span><h5>{name}</h5></div>
        <strong>{t.action}</strong><p>{task}</p>
      </article>)}
    </div>
    <div className="career-experiments-reflection"><strong>{t.reflection}</strong><ul>{t.questions.map((question) => <li key={question}>{question}</li>)}</ul><p>{t.note}</p></div>
  </section>;
}
