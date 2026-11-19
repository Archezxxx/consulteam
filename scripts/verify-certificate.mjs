import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { PDFDocument } from 'pdf-lib';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

try {
  const { createCertificatePdf } = await server.ssrLoadModule('/src/certificatePdf.js');
  const { countries, questions, TYPE_ORDER } = await server.ssrLoadModule('/src/content.js');
  const { studyUniversities, universitiesForCountry } = await server.ssrLoadModule('/src/studyCatalog.js');
  const answers = Object.fromEntries(questions.map((question, index) => [index, question.order[index % question.order.length]]));
  const scores = Object.fromEntries(TYPE_ORDER.map((type) => [type, 0]));
  questions.forEach((question, index) => {
    Object.entries(question.options[answers[index]].scores).forEach(([type, value]) => { scores[type] += value; });
  });
  const fontBytes = await readFile('public/fonts/Onest-Variable.ttf');
  const logoBytes = await readFile('public/consult-team-mark.png');
  const universityPhotos = Object.fromEntries(await Promise.all(studyUniversities.map(async ({ id }) =>
    [id, await readFile(`public/certificate/universities/${id}.jpg`)])));
  const expectedPages = 2 + countries.reduce((sum, country) =>
    sum + Math.ceil(universitiesForCountry(country.id).length / 3), 0)
    + Math.ceil(questions.length / 8);
  for (const lang of ['ru', 'ky', 'en']) {
    for (const variant of ['standard', 'alternate']) {
      const testScores = variant === 'standard' ? scores : { R: 3, I: 30, A: 2, S: 4, E: 25, C: 20 };
      const bytes = await createCertificatePdf({
        submission: {
          student: {
            full_name: lang === 'ky' ? 'Айдана Өмүрбек кызы' : lang === 'ru' ? 'Александра Абдыкадырова' : 'Alexandra Abdykadyrova',
            phone: '+996700123456', email: variant === 'standard' ? 'student@example.com' : '',
            school: variant === 'standard' ? 'Школа-гимназия № 78' : '',
            grade: variant === 'standard' ? '11' : '',
          },
          submittedAt: '2026-11-16T10:00:00.000Z',
        },
        scores: testScores, answers, lang, fontBytes, logoBytes, universityPhotos,
      });
      const pdf = await PDFDocument.load(bytes);
      if (pdf.getPageCount() !== expectedPages) throw new Error(`${lang}/${variant}: expected ${expectedPages} pages, got ${pdf.getPageCount()}`);
      const path = join(tmpdir(), `consulteam-certificate-${lang}-${variant}.pdf`);
      await writeFile(path, bytes);
      console.log(`${lang}/${variant}: ${path} (${bytes.length} bytes)`);
    }
  }
} finally {
  await server.close();
}
