const IRREGULAR: Record<string, string> = {
  person: 'people',
  man: 'men',
  woman: 'women',
  child: 'children',
  tooth: 'teeth',
  foot: 'feet',
  goose: 'geese',
  mouse: 'mice',
  ox: 'oxen',

  die: 'dice',
  louse: 'lice',
  cactus: 'cacti',
  fungus: 'fungi',
  nucleus: 'nuclei',
  stimulus: 'stimuli',
  syllabus: 'syllabi',
  alumnus: 'alumni',
  focus: 'foci',
  radius: 'radii',

  analysis: 'analyses',
  basis: 'bases',
  crisis: 'crises',
  diagnosis: 'diagnoses',
  hypothesis: 'hypotheses',
  parenthesis: 'parentheses',
  synthesis: 'syntheses',
  thesis: 'theses',

  criterion: 'criteria',
  phenomenon: 'phenomena',
  datum: 'data',
  medium: 'media',
  memorandum: 'memoranda',

  index: 'indices',
  matrix: 'matrices',
  vertex: 'vertices',
  appendix: 'appendices',
  axis: 'axes',

  bacterium: 'bacteria',
  curriculum: 'curricula',
  aquarium: 'aquaria',

  formula: 'formulae',
  antenna: 'antennae',
  alumna: 'alumnae',

  knife: 'knives',
  wife: 'wives',
  life: 'lives',
  wolf: 'wolves',
  loaf: 'loaves',
  leaf: 'leaves',
  half: 'halves',
  calf: 'calves',
  shelf: 'shelves',
  self: 'selves',
  thief: 'thieves',
  elf: 'elves',

  potato: 'potatoes',
  tomato: 'tomatoes',
  hero: 'heroes',
  echo: 'echoes',
  veto: 'vetoes',

  quiz: 'quizzes',

  photo: 'photos',
  piano: 'pianos',
  kilo: 'kilos',
};

const UNCOUNTABLE = new Set([
  'advice',
  'air',
  'bread',
  'butter',
  'cheese',
  'clothing',
  'coffee',
  'equipment',
  'furniture',
  'information',
  'knowledge',
  'luggage',
  'mail',
  'money',
  'music',
  'news',
  'progress',
  'research',
  'rice',
  'software',
  'traffic',
  'transportation',
  'water',
  'weather',
  'work',
]);

const INVARIANT = new Set([
  'aircraft',
  'bison',
  'cod',
  'deer',
  'elk',
  'fish',
  'headquarters',
  'moose',
  'offspring',
  'salmon',
  'series',
  'sheep',
  'shrimp',
  'species',
  'swine',
  'trout',
]);

const IRREGULAR_REVERSE = new Map(
  Object.entries(IRREGULAR).map(([singular, plural]) => [plural, singular]),
);

function preserveCase(source: string, result: string): string {
  if (source === source.toUpperCase()) {
    return result.toUpperCase();
  }

  if (
    source.length > 0 &&
    source[0] === source[0]?.toUpperCase() &&
    source.slice(1) === source.slice(1).toLowerCase()
  ) {
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

export function pluralize(word: string): string {
  if (!word) {
    return preserveCase(word, word);
  }

  const lower = word.toLowerCase();

  // Already an irregular plural.
  if (IRREGULAR_REVERSE.has(lower)) {
    return preserveCase(word, word);
  }

  // Uncountable nouns do not have a normal plural.
  if (UNCOUNTABLE.has(lower)) {
    return preserveCase(word, word);
  }

  // Singular/plural are identical.
  if (INVARIANT.has(lower)) {
    return preserveCase(word, word);
  }

  // Irregular nouns.
  const irregular = IRREGULAR[lower];

  if (irregular) {
    return preserveCase(word, irregular);
  }

  // Words ending in consonant + y:
  // city -> cities
  // baby -> babies
  if (/[^aeiou]y$/.test(lower)) {
    return preserveCase(word, word.slice(0, -1) + 'ies');
  }

  // Words ending in vowel + y:
  // boy -> boys
  // key -> keys
  if (/[aeiou]y$/.test(lower)) {
    return preserveCase(word, word + 's');
  }

  // Words ending in sibilant sounds.
  // bus -> buses
  // class -> classes
  // dish -> dishes
  // church -> churches
  // box -> boxes
  // quiz -> quizzes
  if (/(s|x|z|ch|sh)$/.test(lower)) {
    if (lower.endsWith('z')) {
      return preserveCase(word, word + 'zes');
    }

    return preserveCase(word, word + 'es');
  }

  // Words ending in consonant + o.
  // potato -> potatoes
  // tomato -> tomatoes
  // hero -> heroes
  //
  // But:
  // photo -> photos
  // piano -> pianos
  // kilo -> kilos
  if (/[^aeiou]o$/.test(lower)) {
    return preserveCase(word, word + 'es');
  }

  // Words ending in consonant + f / fe.
  // wolf -> wolves
  // knife -> knives
  //
  // Some exceptions are handled by IRREGULAR.
  if (/fe$/.test(lower)) {
    return preserveCase(word, word.slice(0, -2) + 'ves');
  }

  if (/[^aeiou]f$/.test(lower)) {
    return preserveCase(word, word.slice(0, -1) + 'ves');
  }

  // Default English plural.
  return preserveCase(word, word + 's');
}
