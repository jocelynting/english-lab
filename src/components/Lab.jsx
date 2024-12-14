import { useState, useEffect, useCallback } from 'react';
import { LAB_TYPES, LAB_TIMER } from '../utils/constants';
import { formatTime } from '../utils/utils';
import Words from './Words';
import Sentences from './Sentences';
import '../styles/Lab.css';

function Lab({ type, quiz, result, onCheckQuiz, onLabComplete, onLabQuit }) {
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(LAB_TIMER[type]);
  const [timerActive, setTimerActive] = useState(true);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [userInputs, setUserInputs] = useState([]);
  const [selected, setSelected] = useState(null);

  const tip =
    type === LAB_TYPES.WORDS
      ? 'Is this a real English word?'
      : 'Complete the sentence with the correct word.';

  const resultClass =
    result !== null && result.isCorrect
      ? 'info__result correct'
      : 'info__result incorrect';
  const resultContent =
    result !== null && result.isCorrect
      ? '✅ Great job!'
      : type === LAB_TYPES.WORDS
      ? `❌ Incorrect! Correct answer: ${result.answer ? 'Yes' : 'No'}`
      : `❌ Incorrect! Correct answer: ${result.answer}`;
  const resultButtonClass =
    result !== null && result.isCorrect
      ? 'result__next correct'
      : 'result__next incorrect';

  const handleCheckQuiz = useCallback(
    (id, answer, isAutoSubmit = false) => {
      onCheckQuiz(id, answer, isAutoSubmit);
      setTimerActive(false);
    },
    [onCheckQuiz]
  );

  useEffect(() => {
    if (Object.keys(result).length > 0) {
      setShowResult(true);
    }
  }, [result]);

  useEffect(() => {
    if (time === 0 && timerActive) {
      handleCheckQuiz(quiz[index].id, false, true);
      return;
    }

    if (timerActive) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [time, timerActive, handleCheckQuiz, quiz, index]);

  function handleQuit() {
    onLabQuit();
  }

  function handleNext() {
    if (index === quiz.length - 1) {
      onLabComplete();
      return;
    }

    setIndex((prevIndex) => prevIndex + 1);
    setShowResult(false);
    setTime(LAB_TIMER[type]);
    setTimerActive(true);
    setIsInputFilled(false);
    setUserInputs([]);
    setSelected(null);
  }

  function handleInputChange(isFilled) {
    setIsInputFilled(isFilled);
  }

  function handleUserInputChange(inputs) {
    setUserInputs(inputs);
  }

  function handleUserInputAnswer() {
    const answer = userInputs.join('');
    handleCheckQuiz(quiz[index].id, answer);
  }

  return (
    <div className="lab__info">
      <div className="info__header">
        <p className="info__time">{formatTime(time)}</p>
        <button className="info__quit" onClick={handleQuit}>
          Quit
        </button>
      </div>
      <p className="info__tip">{tip}</p>
      {type === LAB_TYPES.WORDS ? (
        <Words
          quiz={quiz[index]}
          onCheckQuiz={handleCheckQuiz}
          buttonEnabled={!showResult}
          selected={selected}
          setSelected={setSelected}
        />
      ) : (
        <Sentences
          quiz={quiz[index]}
          inputDisabled={showResult}
          onInputChange={handleInputChange}
          onUserInputChange={handleUserInputChange}
        />
      )}
      {type === LAB_TYPES.SENTENCES && !showResult && (
        <button
          className="info__submit"
          onClick={() => handleUserInputAnswer()}
          disabled={!isInputFilled}
        >
          Submit
        </button>
      )}
      {showResult && (
        <div className={resultClass}>
          <p className="result__content">{resultContent}</p>
          <button className={resultButtonClass} onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Lab;
