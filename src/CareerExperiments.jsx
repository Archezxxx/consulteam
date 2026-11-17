import { careerGroups } from './careerSuggestions';
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

const tasks = {
  R: [
    { ru: 'Построй из бумаги и скотча мост, который выдержит книгу. После первой проверки улучши конструкцию.', ky: 'Кагаз менен скотчтон китепти көтөрө турган көпүрө жаса. Биринчи сыноодон кийин түзүлүшүн жакшырт.', en: 'Build a paper and tape bridge that can hold a book. Improve it after the first test.' },
    { ru: 'Нарисуй схему освещения комнаты: где будут лампы, выключатели и защитные устройства. Не работай с электросетью.', ky: 'Бөлмөнүн жарык схемасын тарт: чырактар, өчүргүчтөр жана коргоо түзмөктөрү кайда болот? Электр тармагына тийбе.', en: 'Sketch a room lighting plan with lamps, switches and safety devices. Do not work on live wiring.' },
  ],
  I: [
    { ru: 'Сделай программу или таблицу, которая считает расходы класса. Проверь её на пяти разных примерах.', ky: 'Класстын чыгымын эсептеген программа же таблица түз. Аны беш башка мисал менен текшер.', en: 'Make a small program or spreadsheet that totals class expenses. Test it with five examples.' },
    { ru: 'Изучи на уроке биологии, как работает сердце. Объясни однокласснику, какие вопросы врач задаёт перед обследованием.', ky: 'Биология сабагында жүрөк кантип иштээрин үйрөн. Дарыгер текшерүүдөн мурун кандай суроолорду берерин классташыңа түшүндүр.', en: 'Learn how the heart works in biology class. Explain what questions a doctor asks before an examination.' },
  ],
  A: [
    { ru: 'Создай афишу для школьного события. Покажи её трём людям и измени дизайн по их отзывам.', ky: 'Мектеп иш-чарасына афиша жаса. Аны үч адамга көрсөтүп, пикирлерине жараша дизайнын өзгөрт.', en: 'Design a poster for a school event. Show it to three people and revise it using their feedback.' },
    { ru: 'Нарисуй план удобного класса или комнаты. Объясни, как в нём двигаться, работать и хранить вещи.', ky: 'Ыңгайлуу класс же бөлмөнүн планын тарт. Анда кантип жүрүп, иштеп жана буюм сактоону түшүндүр.', en: 'Sketch a more usable classroom or room. Explain how people move, work and store things in it.' },
  ],
  S: [
    { ru: 'Объясни одноклассникам тему, которую хорошо знаешь. Спроси, что осталось непонятным, и попробуй объяснить иначе.', ky: 'Жакшы билген темаңызды классташтарыңа түшүндүр. Эмне түшүнүксүз калганын сурап, башкача айтып көр.', en: 'Teach classmates a topic you know well. Ask what is still unclear and explain it another way.' },
    { ru: 'С разрешения друга выслушай его рассказ о сложной ситуации. Перескажи, что понял, не перебивая и не давая непрошеных советов.', ky: 'Досуңдун макулдугу менен анын кыйын жагдайын ук. Сөзүн бөлбөй, суралбаган кеңеш бербей, түшүнгөнүңдү кайтала.', en: 'With a friend’s permission, listen to a difficult story. Summarize what you heard without interrupting or giving unsolicited advice.' },
  ],
  E: [
    { ru: 'Организуй маленький проект для класса: раздели задачи, назначь сроки и после спроси команду, что сработало.', ky: 'Класс үчүн чакан долбоор уюштур: иштерди бөл, мөөнөт кой жана соңунда командадан эмне жакшы болгонун сура.', en: 'Organize a small class project: assign tasks and deadlines, then ask the team what worked.' },
    { ru: 'Придумай полезную школьную услугу. Спроси пять учеников, нужна ли она, и посчитай примерные расходы.', ky: 'Мектепке пайдалуу кызмат ойлоп тап. Беш окуучудан керекпи деп сурап, болжолдуу чыгымын эсепте.', en: 'Imagine a useful school service. Ask five students if they need it and estimate the costs.' },
  ],
  C: [
    { ru: 'Составь в таблице бюджет школьного проекта. Сверь каждую сумму с чеком или записью.', ky: 'Мектеп долбоорунун бюджетин таблицага жаз. Ар бир сумманы чек же жазуу менен салыштыр.', en: 'Track a school project budget in a spreadsheet. Match every amount to a receipt or record.' },
    { ru: 'Сравни три варианта покупки для класса по цене, сроку и качеству. Объясни, какой выбрал бы и почему.', ky: 'Класс үчүн үч сатып алуу вариантын баасы, убактысы жана сапаты боюнча салыштыр. Тандооңду түшүндүр.', en: 'Compare three purchase options for your class by price, timing and quality. Explain your choice.' },
  ],
};

export default function CareerExperiments({ lang, topTypes }) {
  const language = labels[lang] ? lang : 'ru';
  const t = labels[language];
  const suggestions = careerGroups(topTypes, language, 2).flatMap(({ type, careers }) =>
    careers.map(({ name, index }) => ({ type, name, task: tasks[type][index]?.[language] })).filter(({ task }) => task));

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
