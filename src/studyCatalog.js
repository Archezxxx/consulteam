// Universities named in the presentations under /information and /public/presentations.
// QS badges use the 2027 QS World University Rankings only. Absence of a badge
// means that a comparable world-rank entry was not verified.
const label = (ru, ky, en) => ({ ru, ky, en });

export const studyFields = {
  engineering: { label: label('Инженерия', 'Инженерия', 'Engineering'), types: ['R', 'I'] },
  computing: { label: label('IT и компьютерные науки', 'IT жана компьютердик илимдер', 'Computing and IT'), types: ['I', 'R', 'C'] },
  business: { label: label('Бизнес и менеджмент', 'Бизнес жана менеджмент', 'Business and management'), types: ['E', 'C'] },
  finance: { label: label('Финансы и экономика', 'Финансы жана экономика', 'Finance and economics'), types: ['C', 'E', 'I'] },
  design: { label: label('Дизайн и творческие индустрии', 'Дизайн жана чыгармачылык индустриялар', 'Design and creative industries'), types: ['A', 'R'] },
  architecture: { label: label('Архитектура', 'Архитектура', 'Architecture'), types: ['A', 'R'] },
  media: { label: label('Медиа и коммуникации', 'Медиа жана коммуникация', 'Media and communications'), types: ['A', 'S', 'E'] },
  education: { label: label('Педагогика', 'Педагогика', 'Education'), types: ['S', 'I'] },
  medicine: { label: label('Медицина', 'Медицина', 'Medicine'), types: ['S', 'I'] },
  health: { label: label('Медицинские науки и уход', 'Саламаттык илимдери жана кам көрүү', 'Health sciences and care'), types: ['S', 'I', 'R'] },
  law: { label: label('Право', 'Укук', 'Law'), types: ['E', 'S', 'C'] },
  humanities: { label: label('Гуманитарные науки и языки', 'Гуманитардык илимдер жана тилдер', 'Humanities and languages'), types: ['A', 'S', 'I'] },
  science: { label: label('Естественные науки', 'Табигый илимдер', 'Natural sciences'), types: ['I', 'R'] },
  environment: { label: label('Экология и окружающая среда', 'Экология жана айлана-чөйрө', 'Environment and ecology'), types: ['I', 'R', 'S'] },
  agriculture: { label: label('Сельское хозяйство и биотехнологии', 'Айыл чарба жана биотехнология', 'Agriculture and biotechnology'), types: ['R', 'I'] },
  tourism: { label: label('Туризм и гостиничное дело', 'Туризм жана меймандостук', 'Tourism and hospitality'), types: ['S', 'E'] },
  sports: { label: label('Спорт и физическая культура', 'Спорт жана дене тарбия', 'Sports and physical education'), types: ['R', 'S'] },
  textile: { label: label('Текстиль и мода', 'Текстиль жана мода', 'Textiles and fashion'), types: ['R', 'A'] },
  marine: { label: label('Морские науки', 'Деңиз илимдери', 'Marine sciences'), types: ['I', 'R'] },
  psychology: { label: label('Психология и социальные науки', 'Психология жана коомдук илимдер', 'Psychology and social sciences'), types: ['S', 'I'] },
  pharmacy: { label: label('Фармация и биомедицина', 'Фармация жана биомедицина', 'Pharmacy and biomedicine'), types: ['I', 'S', 'C'] },
  data: { label: label('Данные и аналитика', 'Маалыматтар жана аналитика', 'Data and analytics'), types: ['I', 'C'] },
  foundation: { label: label('Подготовительная программа / язык', 'Даярдоо программасы / тил', 'Foundation / language pathway'), types: ['S', 'A', 'I', 'R', 'E', 'C'] },
};

