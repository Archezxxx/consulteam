(function () {
  "use strict";

  const WHATSAPP_NUMBER = "996709694959";
  const LANGS = ["ru", "ky", "en"];

  const profiles = {
    tech: {
      icon: "⌘",
      color: "#3354ff",
      countries: ["Китай", "Тайвань", "Малайзия"],
      ru: {
        title: "IT и цифровые технологии",
        specialties: ["Computer Science", "Разработка ПО", "Data Science"],
        reason: "Вам подходят задачи, где нужно искать закономерности, строить системы и превращать идеи в работающие продукты."
      },
      ky: {
        title: "IT жана санариптик технологиялар",
        specialties: ["Computer Science", "Программалык камсыздоо", "Data Science"],
        reason: "Сизге мыйзам ченемдүүлүктөрдү таап, системаларды куруп жана идеяларды иштеген продуктка айлантуу ылайыктуу."
      },
      en: {
        title: "IT & Digital Technology",
        specialties: ["Computer Science", "Software Engineering", "Data Science"],
        reason: "You are well suited to finding patterns, building systems and turning ideas into useful products."
      }
    },
    engineering: {
      icon: "⚙",
      color: "#5470ff",
      countries: ["Чехия", "Германия", "Тайвань"],
      ru: {
        title: "Инженерия и технологии",
        specialties: ["Mechanical Engineering", "Электроинженерия", "Civil Engineering"],
        reason: "Ваш сильный сценарий — понимать, как устроены вещи, улучшать процессы и создавать надежные решения."
      },
      ky: {
        title: "Инженерия жана технология",
        specialties: ["Mechanical Engineering", "Электроинженерия", "Civil Engineering"],
        reason: "Сиз нерселердин түзүлүшүн түшүнүп, процесстерди жакшыртып жана ишенимдүү чечимдерди түзүүгө жөндөмдүүсүз."
      },
      en: {
        title: "Engineering & Technology",
        specialties: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
        reason: "Your strength is understanding how things work, improving processes and creating reliable solutions."
      }
    },
    business: {
      icon: "↗",
      color: "#ff5e33",
      countries: ["Малайзия", "Италия", "Турция"],
      ru: {
        title: "Бизнес и экономика",
        specialties: ["International Business", "Финансы", "Маркетинг"],
        reason: "Вы умеете видеть возможности, договариваться и собирать людей вокруг понятной цели."
      },
      ky: {
        title: "Бизнес жана экономика",
        specialties: ["International Business", "Финансы", "Маркетинг"],
        reason: "Сиз мүмкүнчүлүктөрдү көрүп, сүйлөшүүлөрдү жүргүзүп жана адамдарды бир максатка бириктире аласыз."
      },
      en: {
        title: "Business & Economics",
        specialties: ["International Business", "Finance", "Marketing"],
        reason: "You can spot opportunities, negotiate and bring people together around a clear goal."
      }
    },
    health: {
      icon: "+",
      color: "#16a085",
      countries: ["Турция", "Италия", "Китай"],
      ru: {
        title: "Медицина и науки о жизни",
        specialties: ["Медицина", "Биотехнологии", "Фармация"],
        reason: "У вас сочетаются внимательность к деталям, интерес к науке и желание приносить людям реальную пользу."
      },
      ky: {
        title: "Медицина жана жашоо илимдери",
        specialties: ["Медицина", "Биотехнология", "Фармация"],
        reason: "Сизде деталдарга көңүл буруу, илимге кызыгуу жана адамдарга пайда алып келүү каалоосу айкалышат."
      },
      en: {
        title: "Medicine & Life Sciences",
        specialties: ["Medicine", "Biotechnology", "Pharmacy"],
        reason: "You combine attention to detail, curiosity about science and a desire to make a real difference for people."
      }
    },
    creative: {
      icon: "◇",
      color: "#9b59b6",
      countries: ["Италия", "Чехия", "Малайзия"],
      ru: {
        title: "Дизайн и архитектура",
        specialties: ["Архитектура", "UX/UI Design", "Visual Communication"],
        reason: "Вы мыслите образами, замечаете детали и любите создавать новое там, где нет готового ответа."
      },
      ky: {
        title: "Дизайн жана архитектура",
        specialties: ["Архитектура", "UX/UI Design", "Visual Communication"],
        reason: "Сиз образдар менен ойлонуп, деталдарды байкап жана даяр жообу жок жерде жаңылык жаратууну жактырасыз."
      },
      en: {
        title: "Design & Architecture",
        specialties: ["Architecture", "UX/UI Design", "Visual Communication"],
        reason: "You think visually, notice details and enjoy creating something new when there is no ready-made answer."
      }
    },
    people: {
      icon: "◎",
      color: "#e67e22",
      countries: ["Турция", "Польша", "Венгрия"],
      ru: {
        title: "Психология и образование",
        specialties: ["Психология", "Образование", "Human Resources"],
        reason: "Ваш ресурс — эмпатия, умение слушать и помогать другим раскрывать свои сильные стороны."
      },
      ky: {
        title: "Психология жана билим берүү",
        specialties: ["Психология", "Билим берүү", "Human Resources"],
        reason: "Сиздин күчүңүз — эмпатия, уга билүү жана башкаларга өз күчүн ачууга жардам берүү."
      },
      en: {
        title: "Psychology & Education",
        specialties: ["Psychology", "Education", "Human Resources"],
        reason: "Your strengths are empathy, listening and helping others unlock their potential."
      }
    },
    global: {
      icon: "✦",
      color: "#2471a3",
      countries: ["Италия", "Чехия", "Южная Корея"],
      ru: {
        title: "Международные отношения и право",
        specialties: ["International Relations", "Международное право", "Туризм и Hospitality"],
        reason: "Вам близки языки, культуры, общественные процессы и работа на пересечении разных интересов."
      },
      ky: {
        title: "Эл аралык мамилелер жана укук",
        specialties: ["International Relations", "Эл аралык укук", "Туризм жана Hospitality"],
        reason: "Сизге тилдер, маданияттар, коомдук процесстер жана түрдүү кызыкчылыктардын кесилишиндеги иш жакын."
      },
      en: {
        title: "International Relations & Law",
        specialties: ["International Relations", "International Law", "Tourism & Hospitality"],
        reason: "You are drawn to languages, cultures, public affairs and work that connects different interests."
      }
    },
    science: {
      icon: "△",
      color: "#00838f",
      countries: ["Германия", "Китай", "Тайвань"],
      ru: {
        title: "Наука и исследования",
        specialties: ["Applied Mathematics", "Химия", "Environmental Science"],
        reason: "Вы любите разбираться в сложных вопросах, проверять гипотезы и добираться до точного ответа."
      },
      ky: {
        title: "Илим жана изилдөө",
        specialties: ["Applied Mathematics", "Химия", "Environmental Science"],
        reason: "Сиз татаал суроолорду талдап, гипотезаларды текшерип жана так жооп табууну жактырасыз."
      },
      en: {
        title: "Science & Research",
        specialties: ["Applied Mathematics", "Chemistry", "Environmental Science"],
        reason: "You enjoy exploring complex questions, testing hypotheses and working toward precise answers."
      }
    }
  };

  const copy = {
    ru: {
      eyebrow: "ПРОФОРИЕНТАЦИЯ",
      title: "Найди специальность,\nкоторая подходит тебе",
      subtitle: "Ответь на 8 вопросов — покажем три направления, с которых стоит начать выбор программы и страны.",
      start: "Пройти тест",
      duration: "≈ 3 минуты",
      privacy: "Без регистрации и сбора данных",
      heroCta: "Подобрать специальность",
      question: "Вопрос",
      of: "из",
      back: "Назад",
      next: "Далее",
      resultEyebrow: "ВАШ РЕЗУЛЬТАТ",
      resultTitle: "Три направления, которые вам подходят",
      resultSubtitle: "Это ориентир для старта. На консультации мы сверим результат с оценками, бюджетом, языком и целями.",
      specialties: "Специальности",
      countries: "Где особенно стоит смотреть",
      consult: "Обсудить результат с консультантом",
      restart: "Пройти ещё раз",
      disclaimer: "Результат носит рекомендательный характер",
      whatsapp: "Здравствуйте! Я прошёл(ла) тест на сайте. Мой главный результат: {result}. Хочу подобрать программу обучения.",
      questions: [
        {
          text: "Какие предметы вам обычно даются легче?",
          options: [
            ["Математика и информатика", { tech: 3, engineering: 2, science: 1 }],
            ["Физика и технические дисциплины", { engineering: 3, tech: 1, science: 2 }],
            ["Биология и химия", { health: 3, science: 2 }],
            ["История, языки и общество", { global: 3, people: 1 }],
            ["Искусство и творческие проекты", { creative: 3, global: 1 }]
          ]
        },
        {
          text: "Какая задача звучит интереснее?",
          options: [
            ["Создать приложение или цифровой сервис", { tech: 3, creative: 1 }],
            ["Спроектировать устройство, здание или систему", { engineering: 3, creative: 1 }],
            ["Запустить проект и привлечь клиентов", { business: 3, global: 1 }],
            ["Разобраться, как помочь человеку", { health: 2, people: 3 }],
            ["Исследовать сложную проблему", { science: 3, health: 1 }]
          ]
        },
        {
          text: "Какую свою сильную сторону вы цените больше всего?",
          options: [
            ["Логика и системное мышление", { tech: 2, engineering: 2, science: 2 }],
            ["Общение и умение убеждать", { business: 3, global: 2 }],
            ["Эмпатия и внимательность к людям", { people: 3, health: 2 }],
            ["Воображение и чувство формы", { creative: 3 }],
            ["Любознательность и точность", { science: 3, health: 1 }]
          ]
        },
        {
          text: "В какой среде вы лучше раскрываетесь?",
          options: [
            ["В технологичной команде", { tech: 3, engineering: 1 }],
            ["В компании, где важны скорость и результат", { business: 3 }],
            ["В лаборатории, клинике или исследовательском центре", { health: 2, science: 3 }],
            ["В студии или проектном бюро", { creative: 3, engineering: 1 }],
            ["В международной и мультикультурной среде", { global: 3, business: 1 }]
          ]
        },
        {
          text: "Какой результат работы приносит вам больше удовлетворения?",
          options: [
            ["Работающий продукт или понятный алгоритм", { tech: 3, engineering: 1 }],
            ["Рост показателей и успешная сделка", { business: 3 }],
            ["Реальная помощь конкретному человеку", { health: 2, people: 3 }],
            ["Красивое и удобное пространство или визуал", { creative: 3 }],
            ["Новый факт, вывод или доказательство", { science: 3 }]
          ]
        },
        {
          text: "Как вы предпочитаете принимать решения?",
          options: [
            ["Через данные и расчёты", { tech: 2, science: 3, business: 1 }],
            ["Через прототипы и эксперименты", { engineering: 2, creative: 2, tech: 1 }],
            ["Обсуждая с людьми и собирая мнения", { people: 2, business: 2, global: 2 }],
            ["Опираясь на правила, факты и ответственность", { health: 2, global: 2, science: 1 }]
          ]
        },
        {
          text: "Что для вас важнее в будущей профессии?",
          options: [
            ["Быстрорастущая индустрия и гибкость", { tech: 3, business: 1 }],
            ["Создавать большие физические проекты", { engineering: 3 }],
            ["Польза людям и обществу", { health: 2, people: 3, global: 1 }],
            ["Свобода самовыражения", { creative: 3 }],
            ["Международная карьера и путешествия", { global: 3, business: 1 }]
          ]
        },
        {
          text: "Какой учебный путь вам комфортнее?",
          options: [
            ["Хочу быстрее перейти к практике", { tech: 2, business: 2, creative: 2 }],
            ["Готов(а) к долгому и интенсивному обучению", { health: 3, science: 2 }],
            ["Хочу совмещать теорию с проектами", { engineering: 2, tech: 1, creative: 1 }],
            ["Важны стажировки, обмены и языки", { global: 3, business: 1 }],
            ["Мне важно работать с людьми уже во время учёбы", { people: 3, health: 1 }]
          ]
        }
      ]
    },
    ky: {
      eyebrow: "КЕСИПТИК БАГЫТ",
      title: "Сизге ылайыктуу\nадистикти табыңыз",
      subtitle: "8 суроого жооп бериңиз — программа жана өлкө тандоону кайсы үч багыттан баштоо керектигин көрсөтөбүз.",
      start: "Тесттен өтүү",
      duration: "≈ 3 мүнөт",
      privacy: "Каттоосуз жана маалымат чогултулбайт",
      heroCta: "Адистик тандоо",
      question: "Суроо",
      of: "/",
      back: "Артка",
      next: "Кийинки",
      resultEyebrow: "СИЗДИН ЖЫЙЫНТЫК",
      resultTitle: "Сизге ылайыктуу үч багыт",
      resultSubtitle: "Бул — баштапкы багыт. Консультацияда жыйынтыкты баалар, бюджет, тил жана максаттар менен салыштырабыз.",
      specialties: "Адистиктер",
      countries: "Кайсы өлкөлөрдү карап көрүү керек",
      consult: "Жыйынтыкты консультант менен талкуулоо",
      restart: "Кайра өтүү",
      disclaimer: "Жыйынтык сунуштоо мүнөзүнө ээ",
      whatsapp: "Саламатсызбы! Сайттагы тесттен өттүм. Негизги жыйынтыгым: {result}. Окуу программасын тандагым келет.",
      questions: null
    },
    en: {
      eyebrow: "CAREER GUIDANCE",
      title: "Find a major\nthat fits you",
      subtitle: "Answer 8 short questions and discover three fields to explore first when choosing a program and country.",
      start: "Take the quiz",
      duration: "≈ 3 minutes",
      privacy: "No sign-up or personal data collection",
      heroCta: "Find my major",
      question: "Question",
      of: "of",
      back: "Back",
      next: "Next",
      resultEyebrow: "YOUR RESULT",
      resultTitle: "Three fields that fit you",
      resultSubtitle: "Use this as a starting point. In a consultation, we will match it with your grades, budget, language level and goals.",
      specialties: "Majors",
      countries: "Countries worth exploring",
      consult: "Discuss my result with an advisor",
      restart: "Retake the quiz",
      disclaimer: "This result is a starting point, not a formal assessment",
      whatsapp: "Hello! I completed the quiz on your website. My top result is {result}. I would like help choosing a study program.",
      questions: null
    }
  };

  const countryNames = {
    "Китай": { ru: "Китай", ky: "Кытай", en: "China" },
    "Тайвань": { ru: "Тайвань", ky: "Тайвань", en: "Taiwan" },
    "Малайзия": { ru: "Малайзия", ky: "Малайзия", en: "Malaysia" },
    "Чехия": { ru: "Чехия", ky: "Чехия", en: "Czechia" },
    "Германия": { ru: "Германия", ky: "Германия", en: "Germany" },
    "Италия": { ru: "Италия", ky: "Италия", en: "Italy" },
    "Турция": { ru: "Турция", ky: "Түркия", en: "Türkiye" },
    "Польша": { ru: "Польша", ky: "Польша", en: "Poland" },
    "Венгрия": { ru: "Венгрия", ky: "Венгрия", en: "Hungary" },
    "Южная Корея": { ru: "Южная Корея", ky: "Түштүк Корея", en: "South Korea" }
  };

  const questionTranslations = {
    ky: [
      ["Кайсы сабактар сизге жеңилирээк?", ["Математика жана информатика", "Физика жана техникалык сабактар", "Биология жана химия", "Тарых, тилдер жана коом", "Искусство жана чыгармачыл долбоорлор"]],
      ["Кайсы тапшырма кызыктуураак угулат?", ["Тиркеме же санарип кызмат түзүү", "Түзмөк, имарат же система долбоорлоо", "Долбоор баштап, кардарларды тартуу", "Адамга кантип жардам берүүнү түшүнүү", "Татаал маселени изилдөө"]],
      ["Кайсы күчтүү тарабыңызды көбүрөөк баалайсыз?", ["Логика жана системалуу ой жүгүртүү", "Баарлашуу жана ынандыруу", "Эмпатия жана адамдарга көңүл буруу", "Элестетүү жана форма сезими", "Кызыгуу жана тактык"]],
      ["Кайсы чөйрөдө жакшы ачыласыз?", ["Технологиялык командада", "Ылдамдык жана жыйынтык маанилүү компанияда", "Лабораторияда, клиникада же изилдөө борборунда", "Студияда же долбоордук бюродо", "Эл аралык жана көп маданияттуу чөйрөдө"]],
      ["Кайсы иштин жыйынтыгы сизди көбүрөөк кубандырат?", ["Иштеген продукт же түшүнүктүү алгоритм", "Көрсөткүчтөрдүн өсүшү жана ийгиликтүү келишим", "Белгилүү бир адамга чыныгы жардам", "Кооз жана ыңгайлуу мейкиндик же визуал", "Жаңы факт, тыянак же далил"]],
      ["Чечимди кандай кабыл алганды жактырасыз?", ["Маалымат жана эсептөөлөр аркылуу", "Прототиптер жана эксперименттер аркылуу", "Адамдар менен талкуулап, пикир чогултуу аркылуу", "Эрежелерге, фактыларга жана жоопкерчиликке таянып"]],
      ["Келечектеги кесипте сиз үчүн эмне маанилүү?", ["Тез өсүүчү тармак жана ийкемдүүлүк", "Ири физикалык долбоорлорду түзүү", "Адамдарга жана коомго пайда", "Өзүн билдирүү эркиндиги", "Эл аралык карьера жана саякат"]],
      ["Кайсы окуу жолу сизге ыңгайлуу?", ["Практикага тезирээк өтүүнү каалайм", "Узак жана интенсивдүү окууга даярмын", "Теорияны долбоорлор менен айкалыштыргым келет", "Стажировка, алмашуу жана тилдер маанилүү", "Окуп жатканда эле адамдар менен иштөө маанилүү"]]
    ],
    en: [
      ["Which subjects usually feel easiest to you?", ["Math and computer science", "Physics and technical subjects", "Biology and chemistry", "History, languages and society", "Art and creative projects"]],
      ["Which task sounds most interesting?", ["Build an app or digital service", "Design a device, building or system", "Launch a project and attract customers", "Figure out how to help someone", "Research a complex problem"]],
      ["Which strength do you value most in yourself?", ["Logic and systems thinking", "Communication and persuasion", "Empathy and attention to people", "Imagination and sense of form", "Curiosity and precision"]],
      ["In which environment do you do your best work?", ["A technology team", "A results-driven company", "A lab, clinic or research center", "A studio or design office", "An international, multicultural environment"]],
      ["Which work outcome feels most satisfying?", ["A working product or clear algorithm", "Growth metrics and a successful deal", "Making a real difference for one person", "A beautiful, useful space or visual", "A new fact, conclusion or proof"]],
      ["How do you prefer to make decisions?", ["Using data and calculations", "Using prototypes and experiments", "By discussing and collecting opinions", "By relying on rules, facts and responsibility"]],
      ["What matters most in your future career?", ["A fast-growing industry and flexibility", "Building large physical projects", "Helping people and society", "Freedom of self-expression", "An international career and travel"]],
      ["Which study path feels right for you?", ["I want to move into practice quickly", "I am ready for long, intensive study", "I want to combine theory with projects", "Internships, exchanges and languages matter", "I want to work with people during my studies"]]
    ]
  };

  questionTranslations.ky.forEach((item, questionIndex) => {
    const base = copy.ru.questions[questionIndex];
    copy.ky.questions = copy.ky.questions || [];
    copy.ky.questions.push({
      text: item[0],
      options: base.options.map((option, optionIndex) => [item[1][optionIndex], option[1]])
    });
  });

  questionTranslations.en.forEach((item, questionIndex) => {
    const base = copy.ru.questions[questionIndex];
    copy.en.questions = copy.en.questions || [];
    copy.en.questions.push({
      text: item[0],
      options: base.options.map((option, optionIndex) => [item[1][optionIndex], option[1]])
    });
  });

  let state = {
    lang: detectLanguage(),
    phase: "intro",
    index: 0,
    answers: []
  };

  function detectLanguage() {
    const text = document.body ? document.body.innerText : "";
    if (/Сизди|Өлкөлөр|Талаптар/.test(text)) return "ky";
    if (/Send you abroad|Destinations|Entrance Exams/i.test(text)) return "en";
    return "ru";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function sectionMarkup() {
    return '<section id="quiz" class="ctq-section" aria-labelledby="ctq-title">' +
      '<div class="ctq-orb ctq-orb-one" aria-hidden="true"></div>' +
      '<div class="ctq-orb ctq-orb-two" aria-hidden="true"></div>' +
      '<div class="ctq-shell">' +
        '<div id="ctq-app" class="ctq-card"></div>' +
      '</div>' +
    '</section>';
  }

  function renderIntro() {
    const t = copy[state.lang];
    return '<div class="ctq-intro">' +
      '<div class="ctq-intro-copy">' +
        '<span class="ctq-eyebrow">✦ ' + escapeHtml(t.eyebrow) + '</span>' +
        '<h2 id="ctq-title">' + escapeHtml(t.title).replace(/\n/g, "<br>") + '</h2>' +
        '<p class="ctq-lead">' + escapeHtml(t.subtitle) + '</p>' +
        '<button class="ctq-primary" type="button" data-ctq-action="start">' + escapeHtml(t.start) + '<span aria-hidden="true">→</span></button>' +
        '<div class="ctq-trust"><span>◷ ' + escapeHtml(t.duration) + '</span><span>✓ ' + escapeHtml(t.privacy) + '</span></div>' +
      '</div>' +
      '<div class="ctq-visual" aria-hidden="true">' +
        '<div class="ctq-visual-label">YOUR<br><strong>FUTURE</strong></div>' +
        '<div class="ctq-path ctq-path-1"><span>01</span><b>DISCOVER</b></div>' +
        '<div class="ctq-path ctq-path-2"><span>02</span><b>CHOOSE</b></div>' +
        '<div class="ctq-path ctq-path-3"><span>03</span><b>GO GLOBAL</b></div>' +
      '</div>' +
    '</div>';
  }

  function renderQuestion() {
    const t = copy[state.lang];
    const question = t.questions[state.index];
    const selected = state.answers[state.index];
    const progress = ((state.index + 1) / t.questions.length) * 100;

    return '<div class="ctq-question-view">' +
      '<div class="ctq-progress-meta"><span>' + escapeHtml(t.question) + ' <strong>' + (state.index + 1) + '</strong> ' + escapeHtml(t.of) + ' ' + t.questions.length + '</span><span>' + Math.round(progress) + '%</span></div>' +
      '<div class="ctq-progress" role="progressbar" aria-valuemin="1" aria-valuemax="' + t.questions.length + '" aria-valuenow="' + (state.index + 1) + '"><span style="width:' + progress + '%"></span></div>' +
      '<h2 id="ctq-title" class="ctq-question-title">' + escapeHtml(question.text) + '</h2>' +
      '<div class="ctq-options" role="radiogroup" aria-label="' + escapeHtml(question.text) + '">' +
        question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          return '<button class="ctq-option' + (isSelected ? ' is-selected' : '') + '" type="button" role="radio" aria-checked="' + isSelected + '" data-ctq-answer="' + optionIndex + '">' +
            '<span class="ctq-option-key">' + String.fromCharCode(65 + optionIndex) + '</span>' +
            '<span>' + escapeHtml(option[0]) + '</span>' +
            '<span class="ctq-check" aria-hidden="true">✓</span>' +
          '</button>';
        }).join("") +
      '</div>' +
      '<div class="ctq-actions">' +
        '<button class="ctq-back" type="button" data-ctq-action="back"' + (state.index === 0 ? ' disabled' : '') + '>← ' + escapeHtml(t.back) + '</button>' +
        '<button class="ctq-primary ctq-next" type="button" data-ctq-action="next"' + (selected === undefined ? ' disabled' : '') + '>' + escapeHtml(state.index === t.questions.length - 1 ? t.resultEyebrow : t.next) + ' <span aria-hidden="true">→</span></button>' +
      '</div>' +
    '</div>';
  }

  function calculateResults() {
    const totals = Object.keys(profiles).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});

    state.answers.forEach((answer, questionIndex) => {
      const weights = copy.ru.questions[questionIndex].options[answer][1];
      Object.entries(weights).forEach(([profile, points]) => {
        totals[profile] += points;
      });
    });

    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, score]) => ({ key, score }));
  }

  function renderResults() {
    const t = copy[state.lang];
    const results = calculateResults();
    const topTitle = profiles[results[0].key][state.lang].title;
    const message = encodeURIComponent(t.whatsapp.replace("{result}", topTitle));

    return '<div class="ctq-results">' +
      '<span class="ctq-eyebrow">✦ ' + escapeHtml(t.resultEyebrow) + '</span>' +
      '<h2 id="ctq-title">' + escapeHtml(t.resultTitle) + '</h2>' +
      '<p class="ctq-lead">' + escapeHtml(t.resultSubtitle) + '</p>' +
      '<div class="ctq-result-grid">' +
        results.map((result, index) => {
          const profile = profiles[result.key];
          const localized = profile[state.lang];
          return '<article class="ctq-result-card' + (index === 0 ? ' is-primary' : '') + '" style="--ctq-accent:' + profile.color + '">' +
            '<div class="ctq-result-top"><span class="ctq-result-rank">0' + (index + 1) + '</span><span class="ctq-result-icon">' + profile.icon + '</span></div>' +
            '<h3>' + escapeHtml(localized.title) + '</h3>' +
            '<p>' + escapeHtml(localized.reason) + '</p>' +
            '<div class="ctq-result-block"><b>' + escapeHtml(t.specialties) + '</b><div class="ctq-tags">' + localized.specialties.map(item => '<span>' + escapeHtml(item) + '</span>').join("") + '</div></div>' +
            '<div class="ctq-result-block"><b>' + escapeHtml(t.countries) + '</b><div class="ctq-countries">' + profile.countries.map(item => '<span>● ' + escapeHtml(countryNames[item]?.[state.lang] || item) + '</span>').join("") + '</div></div>' +
          '</article>';
        }).join("") +
      '</div>' +
      '<div class="ctq-result-actions">' +
        '<a class="ctq-primary" href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message + '" target="_blank" rel="noreferrer">' + escapeHtml(t.consult) + ' <span aria-hidden="true">↗</span></a>' +
        '<button class="ctq-back" type="button" data-ctq-action="restart">↺ ' + escapeHtml(t.restart) + '</button>' +
      '</div>' +
      '<p class="ctq-disclaimer">Consulteam • ' + escapeHtml(t.disclaimer) + '</p>' +
    '</div>';
  }

  function render() {
    const app = document.getElementById("ctq-app");
    if (!app) return;
    app.setAttribute("aria-live", "polite");
    app.innerHTML = state.phase === "intro" ? renderIntro() : state.phase === "questions" ? renderQuestion() : renderResults();
  }

  function addHeroCta() {
    const candidates = Array.from(document.querySelectorAll('a[href="#destinations"]'));
    const original = candidates.find(link => link.classList.contains("btn-primary")) || candidates[candidates.length - 1];
    if (!original || document.querySelector("[data-ctq-hero]")) return;
    const link = document.createElement("a");
    link.href = "#quiz";
    link.className = "ctq-hero-link";
    link.dataset.ctqHero = "true";
    link.textContent = copy[state.lang].heroCta;
    original.insertAdjacentElement("afterend", link);
  }

  function updateHeroCta() {
    const link = document.querySelector("[data-ctq-hero]");
    if (link) link.textContent = copy[state.lang].heroCta;
  }

  function handleClick(event) {
    const answerButton = event.target.closest("[data-ctq-answer]");
    if (answerButton) {
      state.answers[state.index] = Number(answerButton.dataset.ctqAnswer);
      render();
      return;
    }

    const actionButton = event.target.closest("[data-ctq-action]");
    if (actionButton) {
      const action = actionButton.dataset.ctqAction;
      if (action === "start") {
        state.phase = "questions";
        state.index = 0;
      } else if (action === "back" && state.index > 0) {
        state.index -= 1;
      } else if (action === "next" && state.answers[state.index] !== undefined) {
        if (state.index < copy[state.lang].questions.length - 1) state.index += 1;
        else state.phase = "results";
      } else if (action === "restart") {
        state.phase = "questions";
        state.index = 0;
        state.answers = [];
      }
      render();
      document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const languageButton = event.target.closest("button");
    const label = languageButton?.textContent?.trim().toLowerCase();
    if (LANGS.includes(label)) {
      window.setTimeout(() => {
        state.lang = label;
        render();
        updateHeroCta();
      }, 80);
    }
  }

  function mount() {
    if (document.getElementById("quiz")) return;
    const anchor = document.getElementById("destinations") || document.getElementById("exams") || document.querySelector("footer");
    if (!anchor) {
      window.setTimeout(mount, 150);
      return;
    }
    anchor.insertAdjacentHTML("beforebegin", sectionMarkup());
    addHeroCta();
    render();
    document.addEventListener("click", handleClick);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();


