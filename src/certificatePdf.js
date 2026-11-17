import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { countries, questions, riasec, TYPE_ORDER, typePalette } from './content';
import { studyFields, universitiesForCountry } from './studyCatalog';

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const INK = '#101c36';
const BLUE = '#164fc9';
const NAVY = '#1f3265';
const MUTED = '#52627c';
const PALE = '#f0f4fb';
const LIME = '#d8f55a';

const labels = {
  ru: {
    certificate: 'СЕРТИФИКАТ', subtitle: 'профориентационного теста', student: 'УЧЕНИК',
    phone: 'Телефон', email: 'Email', school: 'Школа', grade: 'Класс', date: 'Дата теста',
    profile: 'ПРОФИЛЬ ИНТЕРЕСОВ', types: 'Ведущие направления', scores: 'Результат по шести типам',
    countries: 'Страны и программы', countryIntro: 'Университеты из каталога Consulteam. Направления подобраны по профилю RIASEC.',
    tuition: 'Обучение', living: 'Проживание', grants: 'Гранты и поддержка', fields: 'Направления',
    answers: 'Как сложился результат', answersIntro: 'Ответы на все 15 вопросов. Баллы показывают интересы, а не право на зачисление.',
    disclaimer: 'Профориентационный результат не является психологическим диагнозом или подтверждением поступления.',
    contact: 'Уточните актуальные программы и требования с консультантом Consulteam.',
  },
  ky: {
    certificate: 'КҮБӨЛҮК', subtitle: 'кесипке багыт берүү тестинин жыйынтыгы', student: 'ОКУУЧУ',
    phone: 'Телефон', email: 'Email', school: 'Мектеп', grade: 'Класс', date: 'Тесттин датасы',
    profile: 'КЫЗЫГУУ ПРОФИЛИ', types: 'Негизги багыттар', scores: 'Алты тип боюнча жыйынтык',
    countries: 'Өлкөлөр жана багыттар', countryIntro: 'Consulteam каталогундагы университеттер. Багыттар RIASEC профили боюнча тандалды.',
    tuition: 'Окуу акысы', living: 'Жашоо', grants: 'Гранттар жана колдоо', fields: 'Багыттар',
    answers: 'Жыйынтык кантип түзүлдү', answersIntro: '15 суроонун баарына жооптор. Упайлар кызыгууну көрсөтөт, окууга кабыл алууну кепилдебейт.',
    disclaimer: 'Бул жыйынтык психологиялык диагноз же окууга кабыл алынганын тастыктаган документ эмес.',
    contact: 'Актуалдуу программаларды жана талаптарды Consulteam кеңешчиси менен тактаңыз.',
  },
  en: {
    certificate: 'CERTIFICATE', subtitle: 'career orientation test result', student: 'STUDENT',
    phone: 'Phone', email: 'Email', school: 'School', grade: 'Grade', date: 'Test date',
    profile: 'INTEREST PROFILE', types: 'Leading directions', scores: 'All six interest types',
    countries: 'Countries and programmes', countryIntro: 'Universities in the Consulteam directory. Fields are matched to your RIASEC profile.',
    tuition: 'Tuition', living: 'Living costs', grants: 'Scholarships and support', fields: 'Fields',
    answers: 'How your result was formed', answersIntro: 'Your answers to all 15 questions. Scores describe interests, not admission eligibility.',
    disclaimer: 'This career orientation result is not a psychological diagnosis or confirmation of admission.',
    contact: 'Confirm current programmes and requirements with a Consulteam adviser.',
  },
};

function pdfColor(hex) {
  const value = hex.replace('#', '');
  return rgb(...[0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16) / 255));
}

function clean(value) {
  return String(value ?? '').trim().replace(/[\u2010-\u2015]/g, '-').replace(/\s+/g, ' ') || '-';
}

function wrap(font, value, size, maxWidth) {
  const words = clean(value).split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    let remainder = word;
    while (font.widthOfTextAtSize(remainder, size) > maxWidth) {
      let cut = 1;
      while (cut < remainder.length && font.widthOfTextAtSize(remainder.slice(0, cut + 1), size) <= maxWidth) cut += 1;
      if (line) { lines.push(line); line = ''; }
      lines.push(remainder.slice(0, cut));
      remainder = remainder.slice(cut);
    }
    const candidate = line ? `${line} ${remainder}` : remainder;
    if (line && font.widthOfTextAtSize(candidate, size) > maxWidth) {
      lines.push(line);
      line = remainder;
    } else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
}

function drawText(page, font, value, x, top, size, color = INK, maxWidth = PAGE_WIDTH - x - 45, lineHeight = size * 1.3) {
  const lines = wrap(font, value, size, maxWidth);
  lines.forEach((line, index) => page.drawText(line, {
    x, y: PAGE_HEIGHT - top - size - index * lineHeight, size, font, color: pdfColor(color),
  }));
  return lines.length * lineHeight;
}

function drawFitted(page, font, value, x, top, maxWidth, maxLines, initialSize, minSize, color = INK) {
  let size = initialSize;
  while (size > minSize && wrap(font, value, size, maxWidth).length > maxLines) size -= 0.5;
  return drawText(page, font, value, x, top, size, color, maxWidth, size * 1.22);
}

