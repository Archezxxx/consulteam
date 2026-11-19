import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { questions, riasec, TYPE_ORDER, typePalette } from './content';
import { careerGroups } from './careerSuggestions';
import { careerExperiments } from './careerTrialData';

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
    date: 'Дата теста', profile: 'ПРОФИЛЬ ИНТЕРЕСОВ', types: 'Ведущие направления',
    scores: 'Результат по шести типам', careers: 'Профессии для изучения',
    trialTitle: 'Проверь профессию на практике',
    trialIntro: 'Попробуй небольшую задачу из повседневной работы. Выбери одну профессию и посмотри, нравится ли тебе сам процесс.',
    trialAction: 'ПОПРОБУЙ', reflection: 'После задания спроси себя',
    reflectionQuestions: ['Было ли интересно?', 'Хочется ли узнать больше?', 'Повторил бы я это ещё раз?'],
    disclaimer: 'Профориентационный результат показывает интересы. Он не является психологическим диагнозом или гарантией поступления.',
  },
  ky: {
    certificate: 'КҮБӨЛҮК', subtitle: 'кесипке багыт берүү тестинин жыйынтыгы', student: 'ОКУУЧУ',
    date: 'Тесттин датасы', profile: 'КЫЗЫГУУ ПРОФИЛИ', types: 'Негизги багыттар',
    scores: 'Алты тип боюнча жыйынтык', careers: 'Изилдеп көрө турган кесиптер',
    trialTitle: 'Кесипти иш жүзүндө сынап көр',
    trialIntro: 'Күнүмдүк иштин кичине бир бөлүгүн аткарып көр. Бир кесипти тандап, процесстин өзү сага жагаарын байка.',
    trialAction: 'СЫНАП КӨР', reflection: 'Тапшырмадан кийин өзүңө суроо бер',
    reflectionQuestions: ['Кызыктуу болдубу?', 'Дагы билгиң келдиби?', 'Муну кайра кылат белең?'],
    disclaimer: 'Бул жыйынтык кызыгууну көрсөтөт. Психологиялык диагноз же окууга кабыл алуу кепилдиги эмес.',
  },
  en: {
    certificate: 'CERTIFICATE', subtitle: 'career orientation test result', student: 'STUDENT',
    date: 'Test date', profile: 'INTEREST PROFILE', types: 'Leading directions',
    scores: 'All six interest types', careers: 'Careers to explore',
    trialTitle: 'Try a career in practice',
    trialIntro: 'Try a small part of the everyday work. Choose one career and notice whether you enjoy the process.',
    trialAction: 'TRY THIS', reflection: 'Afterwards, ask yourself',
    reflectionQuestions: ['Did I enjoy it?', 'Do I want to learn more?', 'Would I do it again?'],
    disclaimer: 'This result describes interests. It is not a psychological diagnosis or a guarantee of admission.',
  },
};

function pdfColor(hex) {
  const value = hex.replace('#', '');
  return rgb(...[0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16) / 255));
}

