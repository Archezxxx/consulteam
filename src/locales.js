const privacyPolicyRU = `Мы ответственно относимся к вашей приватности. 

1. Сбор данных
Мы собираем только ту информацию, которую вы добровольно предоставляете нам через WhatsApp: имя, номер телефона и предпочтения по учебе.

2. Использование информации
Ваши данные используются исключительно для предоставления вам качественных консультационных услуг, подбора университетов и помощи в оформлении документов.

3. Защита информации
Мы применяем различные меры безопасности для обеспечения сохранности ваших персональных данных. Данные не передаются третьим лицам без вашего явного согласия.

4. Согласие
Используя наш сайт и связываясь с нами через WhatsApp, вы соглашаетесь с этой политикой конфиденциальности.`;

const privacyPolicyKY = `Биз сиздин купуялыгыңызга жоопкерчиликтүү мамиле кылабыз.

1. Маалыматтарды чогултуу
Биз сиз WhatsApp аркылуу өз ыктыярыңыз менен берген маалыматты гана чогултабыз: аты-жөнүңүз, телефон номериңиз жана окуу боюнча каалоолоруңуз.

2. Маалыматты колдонуу
Сиздин маалыматтарыңыз сизге сапаттуу консалтингдик кызматтарды көрсөтүү, университеттерди тандоо жана документтерди даярдоодо жардам берүү үчүн гана колдонулат.

3. Маалыматты коргоо
Сиздин жеке маалыматтарыңыздын коопсуздугун камсыз кылуу үчүн биз ар кандай коопсуздук чараларын көрөбүз. Маалымат сиздин ачык макулдугуңузсуз үчүнчү жактарга берилбейт.

4. Макулдук
Биздин сайтты колдонуу жана WhatsApp аркылуу биз менен байланышуу аркылуу, сиз ушул купуялык саясатына макулдук бересиз.`;

const privacyPolicyEN = `We take your privacy very seriously.

1. Data Collection
We only collect information you voluntarily provide to us via WhatsApp, which may include your name, phone number, and educational preferences.

2. Use of Information
Your data is used solely to provide you with high-quality consulting services, select universities, and assist you with documentation.

3. Information Protection
We employ various security measures to ensure the safety of your personal data. Your data is never shared with third parties without your explicit consent.

4. Consent
By using our site and contacting us via WhatsApp, you consent to this privacy policy.`;

