export const TYPE_ORDER = ['R', 'I', 'A', 'S', 'E', 'C'];

export const typePalette = {
  R: '#2F66D0',
  I: '#228765',
  A: '#D89A1D',
  S: '#7657B8',
  E: '#CE4D45',
  C: '#68707D',
};

const ml = (ky, ru, en) => ({ ky, ru, en });

const option = (type, secondary, ky, ru, en) => ({
  type,
  text: ml(ky, ru, en),
  scores: { [type]: 3, [secondary]: 1 },
});

export const questions = [
  {
    prompt: ml('Бош күнүңдө кайсы ишти тандайт элең?', 'Какое занятие ты бы выбрал в свободный день?', 'What would you choose to do on a free day?'),
    order: ['A', 'R', 'S', 'I', 'E', 'C'],
    options: {
      R: option('R', 'I', 'Велосипедди, компьютерди же бир нерсени оңдоп көрөм', 'Попробую починить велосипед, компьютер или другую вещь', 'Try to repair a bicycle, computer, or another object'),
      I: option('I', 'R', 'Кызык суроону изилдеп, анын жообун табам', 'Исследую интересный вопрос и найду объяснение', 'Research an interesting question and find an explanation'),
      A: option('A', 'S', 'Видео, сүрөт, музыка же жаңы образ жаратам', 'Создам видео, рисунок, музыку или новый образ', 'Create a video, illustration, music, or a new visual idea'),
      S: option('S', 'A', 'Достор менен жолугуп, бирөөгө жардам берем', 'Встречусь с друзьями или помогу кому-нибудь', 'Meet friends or help someone with a problem'),
      E: option('E', 'S', 'Чакан иш-чара же пайдалуу долбоор уюштурам', 'Организую небольшое событие или полезный проект', 'Organize a small event or a useful project'),
      C: option('C', 'I', 'Бөлмөнү, файлдарды же пландарды иретке келтирем', 'Наведу порядок в комнате, файлах или планах', 'Organize my room, files, or upcoming plans'),
    },
  },
  {
    prompt: ml('Топтук тапшырмада сага кайсы роль ыңгайлуу?', 'Какая роль в командном задании тебе ближе?', 'Which role feels most natural in a team assignment?'),
    order: ['E', 'S', 'C', 'A', 'I', 'R'],
    options: {
      R: option('R', 'C', 'Макетти же иштеген үлгүнү чогултуу', 'Собрать макет или работающий прототип', 'Build the model or working prototype'),
      I: option('I', 'C', 'Маалыматты текшерип, туура чечимди эсептөө', 'Проверить факты и рассчитать лучшее решение', 'Check the facts and calculate the best solution'),
      A: option('A', 'E', 'Концепцияны, аталышты жана көрүнүштү ойлоп табуу', 'Придумать концепцию, название и визуальный стиль', 'Develop the concept, name, and visual direction'),
      S: option('S', 'E', 'Баарын угуп, командага түшүндүрүп жана колдоо', 'Выслушать всех, объяснять и поддерживать команду', 'Listen to everyone, explain, and support the team'),
      E: option('E', 'C', 'Максат коюп, ролдорду бөлүштүрүп, чечим кабыл алуу', 'Поставить цель, распределить роли и принимать решения', 'Set the goal, assign roles, and make decisions'),
      C: option('C', 'R', 'Мөөнөттү, файлдарды жана тапшырмалар тизмесин көзөмөлдөө', 'Следить за сроками, файлами и списком задач', 'Track deadlines, files, and the task list'),
    },
  },
  {
    prompt: ml('Татаал маселе чыкканда биринчи эмне кыласың?', 'Что ты делаешь первым, когда появляется сложная проблема?', 'What do you do first when a difficult problem appears?'),
    order: ['I', 'C', 'R', 'S', 'A', 'E'],
    options: {
      R: option('R', 'I', 'Ар кандай ыкманы дароо сынап көрөм', 'Сразу пробую разные практические способы', 'Immediately test a few practical approaches'),
      I: option('I', 'C', 'Себептерин бөлүп, маалыматты талдайм', 'Разбираю причины и анализирую данные', 'Break down the causes and analyze the evidence'),
      A: option('A', 'I', 'Күтүлбөгөн, стандарттуу эмес жол издейм', 'Ищу неожиданный, нестандартный подход', 'Look for an unexpected, unconventional approach'),
      S: option('S', 'E', 'Башкалар менен сүйлөшүп, ар кимдин оюн угам', 'Обсуждаю с людьми и выслушиваю разные мнения', 'Talk it through and listen to different perspectives'),
      E: option('E', 'R', 'Тез чечим кабыл алып, ишти алдыга жылдырам', 'Быстро принимаю решение и двигаю дело вперед', 'Make a quick decision and move the work forward'),
      C: option('C', 'I', 'Нускама, мисал же так план табам', 'Нахожу инструкцию, пример или четкий план', 'Find instructions, an example, or a clear plan'),
    },
  },
  {
    prompt: ml('Кайсы жумуш чөйрөсүндө өзүңдү эркин сезесиң?', 'В какой рабочей среде ты чувствуешь себя свободнее?', 'Which work environment would make you feel most at ease?'),
    order: ['S', 'A', 'R', 'C', 'E', 'I'],
    options: {
      R: option('R', 'I', 'Устакана, лаборатория же техника бар аянт', 'Мастерская, лаборатория или площадка с техникой', 'A workshop, lab, or site with equipment'),
      I: option('I', 'C', 'Тынч жер, маалымат жана терең ойлонууга убакыт', 'Спокойное место, данные и время на глубокую работу', 'A quiet place, useful data, and time to think deeply'),
      A: option('A', 'S', 'Студия же эркин идеяларга ачык мейкиндик', 'Студия или пространство, открытое свободным идеям', 'A studio or open space that welcomes free ideas'),
      S: option('S', 'E', 'Адамдар көп болгон мектеп, клиника же борбор', 'Школа, клиника или центр, где много общения', 'A school, clinic, or community center full of people'),
      E: option('E', 'S', 'Кыймылдуу кеңсе, жолугушуулар жана сүйлөшүүлөр', 'Динамичный офис, встречи и переговоры', 'A dynamic office with meetings and negotiations'),
      C: option('C', 'I', 'Так процесс, түшүнүктүү эрежелер жана таза система', 'Понятные процессы, правила и аккуратная система', 'Clear processes, rules, and an orderly system'),
    },
  },
  {
    prompt: ml('Кайсы сабак же тапшырма сага көбүрөөк энергия берет?', 'Какой предмет или тип задания дает тебе больше энергии?', 'Which subject or task gives you the most energy?'),
    order: ['C', 'I', 'A', 'R', 'S', 'E'],
    options: {
      R: option('R', 'I', 'Технология, робототехника, дене тарбия же практика', 'Технология, робототехника, физкультура или практика', 'Technology, robotics, physical education, or practical work'),
      I: option('I', 'C', 'Математика, физика, биология же программалоо', 'Математика, физика, биология или программирование', 'Mathematics, physics, biology, or programming'),
      A: option('A', 'S', 'Адабият, дизайн, музыка же чыгармачыл жазуу', 'Литература, дизайн, музыка или творческое письмо', 'Literature, design, music, or creative writing'),
      S: option('S', 'A', 'Тил, тарых, коом таануу же презентация', 'Языки, история, обществознание или презентации', 'Languages, history, social studies, or presentations'),
      E: option('E', 'C', 'Экономика, дебат, ишкердик же долбоор башкаруу', 'Экономика, дебаты, предпринимательство или управление проектом', 'Economics, debate, entrepreneurship, or project leadership'),
      C: option('C', 'I', 'Информатика, эсеп, документ же таблица менен иштөө', 'Информатика, расчеты, документы или таблицы', 'Computer studies, calculations, documents, or spreadsheets'),
    },
  },
  {
    prompt: ml('Кайсы натыйжа сени көбүрөөк сыймыктандырат?', 'Какой результат вызовет у тебя больше гордости?', 'Which result would make you feel most proud?'),
    order: ['R', 'E', 'A', 'I', 'C', 'S'],
    options: {
      R: option('R', 'C', 'Мен жасаган нерсе чындап иштеп калды', 'То, что я сделал руками, действительно работает', 'Something I built with my hands actually works'),
      I: option('I', 'R', 'Мен татаал суроонун туура жообун таптым', 'Я нашел верное объяснение сложной задачи', 'I found the right explanation for a hard problem'),
      A: option('A', 'E', 'Менин идеям адамдарды таң калтырды', 'Моя идея удивила людей и запомнилась им', 'My idea surprised people and stayed with them'),
      S: option('S', 'A', 'Менден кийин бир адамга жеңил болуп калды', 'После моей помощи человеку стало легче', 'Someone felt better or grew because I helped'),
      E: option('E', 'S', 'Команда мен койгон максатка жетти', 'Команда достигла цели, которую я помог поставить', 'The team reached a goal I helped set'),
      C: option('C', 'I', 'Баары катасыз, так жана өз убагында бүттү', 'Все выполнено без ошибок, точно и вовремя', 'Everything was accurate, error-free, and on time'),
    },
  },
  {
    prompt: ml('Мектепте жаңы клуб ачылса, кайсынысына кошулат элең?', 'Если бы в школе появились новые клубы, какой ты бы выбрал?', 'If your school opened new clubs, which would you join?'),
    order: ['A', 'I', 'E', 'S', 'R', 'C'],
    options: {
      R: option('R', 'I', 'Робот, авто-модель же 3D-басма клубу', 'Клуб робототехники, автомоделей или 3D-печати', 'Robotics, model building, or 3D-printing club'),
      I: option('I', 'C', 'Илимий эксперимент жана олимпиада клубу', 'Клуб научных экспериментов и олимпиад', 'Science experiments and academic competition club'),
      A: option('A', 'S', 'Медиа, театр, дизайн же музыка клубу', 'Медиа-, театральный, дизайнерский или музыкальный клуб', 'Media, theatre, design, or music club'),
      S: option('S', 'E', 'Волонтердук жана насаатчылык клубу', 'Клуб волонтерства и наставничества', 'Volunteering and peer mentoring club'),
      E: option('E', 'C', 'Дебат, стартап же окуучулар кеңеши', 'Дебаты, стартап-клуб или ученический совет', 'Debate, startup club, or student council'),
      C: option('C', 'I', 'Финансы, шахмат же маалымат уюштуруу клубу', 'Клуб финансов, шахмат или организации данных', 'Finance, chess, or data organization club'),
    },
  },
  {
    prompt: ml('Жаңы нерсени кандай үйрөнгөнүң ыңгайлуу?', 'Как тебе удобнее осваивать что-то новое?', 'How do you prefer to learn something new?'),
    order: ['I', 'R', 'A', 'S', 'C', 'E'],
    options: {
      R: option('R', 'I', 'Өзүм жасап көрүп, катадан үйрөнөм', 'Пробую сам и учусь на своих ошибках', 'Try it myself and learn from mistakes'),
      I: option('I', 'C', 'Принципти түшүнүп, суроолорду изилдейм', 'Сначала понимаю принцип и исследую вопросы', 'Understand the principle and investigate questions'),
      A: option('A', 'R', 'Өз ыкмамды таап, эркин эксперимент кылам', 'Нахожу свой способ и свободно экспериментирую', 'Find my own method and experiment freely'),
      S: option('S', 'A', 'Бирөө менен талкуулап же башкага түшүндүрөм', 'Обсуждаю с кем-то или объясняю другому', 'Discuss it with someone or explain it to another person'),
      E: option('E', 'S', 'Дароо максат коюп, практикада колдонуп көрөм', 'Ставлю цель и сразу применяю знание на деле', 'Set a goal and apply the knowledge right away'),
      C: option('C', 'I', 'Кадамдык нускама жана мисалдар менен барам', 'Иду по пошаговой инструкции и примерам', 'Follow step-by-step instructions and examples'),
    },
  },
  {
    prompt: ml('Досуң сага көйгөйү менен келсе, сен көбүнчө…', 'Когда друг приходит к тебе с проблемой, ты чаще…', 'When a friend comes to you with a problem, you usually…'),
    order: ['S', 'I', 'E', 'R', 'C', 'A'],
    options: {
      R: option('R', 'S', 'Дароо жардам бере турган конкреттүү ишти кылам', 'Сразу делаю конкретное действие, которое поможет', 'Take a concrete action that can help right now'),
      I: option('I', 'S', 'Эмне болгонун тактап, себептерин талдайм', 'Уточняю детали и разбираю причины ситуации', 'Ask for details and analyze what caused the situation'),
      A: option('A', 'S', 'Абалга башкача көз караш сунуштайм', 'Предлагаю посмотреть на ситуацию с другой стороны', 'Offer a fresh way to look at the situation'),
      S: option('S', 'A', 'Кунт коюп угуп, сезимин түшүнүүгө аракет кылам', 'Внимательно слушаю и стараюсь понять чувства', 'Listen carefully and try to understand how they feel'),
      E: option('E', 'S', 'Чечим сунуштап, аракетке түрткү берем', 'Предлагаю решение и мотивирую действовать', 'Suggest a solution and motivate them to act'),
      C: option('C', 'I', 'Кадамдарга бөлүп, эмне кылуу керектигин жазам', 'Разбиваю проблему на шаги и составляю план', 'Break the problem into steps and make a plan'),
    },
  },
  {
    prompt: ml('План күтүүсүз өзгөрсө, сага кайсы реакция жакын?', 'Как ты реагируешь, если план внезапно изменился?', 'How do you react when the plan suddenly changes?'),
    order: ['E', 'A', 'C', 'R', 'S', 'I'],
    options: {
      R: option('R', 'E', 'Жаңы шартка ылайык ишти дароо улантам', 'Быстро приспосабливаюсь и продолжаю действовать', 'Adapt quickly and keep working with what is available'),
      I: option('I', 'C', 'Жаңы маалыматты баалап, мыкты вариантты эсептейм', 'Оцениваю новые данные и выбираю лучший вариант', 'Evaluate the new information and choose the best option'),
      A: option('A', 'E', 'Өзгөрүүнү жаңы мүмкүнчүлүк катары көрөм', 'Вижу в изменении возможность придумать что-то новое', 'Treat the change as a chance to invent something new'),
      S: option('S', 'C', 'Команда кандай сезип жатканын билип, тил табышам', 'Сверяюсь с командой и помогаю всем договориться', 'Check in with the team and help everyone agree'),
      E: option('E', 'R', 'Багытты тез өзгөртүп, жоопкерчиликти алам', 'Быстро меняю курс и беру ответственность', 'Change direction quickly and take responsibility'),
      C: option('C', 'I', 'Планды кайра түзүп, жаңы тартипти бекитем', 'Пересобираю план и фиксирую новый порядок', 'Rebuild the plan and establish the new order'),
    },
  },
  {
    prompt: ml('Келечектеги жумушта сен үчүн эң маанилүүсү эмне?', 'Что для тебя важнее всего в будущей работе?', 'What matters most to you in a future job?'),
    order: ['C', 'S', 'I', 'E', 'A', 'R'],
    options: {
      R: option('R', 'C', 'Көзгө көрүнгөн, пайдалуу натыйжа жаратуу', 'Создавать полезный результат, который можно увидеть', 'Create a useful result that can be seen or used'),
      I: option('I', 'A', 'Татаал суроолорго жооп таап, өнүгүү', 'Решать сложные задачи и постоянно развиваться', 'Solve complex questions and keep learning'),
      A: option('A', 'I', 'Эркиндик, оригиналдуулук жана өз кол тамгам', 'Свобода, оригинальность и возможность выражать себя', 'Freedom, originality, and room for self-expression'),
      S: option('S', 'E', 'Адамдарга түз пайда алып келүү', 'Приносить людям прямую пользу', 'Make a direct positive difference for people'),
      E: option('E', 'C', 'Таасир, өсүү жана чоң максаттар', 'Влияние, рост и большие цели', 'Influence, growth, and ambitious goals'),
      C: option('C', 'R', 'Туруктуулук, тактык жана түшүнүктүү милдеттер', 'Стабильность, точность и понятные обязанности', 'Stability, accuracy, and clearly defined responsibilities'),
    },
  },
  {
    prompt: ml('Узак долбоордо күчүңдү эмне сактап турат?', 'Что помогает тебе не потерять интерес в долгом проекте?', 'What keeps you engaged during a long project?'),
    order: ['R', 'C', 'S', 'A', 'E', 'I'],
    options: {
      R: option('R', 'C', 'Ар бир этапта иштеген натыйжаны көрүү', 'Видеть работающий результат после каждого этапа', 'Seeing a working result after each stage'),
      I: option('I', 'A', 'Ар дайым жаңы нерсе табылып турушу', 'Постоянно находить новые знания и закономерности', 'Continuing to discover new knowledge and patterns'),
      A: option('A', 'E', 'Идеяны өзүм каалагандай өнүктүрүү', 'Развивать идею по-своему', 'Developing the idea in my own way'),
      S: option('S', 'E', 'Команда жана иштин кимге пайдалуу экенин көрүү', 'Команда и понимание, кому поможет наша работа', 'The team and knowing who our work will help'),
      E: option('E', 'C', 'Так максат жана өсүп жаткан көрсөткүчтөр', 'Четкая цель и заметный рост результатов', 'A clear target and measurable progress'),
      C: option('C', 'I', 'План, график жана белгиленген этаптар', 'План, график и отмеченные этапы', 'A plan, schedule, and milestones I can check off'),
    },
  },
  {
    prompt: ml('Кесиптер жарманкесинде биринчи кайсы адиске барасың?', 'К какому специалисту ты первым подойдешь на ярмарке профессий?', 'Who would you speak with first at a career fair?'),
    order: ['A', 'S', 'I', 'C', 'R', 'E'],
    options: {
      R: option('R', 'I', 'Инженерге, электрикке же IT-техникке', 'К инженеру, электрику или IT-технику', 'An engineer, electrician, or IT technician'),
      I: option('I', 'R', 'Программистке, дарыгерге же окумуштууга', 'К программисту, врачу или ученому', 'A programmer, doctor, or scientist'),
      A: option('A', 'S', 'Дизайнерге, архитекторго же журналистке', 'К дизайнеру, архитектору или журналисту', 'A designer, architect, or journalist'),
      S: option('S', 'A', 'Мугалимге, психологго же тренерге', 'К учителю, психологу или тренеру', 'A teacher, psychologist, or trainer'),
      E: option('E', 'S', 'Ишкерге, менеджерге же жетекчиге', 'К предпринимателю, менеджеру или руководителю', 'An entrepreneur, manager, or team leader'),
      C: option('C', 'I', 'Бухгалтерге, банкирге же экономистке', 'К бухгалтеру, банкиру или экономисту', 'An accountant, banker, or economist'),
    },
  },
  {
    prompt: ml('Сага кайсы мактоо өзгөчө жагымдуу?', 'Какая похвала особенно приятна для тебя?', 'Which compliment would mean the most to you?'),
    order: ['I', 'E', 'R', 'A', 'C', 'S'],
    options: {
      R: option('R', 'C', '«Сенин колуңдан баары келет»', '«Ты умеешь превращать идею в работающую вещь»', '“You can turn an idea into something that works”'),
      I: option('I', 'A', '«Сен маселенин өзөгүн бат табасың»', '«Ты быстро находишь суть сложной проблемы»', '“You quickly get to the heart of a complex problem”'),
      A: option('A', 'I', '«Сен эч ким ойлобогондой ойлойсуң»', '«Ты думаешь не так, как все»', '“You see things in a way no one else does”'),
      S: option('S', 'A', '«Сенин жаныңда адамдар өзүн жакшы сезет»', '«Рядом с тобой людям спокойно и понятно»', '“People feel understood and comfortable around you”'),
      E: option('E', 'S', '«Сен адамдарды ишке ишендире аласың»', '«Ты умеешь увлечь людей и повести за собой»', '“You can inspire people and lead them forward”'),
      C: option('C', 'I', '«Сенде баары так жана ишенимдүү»', '«У тебя все точно, надежно и по делу»', '“Your work is precise, reliable, and well organized”'),
    },
  },
  {
    prompt: ml('Бир жылдык жеке долбоор тандасаң, кайсынысы кызык?', 'Какой личный проект на год тебе был бы интереснее?', 'Which year-long personal project sounds most exciting?'),
    order: ['E', 'R', 'A', 'C', 'I', 'S'],
    options: {
      R: option('R', 'I', 'Акылдуу түзмөк же пайдалуу буюм жасоо', 'Сделать умное устройство или полезный предмет', 'Build a smart device or a useful physical product'),
      I: option('I', 'C', 'Изилдөө жүргүзүп, жыйынтыгын далилдөө', 'Провести исследование и доказать выводы', 'Conduct research and support the findings with evidence'),
      A: option('A', 'E', 'Фильм, бренд, көргөзмө же медиа-долбоор жаратуу', 'Создать фильм, бренд, выставку или медиапроект', 'Create a film, brand, exhibition, or media project'),
      S: option('S', 'E', 'Балдарга же коомго жардам берген программа ачуу', 'Запустить программу помощи детям или сообществу', 'Launch a program that helps students or the community'),
      E: option('E', 'C', 'Кичи бизнес же окуучулук стартап ачуу', 'Запустить небольшой бизнес или ученический стартап', 'Start a small business or student venture'),
      C: option('C', 'I', 'Маалымат базасын, бюджетти же ыңгайлуу системаны түзүү', 'Создать базу данных, бюджет или удобную систему', 'Create a database, budget, or efficient system'),
    },
  },
];

