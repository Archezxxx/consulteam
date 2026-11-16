const photo = (name, ru, ky, en) => ({
  src: `/cases/${name}.webp`,
  caption: { ru, ky, en },
});

export const caseStories = [
  {
    id: 'turkey',
    region: 'turkey',
    year: '2026',
    title: { ru: 'Турция: вместе в новой стране', ky: 'Түркия: жаңы өлкөдө бирге', en: 'Türkiye: together in a new country' },
    description: {
      ru: 'Дорога, первые встречи и визит к университету Karabük — в кадрах нашей группы.',
      ky: 'Жол, алгачкы жолугушуулар жана Karabük университетине баруу — биздин топтун сүрөттөрүндө.',
      en: 'The journey, first meetings and a visit to Karabük University through our group’s photos.',
    },
    photos: [
      photo('turkey-01', 'Группа с баннером Consulteam перед поездкой', 'Сапар алдындагы Consulteam баннери менен топ', 'The group with a Consulteam banner before the trip'),
      photo('turkey-02', 'Студенты с багажом в дороге', 'Жолдо жүк менен турган студенттер', 'Students travelling with their luggage'),
      photo('turkey-03', 'Группа за общим столом', 'Бир дасторкондо отурган топ', 'The group sharing a meal'),
      photo('turkey-04', 'Групповое фото во время поездки', 'Сапардагы топтун сүрөтү', 'A group photo during the trip'),
      photo('turkey-05', 'Группа у здания Karabük University', 'Karabük университетинин жанындагы топ', 'The group outside Karabük University'),
    ],
  },
  {
    id: 'taiwan',
    region: 'taiwan',
    title: { ru: 'Тайвань: люди и впечатления', ky: 'Тайвань: адамдар жана таасирлер', en: 'Taiwan: people and first impressions' },
    description: {
      ru: 'Встречи с друзьями, общие фотографии и вечерний Тайбэй.',
      ky: 'Достор менен жолугушуулар, чогуу түшкөн сүрөттөр жана кечки Тайбэй.',
      en: 'Friends, group photos and Taipei after dark.',
    },
    photos: [
      photo('taiwan-01', 'Друзья делают групповое селфи', 'Достордун чогуу түшкөн сүрөтү', 'Friends taking a group selfie'),
      photo('taiwan-02', 'Группа в зале прибытия', 'Келүү залындагы топ', 'The group in an arrivals hall'),
      photo('taiwan-03', 'Студент на фоне вечернего Тайбэя', 'Кечки Тайбэйдин фонундагы студент', 'A student overlooking Taipei at night'),
      photo('taiwan-04', 'Портрет на фоне вечернего города', 'Кечки шаардагы портрет', 'A portrait against the evening skyline'),
      photo('taiwan-05', 'Группа студентов на Тайване', 'Тайвандагы студенттердин тобу', 'A group of students in Taiwan'),
    ],
  },
  {
    id: 'prague',
    region: 'europe',
    title: { ru: 'Прага: встречи и студенческие будни', ky: 'Прага: жолугушуулар жана студенттик күндөр', en: 'Prague: meetings and student days' },
    description: {
      ru: 'Кадры встреч, университета и времени с друзьями в городе.',
      ky: 'Жолугушуулардын, университеттин жана шаардагы достор менен өткөн күндөрдүн сүрөттөрү.',
      en: 'Moments from meetings, university and time with friends in the city.',
    },
    photos: [
      photo('prague-01', 'Встреча студента с преподавателем', 'Студент менен окутуучунун жолугушуусу', 'A student meeting an educator'),
      photo('prague-02', 'Встреча в учебной аудитории', 'Окуу бөлмөсүндөгү жолугушуу', 'A meeting in a classroom'),
      photo('prague-03', 'Студенты у здания университета', 'Университеттин жанындагы студенттер', 'Students outside a university building'),
      photo('prague-04', 'Студент во время занятия', 'Сабак учурундагы студент', 'A student during a class'),
      photo('prague-05', 'Друзья на улице города', 'Шаардын көчөсүндөгү достор', 'Friends on a city street'),
    ],
  },
  {
    id: 'europe',
    region: 'europe',
    title: { ru: 'Европа: друзья и новые города', ky: 'Европа: достор жана жаңы шаарлар', en: 'Europe: friends and new cities' },
    description: {
      ru: 'Поездки, прогулки и обычные моменты жизни за рубежом.',
      ky: 'Сапарлар, сейилдөөлөр жана чет өлкөдөгү күнүмдүк жашоо.',
      en: 'Trips, walks and everyday moments abroad.',
    },
    photos: [
      photo('europe-01', 'Друзья на городской площади', 'Шаар аянтындагы достор', 'Friends in a city square'),
      photo('europe-02', 'Друзья у исторического здания', 'Тарыхый имараттын жанындагы достор', 'Friends outside a historic building'),
      photo('europe-03', 'Группа друзей в комнате', 'Бөлмөдөгү достордун тобу', 'A group of friends indoors'),
      photo('europe-04', 'Друзья на пикнике в парке', 'Парктагы пикникте достор', 'Friends picnicking in a park'),
    ],
  },
];

