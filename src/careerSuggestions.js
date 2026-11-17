import { riasec } from './content';

export function careerGroups(topTypes, lang, countPerType = 3) {
  const language = riasec[lang] ? lang : 'ru';
  const seen = new Set();
  return topTypes.map((type) => {
    const profile = riasec[language][type];
    const careers = profile.careers
      .map((name, index) => ({ name, index }))
      .filter(({ name }) => !seen.has(name.toLocaleLowerCase(language)))
      .slice(0, countPerType);
    careers.forEach(({ name }) => seen.add(name.toLocaleLowerCase(language)));
    return { type, name: profile.name, careers };
  });
}
