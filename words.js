import { words } from './quiz.js';

function getRandomWords(count = 10) {
  const allWords = Object.keys(words);
  const randomWords = [];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * allWords.length);
    const uuid = allWords.splice(index, 1)[0];
    randomWords.push({
      id: uuid,
      word: words[uuid].word,
    });
  }

  return randomWords;
}

function isValidWord(id) {
  return words[id] !== undefined;
}

function checkWord(id, answer, isAutoSubmit) {
  const correctAnswer = words[id].isValid;

  const result = {
    id,
    word: words[id].word,
    isCorrect: isAutoSubmit ? false : correctAnswer === answer,
    answer: words[id].isValid,
  };

  return result;
}

export default {
  getRandomWords,
  isValidWord,
  checkWord,
};