const privacy = {
  ky: `Биз купуялуулукка жоопкерчиликтүү мамиле кылабыз. Тесттин жооптору браузериңизде гана эсептелет жана серверге жөнөтүлбөйт. WhatsApp аркылуу өзүңүз жазганда гана аты-жөнүңүз же байланыш маалыматыңыз бизге жетет. Бул маалымат консультация жана окуу багытын тандоо үчүн гана колдонулат жана ачык макулдугуңузсуз үчүнчү жактарга берилбейт.`,
  ru: `Мы ответственно относимся к приватности. Ответы теста рассчитываются только в вашем браузере и не отправляются на сервер. Имя и контактные данные поступают нам только тогда, когда вы сами пишете в WhatsApp. Эти данные используются только для консультации и подбора образовательного направления и не передаются третьим лицам без вашего согласия.`,
  en: `We take privacy seriously. Your test answers are calculated only in your browser and are not sent to a server. We receive your name or contact details only if you choose to message us on WhatsApp. We use that information solely for consultation and study-planning purposes and do not share it without your consent.`,
};

export const content = {
  ky: {
    language: 'Кыргызча',
    nav: { quiz: 'Кесиптик тест', approach: 'Кантип иштейбиз', destinations: 'Өлкөлөр', exams: 'Сынактар', contact: 'Байланыш' },
    hero: {
      eyebrow: 'Кесипти тандап, анан өлкөнү танда',
      title: 'Келечегиңди кокусунан тандаба.',
      lead: '15 суроодон турган тест сенин кызыгууңду RIASEC модели боюнча талдап, сага ылайыктуу кесиптик багыттарды көрсөтөт.',
      primary: 'Тестти баштоо',
      secondary: 'Окуу өлкөлөрү',
      note: '7 мүнөт · бекер · каттоосуз',
      photoAlt: 'Азиядагы университет шаарынын архитектурасы',
    },
    trust: ['15 кырдаалдык суроо', '6 кесиптик тип', '3 негизги багыт', 'Жеке жыйынтык'],
    approach: {
      eyebrow: 'Жөн гана өлкө эмес — туура багыт',
      title: 'Алгач өзүңдү түшүнөбүз. Анан окуу планын түзөбүз.',
      intro: 'Тест диагноз эмес жана бир кесипке байлап койбойт. Ал кызыгууңду түшүнүүгө, варианттарды салыштырууга жана кийинки кадамды тактоого жардам берет.',
      steps: [
        { n: '01', title: 'Кызыгууңду аныкта', text: 'Жоопторуң практикалык, аналитикалык, чыгармачыл, социалдык, ишкер жана тартипчил багыттар боюнча эсептелет.' },
        { n: '02', title: 'Профилиңди түшүн', text: 'Бир гана тип эмес, үч күчтүү багыт жана алардын айкалышы көрсөтүлөт.' },
        { n: '03', title: 'Окуу жолун түз', text: 'Кесиптерди, мектептеги сабактарды жана ылайыктуу окуу чөйрөсүн кеңешчи менен салыштыр.' },
      ],
    },
    types: { eyebrow: 'RIASEC картасы', title: 'Алты тип. Сенде алардын бир нечеси айкалышат.', intro: 'Күчтүү профилдер көбүнчө 2–3 типтен турат. Ошондуктан жыйынтыкта рейтинг толугу менен көрүнөт.' },
    quiz: {
      eyebrow: 'Профориентация', title: 'Сага кайсы багыт жакын?', intro: '“Туура” жооп жок. Азыркы өзүңө көбүрөөк окшогон вариантты танда.',
      start: '15 суроону баштоо', duration: 'Орточо убакыт: 5–7 мүнөт', privacy: 'Жооптор серверге жөнөтүлбөйт.',
      question: 'Суроо', of: '/', back: 'Артка', next: 'Кийинки суроо', finish: 'Жыйынтыкты көрүү', choose: 'Улантуу үчүн бир вариантты танда.',
      resultEyebrow: 'Сенин RIASEC профилиң', resultTitle: 'Негизги кодуң', mixed: 'Сенде аралаш профиль бар: биринчи багыт жакын, бирок кийинки типтер да дээрлик бирдей күчтүү.', clear: 'Биринчи багыт айкын көрүнөт, ал эми кийинки эки тип анын кандай чөйрөдө ачыларын көрсөтөт.',
      chartTitle: 'Бардык алты багыт', topTitle: 'Сага жакын үч багыт', environments: 'Ыңгайлуу чөйрө', strengths: 'Күчтүү жактарың', careers: 'Карап көрө турган кесиптер', watch: 'Эске ала турган жагы', school: 'Азыр өнүктүрө турган сабактар жана көндүмдөр', nextSteps: 'Кийинки 3 кадам',
      retake: 'Кайра өтүү', print: 'Жыйынтыкты сактоо', consult: 'Кеңешчи менен талкуулоо', disclaimer: 'Бул тест кесиптик ой жүгүртүүгө жардам берет, бирок психологиялык диагноз эмес. Чечим кабыл алууда кызыгууңду, жөндөмүңдү, баалуулуктарыңды жана окуу мүмкүнчүлүктөрүңдү чогуу кара.',
      whatsappIntro: 'Салам! Мен Consulteam сайтындагы кесиптик тесттен өттүм.',
    },
    destinations: { eyebrow: 'Окуу географиясы', title: 'Багытыңа ылайык өлкөнү салыштыр.', intro: 'Окуу акысы, жашоо чыгымы жана грант мүмкүнчүлүгүн бир жерден кара. Презентациясы бар өлкөлөрдө толук маалымат ачылат.', explore: 'Толук маалымат', tuition: 'Окуу акысы', living: 'Жашоо', grants: 'Гранттар', universities: 'Университеттер', presentation: 'Презентацияны көрүү', ask: 'Ушул өлкө боюнча кеңеш алуу', destination: 'Багыт' },
    exams: { eyebrow: 'Даярдык', title: 'Максатка жараша сынакты тандайбыз.', intro: 'Керектүү тест университетке, программага жана окутуу тилине жараша өзгөрөт.', target: 'Максаттуу балл', cards: [
      { title: 'IELTS', text: 'Англис тилдүү программалар үчүн эл аралык тест.', meta: 'Listening · Reading · Writing · Speaking', score: '6.0–7.0+' },
      { title: 'TOEFL iBT', text: 'АКШ жана көптөгөн эл аралык ЖОЖдор кабыл алган тест.', meta: 'Reading · Listening · Speaking · Writing', score: '80–100+' },
      { title: 'SAT', text: 'Бакалавриатка кабыл алууда академиялык даярдыкты көрсөтөт.', meta: 'Reading & Writing · Math', score: '1200–1400+' },
    ] },
    cta: { eyebrow: 'Тесттен кийин', title: 'Натыйжаңды окуу планына айланталы.', text: 'Кеңешчи профиль, бюджет, тил деңгээли жана каалаган өлкөлөрүң боюнча реалдуу маршрут түзүүгө жардам берет.', button: 'WhatsApp аркылуу жазуу' },
    footer: { text: 'Кесип тандоодон университетке кабыл алууга чейин — түшүнүктүү маршрут.', address: 'Baytik Tower, 9-кабат · Бишкек', hours: 'Дш–Жм · 10:00–18:00', privacy: 'Купуялык', rights: '© 2026 Consulteam' },
    privacyTitle: 'Купуялык саясаты', privacyText: privacy.ky,
  },
  ru: {
    language: 'Русский',
    nav: { quiz: 'Профориентация', approach: 'Как это работает', destinations: 'Страны', exams: 'Экзамены', contact: 'Связаться' },
    hero: {
      eyebrow: 'Сначала специальность — затем страна',
      title: 'Не выбирай будущее наугад.',
      lead: 'Тест из 15 вопросов разберет твои интересы по модели RIASEC и покажет направления, в которых тебе будет легче развиваться.',
      primary: 'Пройти тест', secondary: 'Смотреть страны', note: '7 минут · бесплатно · без регистрации', photoAlt: 'Архитектура университетского города в Азии',
    },
    trust: ['15 ситуационных вопросов', '6 карьерных типов', '3 ведущих направления', 'Персональный разбор'],
    approach: {
      eyebrow: 'Не просто страна — подходящий путь', title: 'Сначала разбираемся в тебе. Потом строим план поступления.',
      intro: 'Тест не ставит диагноз и не привязывает к одной профессии. Он помогает назвать интересы, сравнить варианты и сделать следующий шаг осознанно.',
      steps: [
        { n: '01', title: 'Определи интересы', text: 'Ответы распределяются между практическим, аналитическим, творческим, социальным, предпринимательским и системным типами.' },
        { n: '02', title: 'Пойми свой профиль', text: 'Ты увидишь не один ярлык, а три ведущих типа и силу каждого направления.' },
        { n: '03', title: 'Собери учебный маршрут', text: 'Сравни профессии, школьные предметы и подходящую среду вместе с консультантом.' },
      ],
    },
    types: { eyebrow: 'Карта RIASEC', title: 'Шесть типов. В тебе сочетаются сразу несколько.', intro: 'Сильный профиль обычно состоит из 2–3 типов, поэтому результат показывает весь рейтинг, а не один ответ.' },
    quiz: {
      eyebrow: 'Профориентационный тест', title: 'Какое направление подходит тебе?', intro: 'Здесь нет “правильных” ответов. Выбирай вариант, который больше похож на тебя сейчас.',
      start: 'Начать 15 вопросов', duration: 'Среднее время: 5–7 минут', privacy: 'Ответы не отправляются на сервер.',
      question: 'Вопрос', of: 'из', back: 'Назад', next: 'Следующий вопрос', finish: 'Показать результат', choose: 'Выбери один вариант, чтобы продолжить.',
      resultEyebrow: 'Твой профиль RIASEC', resultTitle: 'Твой ведущий код', mixed: 'У тебя смешанный профиль: первый тип немного впереди, но следующие направления почти так же сильны.', clear: 'Первый тип выражен отчетливо, а два следующих показывают, в какой среде он раскроется лучше.',
      chartTitle: 'Все шесть направлений', topTitle: 'Три направления, которые тебе ближе', environments: 'Подходящая среда', strengths: 'Твои сильные стороны', careers: 'Профессии для изучения', watch: 'Что может утомлять', school: 'Что развивать уже сейчас', nextSteps: 'Следующие 3 шага',
      retake: 'Пройти заново', print: 'Сохранить результат', consult: 'Обсудить с консультантом', disclaimer: 'Тест помогает размышлять о профессии, но не является психологической диагностикой. При выборе учитывай интересы, способности, ценности и реальные условия обучения вместе.',
      whatsappIntro: 'Здравствуйте! Я прошёл(ла) профориентационный тест на сайте Consulteam.',
    },
    destinations: { eyebrow: 'География обучения', title: 'Сравни страны под свое направление.', intro: 'Стоимость, расходы и возможности стипендий — в одном месте. Для стран с презентациями доступен подробный просмотр.', explore: 'Открыть детали', tuition: 'Обучение', living: 'Проживание', grants: 'Стипендии', universities: 'Университеты', presentation: 'Открыть презентацию', ask: 'Обсудить эту страну', destination: 'Направление' },
    exams: { eyebrow: 'Подготовка', title: 'Выбираем экзамен под конкретную цель.', intro: 'Нужный тест зависит от университета, программы и языка обучения.', target: 'Целевой балл', cards: [
      { title: 'IELTS', text: 'Международный тест для англоязычных программ.', meta: 'Listening · Reading · Writing · Speaking', score: '6.0–7.0+' },
      { title: 'TOEFL iBT', text: 'Принимается в США и тысячах международных вузов.', meta: 'Reading · Listening · Speaking · Writing', score: '80–100+' },
      { title: 'SAT', text: 'Показывает академическую готовность к бакалавриату.', meta: 'Reading & Writing · Math', score: '1200–1400+' },
    ] },
    cta: { eyebrow: 'После теста', title: 'Превратим результат в план поступления.', text: 'Консультант сопоставит профиль, бюджет, уровень языка и страны, чтобы собрать реалистичный маршрут.', button: 'Написать в WhatsApp' },
    footer: { text: 'От выбора специальности до поступления — понятный маршрут без догадок.', address: 'Baytik Tower, 9 этаж · Бишкек', hours: 'Пн–Пт · 10:00–18:00', privacy: 'Конфиденциальность', rights: '© 2026 Consulteam' },
    privacyTitle: 'Политика конфиденциальности', privacyText: privacy.ru,
  },
  en: {
    language: 'English',
    nav: { quiz: 'Career test', approach: 'How it works', destinations: 'Countries', exams: 'Exams', contact: 'Contact' },
    hero: {
      eyebrow: 'Choose a field before choosing a country', title: 'Do not leave your future to chance.',
      lead: 'A 15-question test maps your interests using the RIASEC model and highlights fields where you are more likely to thrive.',
      primary: 'Take the test', secondary: 'Explore countries', note: '7 minutes · free · no sign-up', photoAlt: 'University-city architecture in Asia',
    },
    trust: ['15 situational questions', '6 career-interest types', '3 leading directions', 'A personal breakdown'],
    approach: {
      eyebrow: 'Not just a country — the right direction', title: 'We understand you first. Then we plan admission.',
      intro: 'The test is not a diagnosis and it will not lock you into one profession. It helps you name your interests, compare options, and choose a sensible next step.',
      steps: [
        { n: '01', title: 'Map your interests', text: 'Answers are scored across practical, analytical, creative, social, enterprising, and structured interests.' },
        { n: '02', title: 'Understand the mix', text: 'You see three leading types and the full strength of all six—not a single label.' },
        { n: '03', title: 'Build a study route', text: 'Compare professions, school subjects, and study environments with an adviser.' },
      ],
    },
    types: { eyebrow: 'The RIASEC map', title: 'Six types. Most people combine several.', intro: 'A useful profile usually blends two or three types, so the result shows the complete ranking.' },
    quiz: {
      eyebrow: 'Career orientation', title: 'Which direction fits you?', intro: 'There are no “correct” answers. Choose what sounds most like you today.',
      start: 'Start 15 questions', duration: 'Average time: 5–7 minutes', privacy: 'Answers are not sent to a server.',
      question: 'Question', of: 'of', back: 'Back', next: 'Next question', finish: 'Show my result', choose: 'Choose one option to continue.',
      resultEyebrow: 'Your RIASEC profile', resultTitle: 'Your leading code', mixed: 'You have a blended profile: the first type leads slightly, while the next directions are nearly as strong.', clear: 'Your first type stands out, while the next two show the environment where it may work best.',
      chartTitle: 'All six directions', topTitle: 'Your three closest directions', environments: 'Best-fit environment', strengths: 'Your strengths', careers: 'Professions to explore', watch: 'What may drain you', school: 'What to develop now', nextSteps: 'Your next 3 steps',
      retake: 'Retake', print: 'Save result', consult: 'Discuss with an adviser', disclaimer: 'This test supports career reflection; it is not a psychological diagnosis. Consider your interests, skills, values, and practical study options together.',
      whatsappIntro: 'Hello! I completed the career-orientation test on the Consulteam website.',
    },
    destinations: { eyebrow: 'Study geography', title: 'Compare countries for your direction.', intro: 'Review tuition, living costs, and scholarship options in one place. Detailed presentations are available for selected countries.', explore: 'View details', tuition: 'Tuition', living: 'Living costs', grants: 'Scholarships', universities: 'Universities', presentation: 'Open presentation', ask: 'Ask about this country', destination: 'Destination' },
    exams: { eyebrow: 'Preparation', title: 'Choose the exam for a specific goal.', intro: 'The right test depends on the university, program, and language of instruction.', target: 'Target score', cards: [
      { title: 'IELTS', text: 'An international test for English-taught programs.', meta: 'Listening · Reading · Writing · Speaking', score: '6.0–7.0+' },
      { title: 'TOEFL iBT', text: 'Accepted in the US and thousands of universities worldwide.', meta: 'Reading · Listening · Speaking · Writing', score: '80–100+' },
      { title: 'SAT', text: 'Demonstrates academic readiness for undergraduate study.', meta: 'Reading & Writing · Math', score: '1200–1400+' },
    ] },
    cta: { eyebrow: 'After the test', title: 'Turn your result into an admission plan.', text: 'An adviser can match your profile, budget, language level, and preferred countries to build a realistic route.', button: 'Message us on WhatsApp' },
    footer: { text: 'From choosing a field to university admission—a clear route without guesswork.', address: 'Baytik Tower, 9th floor · Bishkek', hours: 'Mon–Fri · 10:00–18:00', privacy: 'Privacy', rights: '© 2026 Consulteam' },
    privacyTitle: 'Privacy policy', privacyText: privacy.en,
  },
};

