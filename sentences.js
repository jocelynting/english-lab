import { sentences } from './quiz.js';

function getRandomSentences(count = 5) {
  const allSentences = Object.keys(sentences);
  const randomSentences = [];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * allSentences.length);
    const uuid = allSentences.splice(index, 1)[0];
    randomSentences.push({
      id: uuid,
      sentence: {
        prefix: sentences[uuid].prefix,
        blanks: sentences[uuid].blanks,
        suffix: sentences[uuid].suffix,
      },
    });
  }
  return randomSentences;
}

function isValidSentence(id) {
  return sentences[id] !== undefined;
}

function checkSentence(id, answer, isAutoSubmit) {
  const correctAnswer = sentences[id].answer;

  const result = {
    id,
    sentence: {
      prefix: sentences[id].prefix,
      blanks: sentences[id].blanks,
      suffix: sentences[id].suffix,
    },
    isCorrect: isAutoSubmit ? false : correctAnswer === answer,
    answer: correctAnswer,
  };

  return result;
}

export default {
  getRandomSentences,
  isValidSentence,
  checkSentence,
};