function rectangle(page, x, top, width, height, fill) {
  page.drawRectangle({ x, y: PAGE_HEIGHT - top - height, width, height, color: pdfColor(fill) });
}

function rule(page, x, top, width, color = '#d5dfed') {
  rectangle(page, x, top, width, 0.7, color);
}

function brand(page, font, logo, dark = false) {
  rectangle(page, 45, 29, 38, 38, '#ffffff');
  page.drawImage(logo, { x: 48, y: PAGE_HEIGHT - 64, width: 32, height: 32 });
  drawText(page, font, 'Consulteam', 94, 37, 18, dark ? INK : '#ffffff', 300);
}

function footer(page, font, number, total) {
  rule(page, 45, 796, 505);
  drawText(page, font, 'Consulteam  |  consulteam.edu.kg', 45, 807, 8.5, MUTED);
  drawText(page, font, `${number} / ${total}`, 515, 807, 8.5, MUTED, 35);
}

function field(page, font, label, value, x, top, width) {
  drawText(page, font, label.toUpperCase(), x, top, 8.5, MUTED, width);
  drawFitted(page, font, value, x, top + 17, width, 3, 11.5, 7.5);
}

function recommendations(topTypes) {
  return countries.map((country) => {
    const options = universitiesForCountry(country.id).map((university, index) => {
      const score = university.fields.reduce((sum, field) => sum + topTypes.reduce((points, type, rank) =>
        points + (studyFields[field].types.includes(type) ? 3 - rank : 0), 0), 0);
      const matched = university.fields.filter((field) => topTypes.some((type) => studyFields[field].types.includes(type)));
      return { university, score, index, fields: (matched.length ? matched : university.fields).slice(0, 2) };
    }).sort((a, b) => b.score - a.score || (a.university.qs?.sort ?? Infinity) - (b.university.qs?.sort ?? Infinity) || a.index - b.index);
    return { country, universities: options };
  });
}

function drawCertificate(page, font, logo, report, t) {
  rectangle(page, 0, 0, PAGE_WIDTH, PAGE_HEIGHT, '#ffffff');
  rectangle(page, 0, 0, PAGE_WIDTH, 226, BLUE);
  brand(page, font, logo);
  drawText(page, font, 'RIASEC  /  15', 45, 96, 11, LIME);
  drawText(page, font, t.certificate, 45, 124, 40, '#ffffff', 505);
  drawText(page, font, t.subtitle, 45, 180, 17, '#ffffff', 505);

  drawText(page, font, t.student, 45, 247, 9, BLUE);
  drawFitted(page, font, report.student.full_name, 45, 264, 505, 3, 27, 13);
  rule(page, 45, 346, 505);
  const studentFields = [
    [t.phone, report.student.phone],
    [t.email, report.student.email],
    [t.school, report.student.school],
    [t.grade, report.student.grade],
    [t.date, report.date],
  ].filter(([, value]) => String(value ?? '').trim());
  studentFields.forEach(([label, value], index) => {
    field(page, font, label, value, index % 2 === 0 ? 45 : 310, 360 + Math.floor(index / 2) * 55, index % 2 === 0 ? 235 : 240);
  });
  const sectionShift = (3 - Math.ceil(studentFields.length / 2)) * 25;

  rectangle(page, 45, 522 - sectionShift, 505, 82, PALE);
  drawText(page, font, t.profile, 60, 536 - sectionShift, 9, BLUE);
  drawText(page, font, report.code, 60, 548 - sectionShift, 42, NAVY, 180);
  drawText(page, font, t.types, 250, 539 - sectionShift, 9, MUTED);
  drawFitted(page, font, report.topTypes.map((type) => `${type} ${riasec[report.lang][type].name}`).join('  /  '), 250, 556 - sectionShift, 276, 2, 12, 9.5);

  drawText(page, font, t.scores, 45, 616 - sectionShift, 15, INK);
  report.ranking.forEach(({ type, score }, index) => {
    const top = 641 - sectionShift + index * 17;
    rectangle(page, 45, top + 2, 14, 14, typePalette[type]);
    drawText(page, font, type, 49, top + 2, 9, INK, 10);
    drawText(page, font, riasec[report.lang][type].name, 69, top + 2, 10, INK, 135);
    rectangle(page, 224, top + 6, 270, 6, '#e4eaf4');
    rectangle(page, 224, top + 6, Math.max(2, (score / report.total) * 270), 6, typePalette[type]);
    drawText(page, font, `${Math.round((score / report.total) * 100)}%`, 502, top + 2, 10, NAVY, 44);
  });
  drawText(page, font, t.disclaimer, 45, 755 - sectionShift, 9, MUTED, 505, 12);
  footer(page, font, 1, 8);
}

