import { copyFileSync, mkdirSync } from 'node:fs';

const destinationIds = ['taiwan', 'italy', 'turkey', 'malaysia', 'china', 'czech'];
const routes = ['how-it-works', 'types', 'test', 'countries', 'universities', 'exams', ...destinationIds.map((id) => `countries/${id}`)];
copyFileSync('dist/index.html', 'dist/404.html');
for (const route of routes) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync('dist/index.html', `dist/${route}/index.html`);
}