export const riasec = {
  ky: {
    R: { name: 'Практик', oneLine: 'Жасап көрүп үйрөнөт', summary: 'Сен идеяны кол менен кармай турган натыйжага айландырганды жактырасың. Техника, шайман, механизм жана реалдуу тапшырма энергия берет.', strengths: ['практикалык ой жүгүртүү', 'техникалык сезим', 'туруктуулук', 'натыйжага багыт'], environments: ['устакана же лаборатория', 'техника жана жабдуу', 'кыймылдуу, конкреттүү иш'], careers: ['инженер', 'электрик', 'механик', 'куруучу', 'айдоочу', 'IT-техник', 'логистика адиси'], watch: 'Өтө көп теория, узак жыйындар жана натыйжасы көрүнбөгөн тапшырмалар чарчатышы мүмкүн.', school: ['физика', 'технология', 'информатика', 'робототехника', 'техникалык англис тили'], steps: ['Кичине механизм же санарип түзмөк чогулт.', 'Инженер же техник менен бир күндүк тажрыйба сүйлөш.', 'Техникалык программадагы 3 адистикти салыштыр.'] },
    I: { name: 'Аналитик', oneLine: 'Себебин жана мыйзамченемин табат', summary: 'Сен “эмне үчүн?” деген суроодон баштайсың. Маалыматты талдоо, татаал маселени бөлүү жана далилдүү жооп табуу сага жакын.', strengths: ['логика', 'изилдөө', 'терең көңүл буруу', 'далил менен иштөө'], environments: ['лаборатория же изилдөө тобу', 'тынч интеллектуалдык иш', 'маалымат жана татаал суроолор'], careers: ['программист', 'дарыгер', 'окумуштуу', 'аналитик', 'инженер', 'data analyst', 'фармацевт'], watch: 'Так жообу жок саясий сүйлөшүүлөр же үстүртөн чечимдер кыжырдантышы мүмкүн.', school: ['математика', 'биология', 'физика', 'программалоо', 'академиялык англис тили'], steps: ['Бир темага мини-изилдөө жүргүз.', 'Олимпиада же аналитикалык клубду сына.', 'Программадагы лабораториялык жана изилдөө үлүшүн текшер.'] },
    A: { name: 'Чыгармачыл', oneLine: 'Жаңы образ жана идея жаратат', summary: 'Сен даяр калыпты кайталоодон көрө жаңыча чечим табууну каалайсың. Образ, тил, мейкиндик жана эмоция аркылуу ой билдирүү күчтүү жагың.', strengths: ['элестетүү', 'оригиналдуулук', 'эстетикалык сезим', 'идеяны жеткирүү'], environments: ['студия же медиа топ', 'эркин эксперимент', 'түрдүү адамдар жана идеялар'], careers: ['дизайнер', 'архитектор', 'актер', 'журналист', 'контент жаратуучу', 'режиссер', 'UX/UI дизайнер'], watch: 'Өтө катуу эрежелер, бир өңчөй кайталанма иш жана чыгармачылык эркиндигинин жоктугу чарчатат.', school: ['адабият', 'дизайн', 'сүрөт', 'медиа сабаттуулук', 'тилдер'], steps: ['5 жумуштан турган чакан портфолио жаса.', 'Чыныгы кардар же мектеп үчүн чыгармачыл тапшырма ал.', 'Портфолио талап кылган программаларды салыштыр.'] },
    S: { name: 'Социалдык', oneLine: 'Адамды угуп, өстүрөт', summary: 'Сен адамдар менен бат тил табышып, түшүндүрүү, окутуу жана колдоо аркылуу натыйжа чыгарасың. Сага иштин адамга тийгизген таасири маанилүү.', strengths: ['эмпатия', 'баарлашуу', 'окутуу', 'ишеним түзүү'], environments: ['мектеп же тренинг борбору', 'клиника же коомдук уюм', 'команда жана жандуу баарлашуу'], careers: ['мугалим', 'психолог', 'дарыгер', 'социалдык кызматкер', 'тренер', 'HR адиси', 'логопед'], watch: 'Узак убакыт жалгыз иштөө же адамдык мааниси көрүнбөгөн тапшырмалар мотивацияны азайтышы мүмкүн.', school: ['биология', 'тилдер', 'психология негиздери', 'тарых', 'коом таануу'], steps: ['Волонтердук же насаатчылык ишти сына.', 'Бир теманы кичүү окуучуга түшүндүр.', 'Практикасы көп программаларды изде.'] },
    E: { name: 'Ишкер', oneLine: 'Максат коюп, адамдарды кыймылга келтирет', summary: 'Сен демилге көтөрүп, чечим кабыл алып жана башкаларды максатка бириктиргенди жактырасың. Өсүү, таасир жана натыйжа сага күч берет.', strengths: ['лидерлик', 'ишендирүү', 'чечим кабыл алуу', 'мүмкүнчүлүктү көрүү'], environments: ['бизнес жана стартап', 'сатуу же долбоор башкаруу', 'атаандаштык жана тез темп'], careers: ['менеджер', 'ишкер', 'администратор', 'маркетолог', 'сатуу адиси', 'саясат таануучу', 'продюсер'], watch: 'Өтө жай процесс, чечимге таасир эте албоо жана майда деталга узак отуруу тажатышы мүмкүн.', school: ['экономика', 'математика', 'дебат', 'маркетинг', 'презентация көндүмү'], steps: ['Чакан долбоордун жетекчилигин ал.', 'Идеяга жөнөкөй бюджет жана сатуу планын түз.', 'Бизнес, экономика жана менеджмент программаларын салыштыр.'] },
    C: { name: 'Тартипчил', oneLine: 'Системаны так жана ишенимдүү кылат', summary: 'Сен тактыкты, тартипти жана түшүнүктүү процессти баалайсың. Документ, сан, график жана маалымат менен иштегенде күчтүү болосуң.', strengths: ['тактык', 'уюштуруучулук', 'жоопкерчилик', 'маалымат менен иштөө'], environments: ['банк же кеңсе системасы', 'так регламент жана график', 'маалымат, документ жана сан'], careers: ['бухгалтер', 'экономист', 'катчы', 'банкир', 'архивист', 'аудитор', 'бизнес-аналитик'], watch: 'Тапшырма улам өзгөрүп, эрежелер так болбосо же башаламандык көп болсо стресс жаралышы мүмкүн.', school: ['математика', 'информатика', 'экономика', 'статистика', 'Excel жана маалымат системалары'], steps: ['Жеке бюджет же окуу планын таблицада түз.', 'Маалымат менен иштеген адистин күнүн изилде.', 'Сертификаты жана практикалык модулу бар программаларды кара.'] },
  },
  ru: {
    R: { name: 'Практик', oneLine: 'Учится через действие', summary: 'Тебе нравится превращать идеи в видимый результат. Техника, инструменты, механизмы и реальные задачи дают энергию.', strengths: ['практическое мышление', 'техническое чутье', 'выносливость', 'ориентация на результат'], environments: ['мастерская или лаборатория', 'оборудование и техника', 'подвижная конкретная работа'], careers: ['инженер', 'электрик', 'механик', 'строитель', 'водитель', 'IT-техник', 'специалист по логистике'], watch: 'Может утомлять избыток теории, долгие совещания и задачи без видимого результата.', school: ['физика', 'технология', 'информатика', 'робототехника', 'технический английский'], steps: ['Собери небольшой механизм или цифровое устройство.', 'Договорись о коротком знакомстве с работой инженера или техника.', 'Сравни три специальности с практическими модулями.'] },
    I: { name: 'Аналитик', oneLine: 'Ищет причины и закономерности', summary: 'Ты начинаешь с вопроса «почему?». Тебе близки анализ данных, разбор сложных задач и поиск доказательного ответа.', strengths: ['логика', 'исследование', 'глубокая концентрация', 'работа с доказательствами'], environments: ['лаборатория или исследовательская команда', 'спокойная интеллектуальная работа', 'данные и сложные вопросы'], careers: ['программист', 'врач', 'ученый', 'аналитик', 'инженер', 'data analyst', 'фармацевт'], watch: 'Могут утомлять поверхностные решения, постоянные переговоры и отсутствие времени на глубокую работу.', school: ['математика', 'биология', 'физика', 'программирование', 'академический английский'], steps: ['Проведи мини-исследование по интересной теме.', 'Попробуй олимпиаду или аналитический клуб.', 'Проверь долю лабораторной и исследовательской работы в программах.'] },
    A: { name: 'Творческий', oneLine: 'Создает новые образы и идеи', summary: 'Тебе интереснее придумать новое, чем повторить готовый шаблон. Сильная сторона — выражать идеи через образ, язык, пространство и эмоцию.', strengths: ['воображение', 'оригинальность', 'эстетическое чувство', 'выразительность'], environments: ['студия или медиакоманда', 'свободный эксперимент', 'разные люди и идеи'], careers: ['дизайнер', 'архитектор', 'актер', 'журналист', 'контент-креатор', 'режиссер', 'UX/UI-дизайнер'], watch: 'Может утомлять жесткий регламент, монотонное повторение и отсутствие творческой свободы.', school: ['литература', 'дизайн', 'изобразительное искусство', 'медиаграмотность', 'языки'], steps: ['Собери мини-портфолио из пяти работ.', 'Возьми творческую задачу для школы или реального проекта.', 'Сравни программы, где портфолио является частью поступления.'] },
    S: { name: 'Социальный', oneLine: 'Слушает, объясняет и развивает людей', summary: 'Ты легко находишь контакт и получаешь результат через обучение, поддержку и общение. Тебе важно видеть влияние работы на человека.', strengths: ['эмпатия', 'коммуникация', 'обучение', 'создание доверия'], environments: ['школа или тренинговый центр', 'клиника или общественная организация', 'команда и живое общение'], careers: ['учитель', 'психолог', 'врач', 'социальный работник', 'тренер', 'HR-специалист', 'логопед'], watch: 'Может снижаться мотивация при долгой работе в одиночку или в задачах без понятной пользы для людей.', school: ['биология', 'языки', 'основы психологии', 'история', 'обществознание'], steps: ['Попробуй волонтерство или наставничество.', 'Объясни сложную тему младшему ученику.', 'Ищи программы с ранней практикой и работой с людьми.'] },
    E: { name: 'Предприниматель', oneLine: 'Ставит цель и ведет к ней людей', summary: 'Тебе нравится проявлять инициативу, принимать решения и объединять людей вокруг цели. Тебя заряжают рост, влияние и заметный результат.', strengths: ['лидерство', 'убеждение', 'принятие решений', 'видение возможностей'], environments: ['бизнес или стартап', 'продажи и управление проектами', 'быстрый темп и конкуренция'], careers: ['менеджер', 'предприниматель', 'администратор', 'маркетолог', 'специалист по продажам', 'политолог', 'продюсер'], watch: 'Могут раздражать медленные процессы, отсутствие влияния на решения и долгая работа с мелкими деталями.', school: ['экономика', 'математика', 'дебаты', 'маркетинг', 'навыки презентации'], steps: ['Возьми лидерство в небольшом проекте.', 'Составь простой бюджет и план продаж для идеи.', 'Сравни программы по бизнесу, экономике и менеджменту.'] },
    C: { name: 'Системный', oneLine: 'Делает порядок точным и надежным', summary: 'Ты ценишь точность, порядок и понятный процесс. Особенно силен в работе с документами, числами, графиками и структурированной информацией.', strengths: ['точность', 'организованность', 'ответственность', 'работа с данными'], environments: ['банк или офисная система', 'четкий регламент и график', 'данные, документы и числа'], careers: ['бухгалтер', 'экономист', 'секретарь', 'банкир', 'архивист', 'аудитор', 'бизнес-аналитик'], watch: 'Стресс может вызывать постоянная смена условий, неясные правила и хаотичный процесс.', school: ['математика', 'информатика', 'экономика', 'статистика', 'Excel и информационные системы'], steps: ['Собери личный бюджет или учебный план в таблице.', 'Изучи рабочий день специалиста по данным или финансам.', 'Ищи программы с сертификатами и практическими модулями.'] },
  },
  en: {
    R: { name: 'Practical', oneLine: 'Learns by doing', summary: 'You enjoy turning ideas into visible results. Tools, technology, mechanisms, and real-world tasks give you energy.', strengths: ['practical thinking', 'technical intuition', 'persistence', 'results focus'], environments: ['workshop or laboratory', 'equipment and technology', 'active, concrete work'], careers: ['engineer', 'electrician', 'mechanic', 'builder', 'driver', 'IT technician', 'logistics specialist'], watch: 'Too much theory, long meetings, and work without a visible outcome may drain you.', school: ['physics', 'technology', 'computer science', 'robotics', 'technical English'], steps: ['Build a small mechanism or digital device.', 'Arrange a short job-shadow conversation with an engineer or technician.', 'Compare three programs with substantial practical modules.'] },
    I: { name: 'Analytical', oneLine: 'Finds causes and patterns', summary: 'You often begin with “why?”. You enjoy analyzing evidence, breaking down complex problems, and finding well-supported answers.', strengths: ['logic', 'research', 'deep focus', 'evidence-based thinking'], environments: ['laboratory or research team', 'quiet intellectual work', 'data and complex questions'], careers: ['programmer', 'doctor', 'scientist', 'analyst', 'engineer', 'data analyst', 'pharmacist'], watch: 'Shallow decisions, constant negotiation, or a lack of deep-work time may be frustrating.', school: ['mathematics', 'biology', 'physics', 'programming', 'academic English'], steps: ['Run a small research project on a topic you care about.', 'Try an academic competition or analytical club.', 'Check how much lab and research work each study program includes.'] },
    A: { name: 'Creative', oneLine: 'Creates original ideas and images', summary: 'You would rather invent than repeat a ready-made template. You express ideas through images, language, space, and emotion.', strengths: ['imagination', 'originality', 'aesthetic judgment', 'expressive communication'], environments: ['studio or media team', 'open experimentation', 'varied people and ideas'], careers: ['designer', 'architect', 'actor', 'journalist', 'content creator', 'director', 'UX/UI designer'], watch: 'Rigid rules, repetitive tasks, and little creative freedom can be tiring.', school: ['literature', 'design', 'visual arts', 'media literacy', 'languages'], steps: ['Build a small portfolio of five pieces.', 'Take on a real creative brief for your school or community.', 'Compare programs that use a portfolio in admission.'] },
    S: { name: 'Social', oneLine: 'Listens, explains, and helps people grow', summary: 'You connect easily and create results through teaching, support, and communication. The human impact of your work matters to you.', strengths: ['empathy', 'communication', 'teaching', 'building trust'], environments: ['school or training center', 'clinic or community organization', 'teamwork and live interaction'], careers: ['teacher', 'psychologist', 'doctor', 'social worker', 'trainer', 'HR specialist', 'speech therapist'], watch: 'Long stretches of solitary work or tasks with no visible human benefit may reduce motivation.', school: ['biology', 'languages', 'psychology basics', 'history', 'social studies'], steps: ['Try volunteering or peer mentoring.', 'Teach a difficult topic to a younger student.', 'Look for programs with early practical experience.'] },
    E: { name: 'Enterprising', oneLine: 'Sets goals and moves people forward', summary: 'You enjoy taking initiative, making decisions, and bringing people together around a goal. Growth, influence, and visible progress motivate you.', strengths: ['leadership', 'persuasion', 'decision-making', 'spotting opportunities'], environments: ['business or startup', 'sales and project leadership', 'fast pace and competition'], careers: ['manager', 'entrepreneur', 'administrator', 'marketer', 'sales specialist', 'political scientist', 'producer'], watch: 'Slow processes, little influence over decisions, and extended detail work may feel limiting.', school: ['economics', 'mathematics', 'debate', 'marketing', 'presentation skills'], steps: ['Lead a small project.', 'Create a simple budget and sales plan for an idea.', 'Compare business, economics, and management programs.'] },
    C: { name: 'Structured', oneLine: 'Makes systems accurate and reliable', summary: 'You value precision, order, and clear processes. You are strongest when working with documents, numbers, schedules, and structured information.', strengths: ['accuracy', 'organization', 'responsibility', 'data handling'], environments: ['bank or organized office', 'clear rules and schedules', 'data, records, and numbers'], careers: ['accountant', 'economist', 'secretary', 'banker', 'archivist', 'auditor', 'business analyst'], watch: 'Constantly shifting requirements, unclear rules, and chaotic processes can create stress.', school: ['mathematics', 'computer science', 'economics', 'statistics', 'Excel and information systems'], steps: ['Build a personal budget or study plan in a spreadsheet.', 'Research a day in the life of a finance or data professional.', 'Look for programs with certifications and practical modules.'] },
  },
};