// Intelligent Country Stats Data
const countryStats = {
  taiwan: {
    image: '/taiwan.jpg',
    tuition: '$1,500 - $3,500 / год',
    living: '$300 - $500 / месяц',
    scholarships: 'MOE Taiwan Scholarship, University Grants (Скидки до 100%)',
    topUnis: ['National Taiwan University', 'National Tsing Hua University', 'Ming Chuan University'],
    presentation: { folder: '/presentations/taiwan', slides: 28 }
  },
  italy: {
    image: '/italy.jpg',
    presentation: { folder: '/presentations/italy', slides: 22 },
    tuition: '€156 - €3,000 / год',
    living: '€700 - €1,000 / месяц',
    scholarships: 'DSU, MAECI (Бесплатное обучение + Стипендия до €7000 в год)',
    topUnis: ['Politecnico di Milano', 'Sapienza University', 'University of Padua']
  },
  turkey: {
    image: '/turkey.jpg',
    presentation: { folder: '/presentations/turkey', slides: 21 },
    tuition: '$300 - $1,500 / год (Государственные)',
    living: '$250 - $450 / месяц',
    scholarships: 'Turkiye Burslari (Полное покрытие + Стипендия)',
    topUnis: ['Sakarya University', 'Istanbul Kent University', 'Fenerbahce University']
  },
  malaysia: {
    image: '/malaysia.jpg',
    presentation: { folder: '/presentations/malaysia', slides: 19 },
    tuition: '$4,600 - $4,900 / год (INTI, ~$9,200-9,800 за 2 года)',
    living: '$200 - $300 / месяц',
    scholarships: 'American Degree Transfer Program, скидки от вузов. Виза $800',
    topUnis: ['INTI International University', 'Taylor\'s University', 'APU']
  },
  china: {
    image: '/china.jpg',
    presentation: { folder: '/presentations/china', slides: 22 },
    tuition: '$2,500 - $5,000 / год',
    living: '$300 - $600 / месяц',
    scholarships: 'CSC Government Scholarship, Провинциальные гранты (обучение 2-3x дешевле Европы/США)',
    topUnis: ['Tsinghua University', 'Peking University', 'Shandong University of Technology']
  },
  korea: {
    image: '/korea.jpg',
    tuition: '$3,000 - $7,000 / год',
    living: '$600 - $900 / месяц',
    scholarships: 'GKS (Global Korea Scholarship)',
    topUnis: ['Seoul National University', 'Yonsei University', 'Korea University']
  },
  // === Новые страны. Данные ориентировочные — заменить на реальные из презентаций ===
  poland: {
    image: '/poland.jpg',
    tuition: '€2,000 - €4,000 / год',
    living: '€400 - €600 / месяц',
    scholarships: 'NAWA, стипендии вузов (уточняется)',
    topUnis: ['University of Warsaw', 'Jagiellonian University', 'Warsaw University of Technology']
  },
  hungary: {
    image: '/hungary.jpg',
    tuition: '€3,000 - €5,000 / год',
    living: '€400 - €600 / месяц',
    scholarships: 'Stipendium Hungaricum (уточняется)',
    topUnis: ['Eötvös Loránd University', 'University of Debrecen', 'Budapest Univ. of Technology']
  },
  spain: {
    image: '/spain.jpg',
    tuition: '€1,500 - €4,000 / год',
    living: '€600 - €900 / месяц',
    scholarships: 'Стипендии вузов и региональные гранты (уточняется)',
    topUnis: ['University of Barcelona', 'Complutense University of Madrid', 'Autonomous Univ. of Madrid']
  },
  czech: {
    image: '/czech.jpg',
    presentation: { folder: '/presentations/czech', slides: 15 },
    tuition: 'Бесплатно на чешском / €2,000-5,000 на английском',
    living: '€400 - €600 / месяц',
    scholarships: 'Гранты вузов (уточняется)',
    topUnis: ['Charles University', 'Czech Technical University', 'Masaryk University']
  },
  usa: {
    image: '/usa.png',
    tuition: '$15,000 - $40,000 / год',
    living: '$800 - $1,500 / месяц',
    scholarships: 'Merit & need-based стипендии вузов (уточняется)',
    topUnis: ['Harvard University', 'MIT', 'Stanford University']
  },
  austria: {
    image: '/austria.jpg',
    tuition: '€1,500 / год (гос.) / выше в частных',
    living: '€700 - €1,000 / месяц',
    scholarships: 'OeAD, стипендии вузов (уточняется)',
    topUnis: ['University of Vienna', 'TU Wien', 'University of Graz']
  },
  germany: {
    image: '/germany.png',
    tuition: 'Бесплатно (гос.) + сбор €150-350 / семестр',
    living: '€800 - €1,100 / месяц',
    scholarships: 'DAAD, стипендии фондов (уточняется)',
    topUnis: ['TU München', 'LMU Munich', 'Heidelberg University']
  }
};

const mapCountries = (keys, langMap) => keys.map(k => ({
  id: k,
  name: langMap[k],
  ...countryStats[k]
}));

