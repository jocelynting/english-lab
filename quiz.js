import { randomUUID as uuid } from 'crypto';

export const words = {
  [uuid()]: {
    word: 'bratwurst',
    isValid: true,
  },
  [uuid()]: {
    word: 'clubby',
    isValid: true,
  },
  [uuid()]: {
    word: 'cantance',
    isValid: false,
  },
  [uuid()]: {
    word: 'racing',
    isValid: true,
  },
  [uuid()]: {
    word: 'nound',
    isValid: false,
  },
  [uuid()]: {
    word: 'goalie',
    isValid: true,
  },
  [uuid()]: {
    word: 'conjunctions',
    isValid: true,
  },
  [uuid()]: {
    word: 'pumms',
    isValid: false,
  },
  [uuid()]: {
    word: 'rugnal',
    isValid: false,
  },
  [uuid()]: {
    word: 'diagonized',
    isValid: false,
  },
  [uuid()]: {
    word: 'scientists',
    isValid: true,
  },
  [uuid()]: {
    word: 'foods',
    isValid: true,
  },
  [uuid()]: {
    word: 'documents',
    isValid: true,
  },
  [uuid()]: {
    word: 'baletine',
    isValid: false,
  },
  [uuid()]: {
    word: 'evaluators',
    isValid: true,
  },
  [uuid()]: {
    word: 'canoine',
    isValid: false,
  },
  [uuid()]: {
    word: 'intuiting',
    isValid: true,
  },
  [uuid()]: {
    word: 'pefy',
    isValid: false,
  },
  [uuid()]: {
    word: 'pastured',
    isValid: true,
  },
  [uuid()]: {
    word: 'demolished',
    isValid: true,
  },
  [uuid()]: {
    word: 'behavioral',
    isValid: true,
  },
  [uuid()]: {
    word: 'impise',
    isValid: false,
  },
  [uuid()]: {
    word: 'remict',
    isValid: false,
  },
  [uuid()]: {
    word: 'judging',
    isValid: true,
  },
  [uuid()]: {
    word: 'typed',
    isValid: true,
  },
  [uuid()]: {
    word: 'cleaka',
    isValid: false,
  },
  [uuid()]: {
    word: 'negration',
    isValid: false,
  },
  [uuid()]: {
    word: 'incurled',
    isValid: false,
  },
  [uuid()]: {
    word: 'supportable',
    isValid: true,
  },
  [uuid()]: {
    word: 'elixirs',
    isValid: true,
  },
};

export const sentences = {
  [uuid()]: {
    prefix:
      'Waking up to the sound of birds outside my window really puts in a good ',
    blanks: [
      { char: 'm', isBlank: false },
      { char: 'o', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: ' for the rest of the day.',
    answer: 'mood',
  },
  [uuid()]: {
    prefix: 'I got up really ',
    blanks: [
      { char: 'e', isBlank: false },
      { char: 'a', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: " this morning, so I'm feeling quite sleepy now.",
    answer: 'early',
  },
  [uuid()]: {
    prefix:
      "With its unconventional architecture and whimsical colors, the architect's work is often described as ",
    blanks: [
      { char: 'w', isBlank: false },
      { char: 'e', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: ' yet captivating.',
    answer: 'weird',
  },
  [uuid()]: {
    prefix: 'University students often run into the ',
    blanks: [
      { char: 'p', isBlank: false },
      { char: 'r', isBlank: false },
      { char: 'o', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: ' of balancing homework and part-time jobs.',
    answer: 'problem',
  },
  [uuid()]: {
    prefix: 'A stream during a long hike is a perfect place to ',
    blanks: [
      { char: 'f', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: ' your water bottle with water.',
    answer: 'fill',
  },
  [uuid()]: {
    prefix: 'He ',
    blanks: [
      { char: 'g', isBlank: false },
      { char: 'l', isBlank: false },
      { char: 'a', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix:
      ' briefly at his watch and realized that he was late for an appointment.',
    answer: 'glanced',
  },
  [uuid()]: {
    prefix: 'Scientifically speaking, a rainbow is ',
    blanks: [
      { char: 'm', isBlank: false },
      { char: 'e', isBlank: false },
      { char: 'r', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix:
      ' a refraction and dispersion of sunlight by rain or other water droplets.',
    answer: 'merely',
  },
  [uuid()]: {
    prefix: 'After the marathon, she felt completely ',
    blanks: [
      { char: 's', isBlank: false },
      { char: 'p', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix:
      ' , barely able to muster the energy to celebrate her accomplishment.',
    answer: 'spent',
  },
  [uuid()]: {
    prefix: 'In evaluating an ',
    blanks: [
      { char: 'e', isBlank: false },
      { char: 's', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix:
      ' , the professor will often look for clarity of argument and evidence of critical thinking.',
    answer: 'essay',
  },
  [uuid()]: {
    prefix: 'Exposure to a ',
    blanks: [
      { char: 'd', isBlank: false },
      { char: 'i', isBlank: false },
      { char: 'v', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix:
      ' group of friends helps gain a broader understanding of the world.',
    answer: 'diverse',
  },
  [uuid()]: {
    prefix: 'Some students take the time to ',
    blanks: [
      { char: 'p', isBlank: false },
      { char: 'e', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix:
      ' the additional resources while others barely skim assigned readings.',
    answer: 'peruse',
  },
  [uuid()]: {
    prefix: 'To prevent them from spoiling, perishable goods must be ',
    blanks: [
      { char: 'q', isBlank: false },
      { char: 'u', isBlank: false },
      { char: 'i', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: ' transported from the production site to retail outlets.',
    answer: 'quickly',
  },
  [uuid()]: {
    prefix: 'A student ',
    blanks: [
      { char: 'r', isBlank: false },
      { char: 'a', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: ' their hand and asked a question to the teacher.',
    answer: 'raised',
  },
  [uuid()]: {
    prefix: 'Over time, animals have had to ',
    blanks: [
      { char: 'a', isBlank: false },
      { char: 'd', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: ' to the changing environme to survive.',
    answer: 'adapt',
  },
  [uuid()]: {
    prefix: 'After an intense all-day training, they left the room feeling ',
    blanks: [
      { char: 'w', isBlank: false },
      { char: 'e', isBlank: false },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
      { char: '', isBlank: true },
    ],
    suffix: ' but content.',
    answer: 'weary',
  },
};