export const countries = [
  { id: 'taiwan', image: '/taiwan.jpg', presentation: { folder: '/presentations/taiwan', slides: 28 }, names: ml('Тайвань', 'Тайвань', 'Taiwan'), tuition: '$1,500–3,500 / year', living: '$300–500 / month', grants: 'MOE Taiwan Scholarship · university grants up to 100%', universities: ['National Taiwan University', 'National Tsing Hua University', 'Ming Chuan University'] },
  { id: 'italy', image: '/italy.jpg', presentation: { folder: '/presentations/italy', slides: 22 }, names: ml('Италия', 'Италия', 'Italy'), tuition: '€156–3,000 / year', living: '€700–1,000 / month', grants: 'DSU · MAECI · regional support', universities: ['Politecnico di Milano', 'Sapienza University', 'University of Padua'] },
  { id: 'turkey', image: '/turkey.jpg', presentation: { folder: '/presentations/turkey', slides: 21 }, names: ml('Түркия', 'Турция', 'Türkiye'), tuition: '$300–1,500 / year', living: '$250–450 / month', grants: 'Türkiye Scholarships · university discounts', universities: ['Sakarya University', 'Istanbul Kent University', 'Fenerbahçe University'] },
  { id: 'malaysia', image: '/malaysia.jpg', presentation: { folder: '/presentations/malaysia', slides: 19 }, names: ml('Малайзия', 'Малайзия', 'Malaysia'), tuition: '$4,000–8,000 / year', living: '$300–450 / month', grants: 'Merit-based university discounts up to 50%', universities: ['INTI International University', "Taylor's University", 'Asia Pacific University'] },
  { id: 'china', image: '/china.jpg', presentation: { folder: '/presentations/china', slides: 22 }, names: ml('Кытай', 'Китай', 'China'), tuition: '$2,500–5,000 / year', living: '$300–600 / month', grants: 'CSC · provincial and university scholarships', universities: ['Tsinghua University', 'Peking University', 'Zhejiang University'] },
  { id: 'czech', image: '/czech.jpg', presentation: { folder: '/presentations/czech', slides: 15 }, names: ml('Чехия', 'Чехия', 'Czechia'), tuition: '€0 in Czech · from €3,000 in English', living: '€400–700 / month', grants: 'Public universities in Czech · selected stipends', universities: ['Charles University', 'Czech Technical University', 'Masaryk University'] },
];