export const locales = {
  ru: {
    nav: {
      about: 'Философия',
      destinations: 'Направления',
      exams: 'Подготовка',
      cases: 'Наши Люди',
    },
    hero: {
      badge: 'Премиальный консалтинг. Мы открываем мир.',
      title: 'Отправим вас',
      country: 'за рубеж',
      subtitle: 'Элитное образовательное агентство. Сопровождаем на всех этапах поступления в лучшие университеты мира без лишнего стресса.',
      cta: 'Начать Путь',
    },
    about: {
      title: 'ЭКСПЕРТИЗА, КОТОРОЙ',
      titleHighlight: 'ДОВЕРЯЮТ.',
      desc: 'Consulteam — это больше, чем агентство. Мы — стратеги вашего будущего. Наша команда выводит студентов в ведущие университеты Европы и Азии правильным, безопасным и реальным путем.',
      features: [
        'Индивидуальный план поступления',
        'Полная документальная и визовая поддержка',
        'Сопровождение от аэропорта до общежития',
        'Максимизация шансов на стипендию'
      ],
      principlesTitle: 'Наш Подход:',
      principles: [
        'Индивидуальный фокус на каждом клиенте',
        'Глубокая аналитика и стратегия поступления',
        'Полное сопровождение на всех этапах от А до Я'
      ]
    },
    destinations: {
      title: 'Открой',
      titleHighlight: 'Границы',
      subtitle: 'Топовые направления, где обучаются наши невероятные студенты.',
      modal: {
        tuitionTitle: 'Стоимость Обучения',
        livingTitle: 'Расходы на Жизнь',
        scholarsTitle: 'Гранты и Стипендии',
        unisTitle: 'Лучшие Университеты:',
        contactCta: 'Спланировать поступление сюда',
        presentationCta: 'Посмотреть презентацию',
      },
      countries: mapCountries(['taiwan', 'china', 'turkey', 'poland', 'malaysia', 'italy', 'austria', 'hungary', 'spain', 'czech', 'usa', 'germany', 'korea'], {
        taiwan: 'Тайвань', china: 'Китай', turkey: 'Турция', poland: 'Польша', malaysia: 'Малайзия', italy: 'Италия', austria: 'Австрия', hungary: 'Венгрия', spain: 'Испания', czech: 'Чехия', usa: 'США', germany: 'Германия', korea: 'Южная Корея'
      })
    },
    legal: {
      privacyTitle: 'Политика Конфиденциальности',
      privacyText: privacyPolicyRU,
      termsTitle: 'Условия Использования',
    },
    whatsAppText: {
      contactUs: 'Связаться с Нами'
    },
    exams: {
      title: 'Вступительные',
      titleHighlight: 'Экзамены',
      subtitle: 'Стандарты, открывающие двери в любую страну мира.',
      cards: [
        { title: 'IELTS', desc: 'Тест на знание английского для Европы, Великобритании и др.', score: 'Нужен 6.5+', img: '/ielts.png', format: 'Listening, Reading, Writing, Speaking' },
        { title: 'TOEFL', desc: 'Стандартный английский тест для США и мировых вузов.', score: 'Нужен 80+', img: '/toefl.png', format: 'iBT формат (Компьютерное тестирование)' },
        { title: 'SAT', desc: 'Академический тест для поступления в топ-университеты США и Азии.', score: 'Нужен 1350+', img: '/sat.png', format: 'Reading & Writing, Math' },
        { title: 'HSK', desc: 'Экзамен на знание китайского языка для вузов Китая и Тайваня.', score: 'Уровень HSK 4–5', img: '/hsk.png', format: 'Listening, Reading, Writing' },
        { title: 'TÖMER', desc: 'Экзамен по турецкому языку для обучения в университетах Турции.', score: 'Уровень B1–B2', img: '/tomer.png', format: 'Reading, Writing, Speaking, Listening' },
        { title: 'CSCA', desc: 'Вступительный экзамен на бакалавриат и гранты Правительства Китая.', score: '~450-700 юаней', img: '/csca.png', format: 'Математика, Физика, Химия, Китайский' }
      ]
    },
    cases: {
      title: 'История',
      titleHighlight: 'Успеха',
      subtitle: 'Люди, которые уже покоряют мир и живут свою мечту.',
      cards: [
        { name: 'Айканыш С.', uni: 'Columbia University', location: 'США', major: 'Компьютерные Науки' },
        { name: 'Азамат К.', uni: 'Politecnico di Milano', location: 'Италия', major: 'Архитектура' },
        { name: 'Бермет А.', uni: 'NTU', location: 'Тайвань', major: 'Бизнес' },
      ]
    },
    footer: {
      desc: 'Выводим образование на новый уровень. С нами поступление перестает быть проблемой и становится приятным путешествием.',
      location: 'БЦ "Baytik Tower", 9 этаж',
      workingHours: '10:00 - 18:00',
      privacy: 'Конфиденциальность',
      contact: 'WhatsApp',
      rights: '© 2026 Consulteam. Все права защищены.'
    }
  },
  ky: {
    nav: {
      about: 'Философия',
      destinations: 'Өлкөлөр',
      exams: 'Талаптар',
      cases: 'Студенттер',
    },
    hero: {
      badge: 'Премиум консалтинг. Дүйнөнү биз менен ачыңыз.',
      title: 'Сизди чет өлкөгө',
      country: 'окууга жөнөтөбүз',
      subtitle: 'Элиталык билим берүү агенттиги. Дүйнөнүн мыкты университеттерине тапшыруунун бардык баскычтарында толук коштоо.',
      cta: 'Баштоо',
    },
    about: {
      title: 'БИЗДИН',
      titleHighlight: 'ЭКСПЕРТИЗА',
      desc: 'Consulteam — агенттиктен да көбүрөөк. Биз сиздин келечегиңиздин стратегдерибиз. Студенттерди Европа жана Азиянын алдыңкы ЖОЖдоруна ишенимдүү жана түз жол менен жөнөтөбүз.',
      features: [
        'Жекече тапшыруу планы',
        'Толук документ жана виза колдоосу',
        'Аэропорттон жатаканага чейин коштоо',
        'Стипендия алуу мүмкүнчүлүгүн жогорулатуу'
      ],
      principlesTitle: 'Биздин принциптер:',
      principles: [
        'Ар бир кардар менен жекече иштөө',
        'Терең аналитика жана тапшыруу стратегиясы',
        'А-дан Я-га чейинки толук коштоо (полное сопровождение)'
      ]
    },
    destinations: {
      title: 'Чек араны',
      titleHighlight: 'Ач',
      subtitle: 'Биздин мыкты студенттерибиз билим алып жаткан топовый өлкөлөр.',
      modal: {
        tuitionTitle: 'Окуу акысы',
        livingTitle: 'Жашоо чыгымдары',
        scholarsTitle: 'Окуу гранттары',
        unisTitle: 'Мыкты Университеттер:',
        contactCta: 'Тапшырууну баштоо',
        presentationCta: 'Презентацияны көрүү',
      },
      countries: mapCountries(['taiwan', 'china', 'turkey', 'poland', 'malaysia', 'italy', 'austria', 'hungary', 'spain', 'czech', 'usa', 'germany', 'korea'], {
        taiwan: 'Тайвань', china: 'Кытай', turkey: 'Түркия', poland: 'Польша', malaysia: 'Малайзия', italy: 'Италия', austria: 'Австрия', hungary: 'Венгрия', spain: 'Испания', czech: 'Чехия', usa: 'АКШ', germany: 'Германия', korea: 'Түштүк Корея'
      })
    },
    legal: {
      privacyTitle: 'Купуялык саясаты',
      privacyText: privacyPolicyKY,
      termsTitle: 'Колдонуу шарттары',
    },
    whatsAppText: {
      contactUs: 'Байланышуу'
    },
    exams: {
      title: 'Сынак',
      titleHighlight: 'Талаптары',
      subtitle: 'Дүйнөнүн каалаган өлкөсүнө эшик ачкан стандарттар.',
      cards: [
        { title: 'IELTS', desc: 'Англис тилдүү өлкөлөр үчүн эл аралык тил сынагы.', score: '6.0+ талап', img: '/ielts.png', format: 'Listening, Reading, Writing, Speaking' },
        { title: 'TOEFL', desc: 'АКШ университеттери үчүн башкы англис тести.', score: '80+ талап', img: '/toefl.png', format: 'Reading, Listening, Speaking, Writing' },
        { title: 'SAT', desc: 'АКШ жана Азия университеттери үчүн академиялык тест.', score: '1350+ талап', img: '/sat.png', format: 'Reading & Writing, Math' },
        { title: 'HSK', desc: 'Кытай тилин билүү деңгээлин аныктаган сынак.', score: 'HSK 4+ талап', img: '/hsk.png', format: 'Listening, Reading, Writing' },
        { title: 'TÖMER', desc: 'Түрк тилин билүү боюнча расмий сертификат.', score: 'B2+ талап', img: '/tomer.png', format: 'Reading, Writing, Speaking, Listening' },
        { title: 'CSCA', desc: 'Кытайдын бакалавриатына жана өкмөттүк гранттарына кирүү сынагы.', score: '~450-700 юань', img: '/csca.png', format: 'Математика, Физика, Химия, Кытай тили' }
      ]
    },
    cases: {
      title: 'Ийгилик',
      titleHighlight: 'Баяны',
      subtitle: 'Дүйнөнү багындырып, кыялына жеткен жаштар.',
      cards: [
        { name: 'Айканыш С.', uni: 'Columbia University', location: 'АКШ', major: 'Com. Science' },
        { name: 'Азамат К.', uni: 'Politecnico di Milano', location: 'Италия', major: 'Архитектура' },
        { name: 'Бермет А.', uni: 'NTU', location: 'Тайвань', major: 'Бизнес' },
      ]
    },
    footer: {
      desc: 'Билим берүүнү жаңы деңгээлге чыгарабыз. Биз менен тапшыруу оңой жана жагымдуу процесс болот.',
      location: 'БЦ "Baytik Tower", 9 кабат',
      workingHours: '10:00 - 18:00',
      privacy: 'Купуялык',
      contact: 'WhatsApp',
      rights: '© 2026 Consulteam. Бардык укуктар корголгон.'
    }
  },
  en: {
    nav: {
      about: 'Philosophy',
      destinations: 'Destinations',
      exams: 'Prep',
      cases: 'People',
    },
    hero: {
      badge: 'Premium Consulting. We open the world.',
      title: 'We will send you',
      country: 'to study abroad',
      subtitle: 'Elite educational agency. We smoothly guide you through every admission stage to the world’s top universities.',
      cta: 'Begin Journey',
    },
    about: {
      title: 'EXPERTISE YOU',
      titleHighlight: 'CAN TRUST.',
      desc: 'Consulteam is more than an agency. We are the architects of your future. We safely guide students to leading universities in Europe and Asia.',
      features: [
        'Personalized admission roadmap',
        'Full document and visa preparation',
        'Airport pickup and accommodation escort',
        'Maximized scholarship chances'
      ],
      principlesTitle: 'Our Approach:',
      principles: [
        'Individual focus on every single student',
        'Deep admission analytics and strategy',
        'Complete end-to-end escort & support'
      ]
    },
    destinations: {
      title: 'Explore',
      titleHighlight: 'Boundaries',
      subtitle: 'Premium global destinations where our amazing students thrive.',
      modal: {
        tuitionTitle: 'Avg. Tuition',
        livingTitle: 'Living Costs',
        scholarsTitle: 'Scholarships',
        unisTitle: 'Featured Top Universities:',
        contactCta: 'Plan my admission here',
        presentationCta: 'View Presentation',
      },
      countries: mapCountries(['taiwan', 'china', 'turkey', 'poland', 'malaysia', 'italy', 'austria', 'hungary', 'spain', 'czech', 'usa', 'germany', 'korea'], {
        taiwan: 'Taiwan', china: 'China', turkey: 'Turkey', poland: 'Poland', malaysia: 'Malaysia', italy: 'Italy', austria: 'Austria', hungary: 'Hungary', spain: 'Spain', czech: 'Czechia', usa: 'USA', germany: 'Germany', korea: 'South Korea'
      })
    },
    legal: {
      privacyTitle: 'Privacy Policy',
      privacyText: privacyPolicyEN,
      termsTitle: 'Terms of Service',
    },
    whatsAppText: {
      contactUs: 'Contact Us'
    },
    exams: {
      title: 'Entrance',
      titleHighlight: 'Standards',
      subtitle: 'The universal metrics that open global doors.',
      cards: [
        { title: 'IELTS', desc: 'International English test for study abroad.', score: 'Requires 6.0+', img: '/ielts.png', format: 'Listening, Reading, Writing, Speaking' },
        { title: 'TOEFL', desc: 'Standard English test for US & global universities.', score: 'Requires 80+', img: '/toefl.png', format: 'Online iBT Format' },
        { title: 'SAT', desc: 'Standardized academic assessment for US & Asian universities.', score: 'Requires 1350+', img: '/sat.png', format: 'Reading & Writing, Math' },
        { title: 'HSK', desc: 'Chinese language proficiency test for China & Taiwan.', score: 'Requires HSK 4+', img: '/hsk.png', format: 'Listening, Reading, Writing' },
        { title: 'TÖMER', desc: 'Official Turkish language certificate for study in Turkey.', score: 'Requires B1–B2', img: '/tomer.png', format: 'Reading, Writing, Speaking, Listening' },
        { title: 'CSCA', desc: 'China Scholastic Competency Assessment for undergraduate admissions & scholarships.', score: '~450-700 RMB', img: '/csca.png', format: 'Math, Physics, Chemistry, Chinese' }
      ]
    },
    cases: {
      title: 'Success',
      titleHighlight: 'Stories',
      subtitle: 'People who are out there living their dream right now.',
      cards: [
        { name: 'Aikanysh S.', uni: 'Columbia Uni.', location: 'USA', major: 'CS' },
        { name: 'Azamat K.', uni: 'Politecnico di Milano', location: 'Italy', major: 'Architecture' },
        { name: 'Bermet A.', uni: 'NTU', location: 'Taiwan', major: 'Business' },
      ]
    },
    footer: {
      desc: 'Elevating education. With us, admission is no longer a problem, but an exciting journey towards the future.',
      location: 'Bishkek, Baytik Tower BC, 9th Floor',
      workingHours: '10:00 - 18:00',
      privacy: 'Privacy',
      contact: 'WhatsApp',
      rights: '© 2026 Consulteam. All rights reserved.'
    }
  }
};