function drawDestinationPage(page, font, logo, report, t, pageNumber, { country, universities }) {
  rectangle(page, 0, 0, PAGE_WIDTH, PAGE_HEIGHT, '#ffffff');
  rectangle(page, 0, 0, PAGE_WIDTH, 122, NAVY);
  brand(page, font, logo);
  drawText(page, font, `${t.countries}  /  ${String(pageNumber - 1).padStart(2, '0')}`, 45, 69, 10, LIME, 505);
  drawText(page, font, country.names[report.lang], 45, 84, 25, '#ffffff', 505);
  drawText(page, font, t.countryIntro, 45, 133, 10, MUTED, 505, 13);
  rectangle(page, 45, 171, 505, 72, PALE);
  drawText(page, font, t.tuition, 58, 181, 8, MUTED, 140);
  drawFitted(page, font, country.tuition[report.lang], 58, 194, 145, 2, 9.5, 8);
  drawText(page, font, t.living, 219, 181, 8, MUTED, 145);
  drawFitted(page, font, country.living[report.lang], 219, 194, 145, 2, 9.5, 8);
  drawText(page, font, t.grants, 381, 181, 8, MUTED, 150);
  drawFitted(page, font, country.grants[report.lang], 381, 194, 155, 3, 8.5, 7.5);
  universities.forEach(({ university, fields }, index) => {
    const x = index % 2 === 0 ? 45 : 306;
    const top = 259 + Math.floor(index / 2) * 85;
    const width = 244;
    rectangle(page, x, top, width, 77, PALE);
    rectangle(page, x, top, 3, 77, BLUE);
    drawFitted(page, font, university.name, x + 11, top + 7, width - 22, 2, 10, 8.5);
    drawText(page, font, `${t.fields}:`, x + 11, top + 38, 7.5, MUTED, width - 22);
    drawFitted(page, font, fields.map((field) => studyFields[field].label[report.lang]).join(' / '), x + 11, top + 49, width - 22, 2, 8.5, 7, BLUE);
  });
  footer(page, font, pageNumber, 8);
}

function drawAnswers(page, font, logo, report, t) {
  rectangle(page, 0, 0, PAGE_WIDTH, PAGE_HEIGHT, '#ffffff');
  rectangle(page, 0, 0, PAGE_WIDTH, 105, BLUE);
  brand(page, font, logo);
  drawText(page, font, t.answers, 45, 72, 22, '#ffffff', 505);
  drawText(page, font, t.answersIntro, 45, 115, 10, MUTED, 505, 13);
  questions.forEach((question, index) => {
    const column = index < 8 ? 0 : 1;
    const row = column === 0 ? index : index - 8;
    const x = column === 0 ? 45 : 307;
    const top = 157 + row * 78;
    const width = 243;
    drawText(page, font, String(index + 1).padStart(2, '0'), x, top, 10, BLUE, 25);
    drawFitted(page, font, question.prompt[report.lang], x + 29, top, width - 29, 3, 9.5, 8);
    const answer = question.options[report.answers[index]].text[report.lang];
    drawFitted(page, font, answer, x + 29, top + 39, width - 29, 3, 9.5, 8, NAVY);
    rule(page, x, top + 72, width);
  });
  footer(page, font, 8, 8);
}

export async function createCertificatePdf({ submission, scores, answers, lang = 'ru', fontBytes, logoBytes }) {
  const student = submission?.student;
  if (!student?.full_name || !student?.phone || questions.some((_, index) => !answers[index])) {
    throw new Error('Complete student details and all 15 answers are required');
  }
  const language = labels[lang] ? lang : 'ru';
  const [resolvedFont, resolvedLogo] = await Promise.all([
    fontBytes || fetch('/fonts/Onest-Variable.ttf').then((response) => response.arrayBuffer()),
    logoBytes || fetch('/consult-team-mark.png').then((response) => response.arrayBuffer()),
  ]);
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(resolvedFont, { subset: true });
  const logo = await doc.embedPng(resolvedLogo);
  const ranking = TYPE_ORDER.map((type) => ({ type, score: scores[type] || 0 }))
    .sort((a, b) => b.score - a.score || TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));
  const topTypes = ranking.slice(0, 3).map(({ type }) => type);
  const report = {
    student, answers, ranking, topTypes, code: topTypes.join(''), lang: language,
    total: ranking.reduce((sum, item) => sum + item.score, 0) || 1,
    date: new Intl.DateTimeFormat(language === 'ky' ? 'ky-KG' : language === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(submission.submittedAt || Date.now())),
  };
  const t = labels[language];
  doc.setTitle(`${t.certificate} - Consulteam - ${student.full_name}`);
  doc.setAuthor('Consulteam');
  doc.setSubject('RIASEC career orientation result and study options');
  const options = recommendations(topTypes);
  const pages = Array.from({ length: 8 }, () => doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]));
  drawCertificate(pages[0], font, logo, report, t);
  options.forEach((option, index) => drawDestinationPage(pages[index + 1], font, logo, report, t, index + 2, option));
  drawAnswers(pages[7], font, logo, report, t);
  return doc.save();
}

export async function downloadCertificatePdf(data) {
  const bytes = await createCertificatePdf(data);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Consulteam-RIASEC-${data.submission.student.full_name.replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 60)}.pdf`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
