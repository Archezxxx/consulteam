import { copyFileSync, mkdirSync } from 'node:fs';

const routes = ['how-it-works', 'types', 'test', 'countries', 'exams'];
copyFileSync('dist/index.html', 'dist/404.html');
for (const route of routes) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync('dist/index.html', `dist/${route}/index.html`);
}
