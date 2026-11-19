import { careerGroups } from './careerSuggestions';

export const tasks = {
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


export function careerExperiments(topTypes, lang) {
  return careerGroups(topTypes, lang, 2).flatMap(({ type, careers }) =>
    careers.map(({ name, index }) => ({ type, name, task: tasks[type][index]?.[lang] })).filter(({ task }) => task));
}
