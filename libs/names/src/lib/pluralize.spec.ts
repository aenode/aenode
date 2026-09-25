import { describe, expect, it } from 'vitest';

import { pluralize } from './pluralize.js';

describe('pluralize', () => {
  describe('regular nouns', () => {
    it.each`
      singular      | plural
      ${'cat'}      | ${'cats'}
      ${'dog'}      | ${'dogs'}
      ${'book'}     | ${'books'}
      ${'car'}      | ${'cars'}
      ${'house'}    | ${'houses'}
      ${'table'}    | ${'tables'}
      ${'chair'}    | ${'chairs'}
      ${'computer'} | ${'computers'}
      ${'phone'}    | ${'phones'}
      ${'user'}     | ${'users'}
      ${'account'}  | ${'accounts'}
      ${'product'}  | ${'products'}
      ${'order'}    | ${'orders'}
      ${'customer'} | ${'customers'}
      ${'company'}  | ${'companies'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('consonant + y', () => {
    it.each`
      singular        | plural
      ${'city'}       | ${'cities'}
      ${'baby'}       | ${'babies'}
      ${'country'}    | ${'countries'}
      ${'company'}    | ${'companies'}
      ${'story'}      | ${'stories'}
      ${'family'}     | ${'families'}
      ${'party'}      | ${'parties'}
      ${'library'}    | ${'libraries'}
      ${'category'}   | ${'categories'}
      ${'factory'}    | ${'factories'}
      ${'query'}      | ${'queries'}
      ${'property'}   | ${'properties'}
      ${'identity'}   | ${'identities'}
      ${'activity'}   | ${'activities'}
      ${'repository'} | ${'repositories'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('vowel + y', () => {
    it.each`
      singular     | plural
      ${'boy'}     | ${'boys'}
      ${'toy'}     | ${'toys'}
      ${'key'}     | ${'keys'}
      ${'day'}     | ${'days'}
      ${'way'}     | ${'ways'}
      ${'journey'} | ${'journeys'}
      ${'valley'}  | ${'valleys'}
      ${'monkey'}  | ${'monkeys'}
      ${'donkey'}  | ${'donkeys'}
      ${'essay'}   | ${'essays'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('sibilant endings', () => {
    it.each`
      singular     | plural
      ${'bus'}     | ${'buses'}
      ${'class'}   | ${'classes'}
      ${'glass'}   | ${'glasses'}
      ${'dress'}   | ${'dresses'}
      ${'address'} | ${'addresses'}
      ${'box'}     | ${'boxes'}
      ${'fox'}     | ${'foxes'}
      ${'tax'}     | ${'taxes'}
      ${'dish'}    | ${'dishes'}
      ${'brush'}   | ${'brushes'}
      ${'wish'}    | ${'wishes'}
      ${'church'}  | ${'churches'}
      ${'branch'}  | ${'branches'}
      ${'watch'}   | ${'watches'}
      ${'match'}   | ${'matches'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('words ending in z', () => {
    it.each`
      singular  | plural
      ${'quiz'} | ${'quizzes'}
      ${'fez'}  | ${'fezzes'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('consonant + o', () => {
    it.each`
      singular      | plural
      ${'potato'}   | ${'potatoes'}
      ${'tomato'}   | ${'tomatoes'}
      ${'hero'}     | ${'heroes'}
      ${'echo'}     | ${'echoes'}
      ${'veto'}     | ${'vetoes'}
      ${'torpedo'}  | ${'torpedoes'}
      ${'mosquito'} | ${'mosquitoes'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('vowel + o exceptions', () => {
    it.each`
      singular    | plural
      ${'photo'}  | ${'photos'}
      ${'piano'}  | ${'pianos'}
      ${'radio'}  | ${'radios'}
      ${'video'}  | ${'videos'}
      ${'studio'} | ${'studios'}
      ${'zoo'}    | ${'zoos'}
      ${'kilo'}   | ${'kilos'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('f / fe endings', () => {
    it.each`
      singular   | plural
      ${'knife'} | ${'knives'}
      ${'wife'}  | ${'wives'}
      ${'life'}  | ${'lives'}
      ${'wolf'}  | ${'wolves'}
      ${'leaf'}  | ${'leaves'}
      ${'loaf'}  | ${'loaves'}
      ${'half'}  | ${'halves'}
      ${'calf'}  | ${'calves'}
      ${'shelf'} | ${'shelves'}
      ${'self'}  | ${'selves'}
      ${'thief'} | ${'thieves'}
      ${'elf'}   | ${'elves'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('irregular nouns', () => {
    it.each`
      singular    | plural
      ${'person'} | ${'people'}
      ${'man'}    | ${'men'}
      ${'woman'}  | ${'women'}
      ${'child'}  | ${'children'}
      ${'tooth'}  | ${'teeth'}
      ${'foot'}   | ${'feet'}
      ${'goose'}  | ${'geese'}
      ${'mouse'}  | ${'mice'}
      ${'ox'}     | ${'oxen'}
      ${'die'}    | ${'dice'}
      ${'louse'}  | ${'lice'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('classical irregular nouns', () => {
    it.each`
      singular         | plural
      ${'cactus'}      | ${'cacti'}
      ${'fungus'}      | ${'fungi'}
      ${'nucleus'}     | ${'nuclei'}
      ${'stimulus'}    | ${'stimuli'}
      ${'syllabus'}    | ${'syllabi'}
      ${'alumnus'}     | ${'alumni'}
      ${'focus'}       | ${'foci'}
      ${'radius'}      | ${'radii'}
      ${'analysis'}    | ${'analyses'}
      ${'basis'}       | ${'bases'}
      ${'crisis'}      | ${'crises'}
      ${'diagnosis'}   | ${'diagnoses'}
      ${'hypothesis'}  | ${'hypotheses'}
      ${'parenthesis'} | ${'parentheses'}
      ${'synthesis'}   | ${'syntheses'}
      ${'thesis'}      | ${'theses'}
      ${'criterion'}   | ${'criteria'}
      ${'phenomenon'}  | ${'phenomena'}
      ${'datum'}       | ${'data'}
      ${'medium'}      | ${'media'}
      ${'memorandum'}  | ${'memoranda'}
      ${'index'}       | ${'indices'}
      ${'matrix'}      | ${'matrices'}
      ${'vertex'}      | ${'vertices'}
      ${'appendix'}    | ${'appendices'}
      ${'axis'}        | ${'axes'}
      ${'bacterium'}   | ${'bacteria'}
      ${'curriculum'}  | ${'curricula'}
      ${'aquarium'}    | ${'aquaria'}
      ${'formula'}     | ${'formulae'}
      ${'antenna'}     | ${'antennae'}
      ${'alumna'}      | ${'alumnae'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('invariant nouns', () => {
    it.each`
      word
      ${'aircraft'}
      ${'bison'}
      ${'cod'}
      ${'deer'}
      ${'elk'}
      ${'fish'}
      ${'headquarters'}
      ${'moose'}
      ${'offspring'}
      ${'salmon'}
      ${'series'}
      ${'sheep'}
      ${'shrimp'}
      ${'species'}
      ${'swine'}
      ${'trout'}
    `('$word remains unchanged', ({ word }) => {
      expect(pluralize(word)).toBe(word);
    });
  });

  describe('uncountable nouns', () => {
    it.each`
      word
      ${'advice'}
      ${'air'}
      ${'bread'}
      ${'butter'}
      ${'cheese'}
      ${'clothing'}
      ${'coffee'}
      ${'equipment'}
      ${'furniture'}
      ${'information'}
      ${'knowledge'}
      ${'luggage'}
      ${'mail'}
      ${'money'}
      ${'music'}
      ${'news'}
      ${'progress'}
      ${'research'}
      ${'rice'}
      ${'software'}
      ${'traffic'}
      ${'transportation'}
      ${'water'}
      ${'weather'}
      ${'work'}
    `('$word remains unchanged', ({ word }) => {
      expect(pluralize(word)).toBe(word);
    });
  });

  describe('already plural words', () => {
    it.each`
      word
      ${'people'}
      ${'men'}
      ${'women'}
      ${'children'}
      ${'teeth'}
      ${'feet'}
      ${'geese'}
      ${'mice'}
      ${'oxen'}
      ${'dice'}
      ${'lice'}
      ${'cacti'}
      ${'fungi'}
      ${'analyses'}
      ${'criteria'}
      ${'phenomena'}
      ${'data'}
      ${'media'}
      ${'indices'}
      ${'matrices'}
      ${'aircraft'}
      ${'deer'}
      ${'fish'}
      ${'sheep'}
      ${'species'}
    `('$word remains unchanged', ({ word }) => {
      expect(pluralize(word)).toBe(word);
    });
  });

  describe('capitalization', () => {
    it.each`
      singular    | plural
      ${'Person'} | ${'People'}
      ${'PERSON'} | ${'PEOPLE'}
      ${'person'} | ${'people'}
      ${'Child'}  | ${'Children'}
      ${'CHILD'}  | ${'CHILDREN'}
      ${'Mouse'}  | ${'Mice'}
      ${'MOUSE'}  | ${'MICE'}
      ${'City'}   | ${'Cities'}
      ${'CITY'}   | ${'CITIES'}
      ${'Box'}    | ${'Boxes'}
      ${'BOX'}    | ${'BOXES'}
      ${'Knife'}  | ${'Knives'}
      ${'KNIFE'}  | ${'KNIVES'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('empty and short values', () => {
    it.each`
      word
      ${''}
      ${'a'}
      ${'i'}
    `('$word → expected plural behavior', ({ word }) => {
      expect(typeof pluralize(word)).toBe('string');
    });

    it('does not throw for an empty string', () => {
      expect(() => pluralize('')).not.toThrow();
    });
  });

  describe('case-sensitive mixed input', () => {
    it.each`
      singular      | plural
      ${'User'}     | ${'Users'}
      ${'Company'}  | ${'Companies'}
      ${'Category'} | ${'Categories'}
      ${'Person'}   | ${'People'}
      ${'Analysis'} | ${'Analyses'}
      ${'Child'}    | ${'Children'}
      ${'Mouse'}    | ${'Mice'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });

  describe('domain-oriented nouns', () => {
    it.each`
      singular        | plural
      ${'user'}       | ${'users'}
      ${'role'}       | ${'roles'}
      ${'permission'} | ${'permissions'}
      ${'resource'}   | ${'resources'}
      ${'scope'}      | ${'scopes'}
      ${'profile'}    | ${'profiles'}
      ${'session'}    | ${'sessions'}
      ${'token'}      | ${'tokens'}
      ${'project'}    | ${'projects'}
      ${'module'}     | ${'modules'}
      ${'plugin'}     | ${'plugins'}
      ${'database'}   | ${'databases'}
      ${'schema'}     | ${'schemas'}
      ${'controller'} | ${'controllers'}
      ${'service'}    | ${'services'}
      ${'repository'} | ${'repositories'}
      ${'query'}      | ${'queries'}
      ${'property'}   | ${'properties'}
      ${'entity'}     | ${'entities'}
      ${'index'}      | ${'indices'}
    `('$singular → $plural', ({ singular, plural }) => {
      expect(pluralize(singular)).toBe(plural);
    });
  });
});