const qs = (rank, url, sort) => ({ rank, url, sort });
const entry = (country, name, city, slide, fields, ranking = null, extra = {}) => ({
  id: `${country}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  country, name, city, slide, fields, qs: ranking, ...extra,
});

export const studyUniversities = [
  // Taiwan: Consulteam Taiwan presentation, slides 10–20.
  entry('taiwan', 'Asia University Taiwan', 'Taichung', 10, ['medicine', 'computing', 'design', 'business'], qs('=649', 'https://www.topuniversities.com/universities/asia-university-taiwan', 649)),
  entry('taiwan', 'Yuan Ze University', 'Taoyuan', 11, ['engineering', 'computing', 'business', 'health'], qs('1001–1200', 'https://www.topuniversities.com/universities/yuan-ze-university', 1001)),
  entry('taiwan', 'National Dong Hwa University', 'Hualien', 12, ['engineering', 'education', 'design', 'environment'], qs('1401+', 'https://www.topuniversities.com/universities/national-dong-hwa-university', 1401)),
  entry('taiwan', 'Tunghai University', 'Taichung', 13, ['engineering', 'design', 'business', 'law'], qs('1201–1400', 'https://www.topuniversities.com/universities/tunghai-university', 1201)),
  entry('taiwan', 'Tamkang University', 'New Taipei', 14, ['computing', 'engineering', 'business', 'humanities'], qs('1201–1400', 'https://www.topuniversities.com/universities/tamkang-university', 1201)),
  entry('taiwan', 'Chinese Culture University', 'Taipei', 15, ['design', 'media', 'humanities', 'business']),
  entry('taiwan', 'Chaoyang University of Technology', 'Taichung', 16, ['engineering', 'computing', 'design', 'business']),
  entry('taiwan', 'Ming Chuan University', 'Taipei', 17, ['business', 'media', 'design', 'computing']),
  entry('taiwan', 'National Kaohsiung University of Science and Technology', 'Kaohsiung', 18, ['engineering', 'computing', 'business', 'marine']),
  entry('taiwan', 'National Taiwan University', 'Taipei', 19, ['medicine', 'engineering', 'science', 'business'], qs('54', 'https://www.topuniversities.com/universities/national-taiwan-university-ntu', 54)),
  entry('taiwan', 'National Sun Yat-sen University', 'Kaohsiung', 20, ['engineering', 'business', 'science', 'marine'], qs('=438', 'https://www.topuniversities.com/universities/national-sun-yat-sen-university-nsysu', 438)),

  // Italy: Consulteam Italy presentation, slides 10–15.
  entry('italy', 'University of Cassino and Southern Lazio', 'Cassino', 10, ['engineering', 'computing', 'finance', 'law', 'education'], qs('1001–1200', 'https://www.topuniversities.com/universities/university-cassino-southern-lazio', 1001)),
  entry('italy', 'University of Messina', 'Messina', 13, ['medicine', 'pharmacy', 'engineering', 'finance', 'education'], qs('761–770', 'https://www.topuniversities.com/universities/university-messina-unime', 761)),

  // Türkiye: Consulteam Türkiye presentation, slides 13–16.
  entry('turkey', 'Ardahan University', 'Ardahan', 13, ['education', 'humanities', 'business', 'health']),
  entry('turkey', 'Karabük University', 'Karabük', 13, ['engineering', 'computing', 'medicine', 'business']),
  entry('turkey', 'Giresun University', 'Giresun', 14, ['medicine', 'education', 'business', 'science']),
  entry('turkey', 'Sakarya University', 'Sakarya', 15, ['engineering', 'computing', 'medicine', 'business'], qs('1401+', 'https://www.topuniversities.com/universities/sakarya-university', 1401)),
  entry('turkey', 'Sakarya University of Applied Sciences', 'Sakarya', 15, ['engineering', 'computing', 'tourism', 'sports']),
  entry('turkey', 'Anadolu University', 'Eskişehir', 15, ['education', 'design', 'media', 'business']),
  entry('turkey', 'Eskişehir Osmangazi University', 'Eskişehir', 15, ['medicine', 'engineering', 'education', 'business']),
  entry('turkey', 'Istanbul Kent University', 'Istanbul', 16, ['health', 'psychology', 'design', 'business'], null, { photoCrop: 'tl' }),
  entry('turkey', 'Yaşar University', 'İzmir', 16, ['engineering', 'architecture', 'design', 'business'], null, { photoCrop: 'tr' }),
  entry('turkey', 'Istanbul Yeni Yüzyıl University', 'Istanbul', 16, ['medicine', 'health', 'law', 'media'], null, { photoCrop: 'bl' }),
  entry('turkey', 'Fenerbahçe University', 'Istanbul', 16, ['health', 'sports', 'business', 'media'], null, { photoCrop: 'br' }),

  // Malaysia: Consulteam Malaysia slides 11–13 and the INTI presentation.
  entry('malaysia', 'INTI International University', 'Nilai', 11, ['computing', 'business', 'finance', 'design', 'media', 'engineering'], qs('=406', 'https://www.topuniversities.com/universities/inti-international-university', 406)),
  entry('malaysia', 'INTI International College Subang', 'Subang Jaya', null, ['computing', 'business', 'design', 'media', 'foundation'], null, { source: 'inti', sourceUrl: 'https://newinti.edu.my/campuses/inti-international-college-subang/', photo: '/universities/inti-college-subang.png' }),
  entry('malaysia', 'ALFA University College', 'Subang Jaya', 12, ['design', 'architecture', 'computing', 'tourism', 'foundation']),
  entry('malaysia', 'City University Malaysia', 'Petaling Jaya', 13, ['computing', 'engineering', 'design', 'business', 'health']),
  entry('malaysia', 'Xiamen University Malaysia', 'Sepang', null, ['computing', 'engineering', 'business', 'media', 'marine'], null, { source: 'inti', sourceUrl: 'https://www.xmu.edu.my/undergraduate-programmes', photo: '/universities/xiamen-malaysia.webp' }),

  // China: Consulteam China presentation, slides 10–18.
  entry('china', 'Shaoyang University', 'Shaoyang', 10, ['medicine', 'engineering', 'education', 'business']),
  entry('china', 'Hunan University of Arts and Science', 'Changde', 11, ['education', 'humanities', 'design', 'science']),
  entry('china', 'Tongren University', 'Tongren', 12, ['education', 'humanities', 'business', 'science']),
  entry('china', 'Shandong University of Technology', 'Zibo', 13, ['engineering', 'computing', 'business', 'science']),
  entry('china', 'Chengdu Textile College', 'Chengdu', 14, ['textile', 'design', 'engineering', 'business']),
  entry('china', 'Jiangxi University of Finance and Economics', 'Nanchang', 15, ['finance', 'business', 'data', 'law']),
  entry('china', 'Chengdu University', 'Chengdu', 16, ['engineering', 'computing', 'health', 'education']),
  entry('china', 'Shanxi University', 'Taiyuan', 17, ['science', 'computing', 'humanities', 'business']),
  entry('china', 'Neijiang Normal University', 'Neijiang', 18, ['education', 'humanities', 'science', 'design']),

  // Czechia: Consulteam Czechia presentation, slides 11–12.
  entry('czech', 'Charles University', 'Prague', 11, ['medicine', 'law', 'humanities', 'science', 'education'], qs('=273', 'https://www.topuniversities.com/universities/charles-university', 273)),
  entry('czech', 'Prague University of Economics and Business', 'Prague', 12, ['finance', 'business', 'data', 'law'], qs('1001–1200', 'https://www.topuniversities.com/universities/prague-university-economics-business', 1001)),
];

export const universitiesForCountry = (countryId) => studyUniversities.filter((item) => item.country === countryId);
