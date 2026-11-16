import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

try {
  const { createCertificatePdf } = await server.ssrLoadModule('/src/certificatePdf.js');
  const { questions, TYPE_ORDER } = await server.ssrLoadModule('/src/content.js');
  const answers = Object.fromEntries(questions.map((question, index) => [index, question.order[index % question.order.length]]));
  const scores = Object.fromEntries(TYPE_ORDER.map((type) => [type, 0]));
  questions.forEach((question, index) => {
    Object.entries(question.options[answers[index]].scores).forEach(([type, value]) => { scores[type] += value; });
  });
  const fontBytes = await readFile('public/fonts/Onest-Variable.ttf');
  const logoBytes = await readFile('public/consult-team-mark.png');
  for (const lang of ['ru', 'ky', 'en']) {
    const bytes = await createCertificatePdf({
      submission: {
        student: {
          full_name: lang === 'ky' ? 'Айдана Өмүрбек кызы' : lang === 'ru' ? 'Александра Абдыкадырова' : 'Alexandra Abdykadyrova',
          phone: '+996700123456', email: 'student@example.com', school: 'Школа-гимназия № 78', grade: '11',
        },
        submittedAt: '2026-11-16T10:00:00.000Z',
      },
      scores, answers, lang, fontBytes, logoBytes,
    });
    const path = join(tmpdir(), `consulteam-certificate-${lang}.pdf`);
    await writeFile(path, bytes);
    console.log(`${lang}: ${path} (${bytes.length} bytes)`);
  }
} finally {
  await server.close();
}
