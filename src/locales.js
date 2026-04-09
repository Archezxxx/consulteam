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
    topUnis: ['National Taiwan University', 'National Tsing Hua University', 'Ming Chuan University']
  },
  italy: {
    image: '/italy.jpg',
    tuition: '€156 - €3,000 / год',
    living: '€700 - €1,000 / месяц',
    scholarships: 'DSU, MAECI (Бесплатное обучение + Стипендия до €7000 в год)',
    topUnis: ['Politecnico di Milano', 'Sapienza University', 'University of Padua']
  },
  turkey: {
    image: '/turkey.jpg',
    tuition: '$300 - $1,500 / год (Государственные)',
    living: '$250 - $450 / месяц',
    scholarships: 'Turkiye Burslari (Полное покрытие + Стипендия)',
    topUnis: ['Sakarya University', 'Istanbul Kent University', 'Fenerbahce University']
  },
  malaysia: {
    image: '/malaysia.jpg',
    tuition: '$4,000 - $8,000 / год',
    living: '$300 - $450 / месяц',
    scholarships: 'Merit-based скидки от вузов (До 50%)',
    topUnis: ['INTI International University', 'Taylor\'s University', 'APU']
  },
  china: {
    image: '/china.jpg',
    tuition: '$2,500 - $5,000 / год',
    living: '$300 - $600 / месяц',
    scholarships: 'CSC Government Scholarship, Провинциальные гранты',
    topUnis: ['Tsinghua University', 'Peking University', 'Zhejiang University']
  },
  korea: {
    image: '/korea.jpg',
    tuition: '$3,000 - $7,000 / год',
    living: '$600 - $900 / месяц',
    scholarships: 'GKS (Global Korea Scholarship)',
    topUnis: ['Seoul National University', 'Yonsei University', 'Korea University']
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
      },
      countries: mapCountries(['taiwan', 'italy', 'turkey', 'malaysia', 'china', 'korea'], {
        taiwan: 'Тайвань', italy: 'Италия', turkey: 'Турция', malaysia: 'Малайзия', china: 'Китай', korea: 'Южная Корея'
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
        { title: 'IELTS', desc: 'Тест на знание языка для развитых стран.', score: 'Нужен 7.0+', img: '/ielts.jpg', format: 'Аудирование, Чтение, Письмо, Говорение' },
        { title: 'TOEFL', desc: 'Стандартный языковой тест для США.', score: 'Нужен 100+', img: '/toefl.png', format: 'Формат тестирования iBT на компьютере' },
        { title: 'SAT', desc: 'Экзамен по логике для колледжей США.', score: 'Нужен 1400+', img: '/sat.jpg', format: 'Математика и аналитическое чтение' }
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
      },
      countries: mapCountries(['taiwan', 'italy', 'turkey', 'malaysia', 'china', 'korea'], {
        taiwan: 'Тайвань', italy: 'Италия', turkey: 'Түркия', malaysia: 'Малайзия', china: 'Кытай', korea: 'Түштүк Корея'
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
        { title: 'IELTS', desc: 'Европа үчүн англис тили сынагы.', score: '7.0+ талап', img: '/ielts.jpg', format: 'Listening, Reading, Writing, Speaking' },
        { title: 'TOEFL', desc: 'АКШ университеттери үчүн башкы тест.', score: '100+ талап', img: '/toefl.png', format: 'Reading, Listening, Speaking, Writing' },
        { title: 'SAT', desc: 'АКШ коллеждери үчүн зарыл.', score: '1400+ талап', img: '/sat.jpg', format: 'Reading/Writing & Math' }
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
      },
      countries: mapCountries(['taiwan', 'italy', 'turkey', 'malaysia', 'china', 'korea'], {
        taiwan: 'Taiwan', italy: 'Italy', turkey: 'Turkey', malaysia: 'Malaysia', china: 'China', korea: 'South Korea'
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
        { title: 'IELTS', desc: 'English proficiency for UK and EU.', score: 'Requires 7.0+', img: '/ielts.jpg', format: 'Listening, Reading, Writing, Speaking' },
        { title: 'TOEFL', desc: 'US standard English test.', score: 'Requires 100+', img: '/toefl.png', format: 'Online iBT Format' },
        { title: 'SAT', desc: 'Logic test for US colleges.', score: 'Requires 1400+', img: '/sat.jpg', format: 'Reading/Writing & Math' }
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