function wrap(font, value, size, maxWidth) {
  const words = String(value ?? '').trim().replace(/\s+/g, ' ').split(' ');
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

function brand(page, font, logo) {
  rectangle(page, 45, 29, 38, 38, '#ffffff');
  page.drawImage(logo, { x: 48, y: PAGE_HEIGHT - 64, width: 32, height: 32 });
  drawText(page, font, 'Consulteam', 94, 37, 18, '#ffffff', 300);
}

function footer(page, font, number) {
  rectangle(page, 45, 796, 505, 0.7, '#d5dfed');
  drawText(page, font, 'Consulteam  |  consulteam.edu.kg', 45, 807, 8.5, MUTED);
  drawText(page, font, `${number} / 2`, 515, 807, 8.5, MUTED, 35);
}

function drawCertificate(page, font, logo, report, t) {
  rectangle(page, 0, 0, PAGE_WIDTH, PAGE_HEIGHT, '#ffffff');
  rectangle(page, 0, 0, PAGE_WIDTH, 211, BLUE);
  brand(page, font, logo);
  drawText(page, font, 'RIASEC  /  15', 45, 94, 11, LIME);
  drawText(page, font, t.certificate, 45, 122, 40, '#ffffff', 505);
  drawText(page, font, t.subtitle, 45, 177, 17, '#ffffff', 505);

  drawText(page, font, t.student, 45, 229, 9, BLUE);
  drawFitted(page, font, report.student.full_name, 45, 246, 505, 2, 28, 14);
  rectangle(page, 45, 335, 505, 0.7, '#d5dfed');
  drawText(page, font, t.date.toUpperCase(), 45, 346, 8.5, MUTED);
  drawText(page, font, report.date, 45, 363, 11.5);

  rectangle(page, 45, 399, 505, 82, PALE);
  drawText(page, font, t.profile, 60, 413, 9, BLUE);
  drawText(page, font, report.code, 60, 425, 42, NAVY, 180);
  drawText(page, font, t.types, 250, 416, 9, MUTED);
  drawFitted(page, font, report.topTypes.map((type) => `${type} ${riasec[report.lang][type].name}`).join('  /  '), 250, 433, 276, 2, 12, 9.5);

  drawText(page, font, t.scores, 45, 494, 15);
  report.ranking.forEach(({ type, score }, index) => {
    const top = 519 + index * 16;
    rectangle(page, 45, top + 2, 14, 14, typePalette[type]);
    drawText(page, font, type, 49, top + 2, 9, INK, 10);
    drawText(page, font, riasec[report.lang][type].name, 69, top + 2, 10, INK, 135);
    rectangle(page, 224, top + 6, 270, 6, '#e4eaf4');
    rectangle(page, 224, top + 6, Math.max(2, (score / report.total) * 270), 6, typePalette[type]);
    drawText(page, font, `${Math.round((score / report.total) * 100)}%`, 502, top + 2, 10, NAVY, 44);
  });

  drawText(page, font, t.careers, 45, 629, 15);
  report.groups.forEach(({ type, name, careers }, index) => {
    const x = 45 + index * 173;
    rectangle(page, x, 655, 159, 97, PALE);
    rectangle(page, x, 655, 159, 4, typePalette[type]);
    drawFitted(page, font, `${type}  ${name}`, x + 11, 666, 137, 1, 11, 9, NAVY);
    careers.forEach(({ name: career }, careerIndex) => {
      rectangle(page, x + 11, 691 + careerIndex * 19, 4, 4, typePalette[type]);
      drawFitted(page, font, career, x + 22, 684 + careerIndex * 19, 125, 1, 10, 7.5);
    });
  });
  drawText(page, font, t.disclaimer, 45, 762, 8, MUTED, 505, 10);
  footer(page, font, 1);
}

function drawPracticePage(page, font, logo, report, t) {
  rectangle(page, 0, 0, PAGE_WIDTH, PAGE_HEIGHT, '#ffffff');
  rectangle(page, 0, 0, PAGE_WIDTH, 165, NAVY);
  brand(page, font, logo);
  drawText(page, font, 'RIASEC  /  02', 45, 88, 10, LIME);
  drawFitted(page, font, t.trialTitle, 45, 107, 505, 2, 28, 21, '#ffffff');
  drawText(page, font, t.trialIntro, 45, 178, 11, MUTED, 505, 15);

  careerExperiments(report.topTypes, report.lang).forEach(({ type, name, task }, index) => {
    const x = index % 2 === 0 ? 45 : 306;
    const top = 226 + Math.floor(index / 2) * 161;
    rectangle(page, x, top, 244, 151, PALE);
    rectangle(page, x, top, 244, 4, typePalette[type]);
    drawFitted(page, font, `${type}  ${name}`, x + 13, top + 14, 218, 2, 15, 11, NAVY);
    drawText(page, font, t.trialAction, x + 13, top + 53, 8, BLUE, 218);
    drawFitted(page, font, task, x + 13, top + 70, 218, 6, 10, 8.5);
  });

  rectangle(page, 45, 714, 505, 72, NAVY);
  drawText(page, font, t.reflection, 57, 722, 11, '#ffffff', 480);
  t.reflectionQuestions.forEach((question, index) => {
    const x = 57 + index * 163;
    drawFitted(page, font, question, x, 745, 150, 2, 9.5, 8, '#ffffff');
  });
  footer(page, font, 2);
}

export async function createCertificatePdf({ submission, scores, answers, lang = 'ru', fontBytes, logoBytes }) {
  const student = submission?.student;
  if (!student?.full_name || questions.some((_, index) => !answers[index])) {
    throw new Error('Student name and all 15 answers are required');
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
    student, ranking, topTypes, code: topTypes.join(''), lang: language,
    groups: careerGroups(topTypes, language),
    total: ranking.reduce((sum, item) => sum + item.score, 0) || 1,
    date: new Intl.DateTimeFormat(language === 'ky' ? 'ky-KG' : language === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(submission.submittedAt || Date.now())),
  };
  const t = labels[language];
  doc.setTitle(`${t.certificate} - Consulteam - ${student.full_name}`);
  doc.setAuthor('Consulteam');
  doc.setSubject('RIASEC career orientation result and practical career trials');
  drawCertificate(doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]), font, logo, report, t);
  drawPracticePage(doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]), font, logo, report, t);
  return doc.save();
}

export async function downloadCertificatePdf(data) {
  const bytes = await createCertificatePdf(data);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  anchor.download = `Consulteam-RIASEC-${data.submission.student.full_name.replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 60)}-${timestamp}.pdf`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
