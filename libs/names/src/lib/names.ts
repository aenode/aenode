import { normalizeName } from './normalize-name.js';

export type Names = {
  camel: string;
  pascal: string;
  kebab: string;
  snake: string;
  constant: string;
  title: string;
  sentence: string;
};

function uppercaseFirst(name: string) {
  return name[0].toUpperCase() + name.slice(1);
}
function lowercaseFirst(name: string) {
  return name[0].toLowerCase() + name.slice(1);
}
export function names(name: string): Names {
  name = normalizeName(name);

  const pascal = name
    .split('-')
    .map((e) => uppercaseFirst(e))
    .join('');

  const camel = lowercaseFirst(pascal);

  const snake = name.replace(/-/g, '_');
  const constant = snake.toUpperCase();

  const sentence = uppercaseFirst(name.split('-').join(' '));

  const title = name
    .split('-')
    .map((e) => uppercaseFirst(e))
    .join(' ');

  return {
    kebab: name,
    pascal,
    camel,
    snake,
    constant,
    sentence,
    title,
  };
}