export const casesLabels = {
  ru: {
    nav: 'Кейсы', eyebrow: 'ИСТОРИИ СТУДЕНТОВ', title: 'У каждого пути свои кадры.',
    lead: 'Поездки, встречи и первые дни за рубежом — в фотографиях студентов и команды Consulteam.',
    all: 'Все истории', turkey: 'Турция', taiwan: 'Тайвань', europe: 'Европа',
    gallery: 'Открыть фото', previous: 'Предыдущее фото', next: 'Следующее фото', close: 'Закрыть фото',
    previewTitle: 'Истории в фотографиях', previewLead: 'Загляни в поездки и студенческую жизнь вместе с Consulteam.',
    seeAll: 'Смотреть все кейсы', contactTitle: 'Хочешь начать свой путь?', contactLead: 'Расскажем о странах, университетах и следующих шагах.', contact: 'Обсудить обучение',
  },
  ky: {
    nav: 'Окуялар', eyebrow: 'СТУДЕНТТЕРДИН ОКУЯЛАРЫ', title: 'Ар бир жолдун өз кадрлары бар.',
    lead: 'Сапарлар, жолугушуулар жана чет өлкөдөгү алгачкы күндөр — студенттер менен Consulteam командасынын сүрөттөрүндө.',
    all: 'Бардык окуялар', turkey: 'Түркия', taiwan: 'Тайвань', europe: 'Европа',
    gallery: 'Сүрөттү ачуу', previous: 'Мурунку сүрөт', next: 'Кийинки сүрөт', close: 'Сүрөттү жабуу',
    previewTitle: 'Сүрөттөрдөгү окуялар', previewLead: 'Consulteam менен сапарларды жана студенттик жашоону көр.',
    seeAll: 'Бардык окуяларды көрүү', contactTitle: 'Өз жолуңду баштагың келеби?', contactLead: 'Өлкөлөр, университеттер жана кийинки кадамдар жөнүндө айтып беребиз.', contact: 'Окууну талкуулоо',
  },
  en: {
    nav: 'Stories', eyebrow: 'STUDENT STORIES', title: 'Every journey has its own moments.',
    lead: 'Trips, meetings and first days abroad in photos from students and the Consulteam team.',
    all: 'All stories', turkey: 'Türkiye', taiwan: 'Taiwan', europe: 'Europe',
    gallery: 'Open photo', previous: 'Previous photo', next: 'Next photo', close: 'Close photo',
    previewTitle: 'Stories in pictures', previewLead: 'A look at the trips and student life with Consulteam.',
    seeAll: 'Explore all stories', contactTitle: 'Ready to start your journey?', contactLead: 'Let’s talk about countries, universities and next steps.', contact: 'Talk about studying',
  },
};
