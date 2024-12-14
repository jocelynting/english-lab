import { useState, useEffect, useRef } from 'react';

function Sentences({ quiz, inputDisabled, onInputChange, onUserInputChange }) {
  const [userInputs, setUserInputs] = useState(
    quiz.sentence.blanks.map((blank) => (blank.isBlank ? '' : blank.char))
  );
  const inputRefs = useRef([]);

  useEffect(() => {
    setUserInputs(
      quiz.sentence.blanks.map((blank) => (blank.isBlank ? '' : blank.char))
    );

    const firstInput = inputRefs.current.find(
      (_, index) => quiz.sentence.blanks[index].isBlank
    );
    if (firstInput) {
      firstInput.focus();
    }
  }, [quiz]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, userInputs.length);
  }, [userInputs]);

  useEffect(() => {
    const isFilled = userInputs.some(
      (input, index) =>
        quiz.sentence.blanks[index].isBlank && input.trim() !== ''
    );
    onInputChange(isFilled);
    onUserInputChange(userInputs);
  }, [userInputs, onInputChange, onUserInputChange, quiz.sentence.blanks]);

  function handleInputChange(e, index) {
    const value = e.target.value;

    setUserInputs((prevInputs) =>
      prevInputs.map((input, i) => {
        if (i === index) {
          return value;
        }
        return input;
      })
    );

    if (value.length === 1 && index < userInputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === 'Backspace' && index > 0 && userInputs[index] === '') {
      setUserInputs((prevInputs) =>
        prevInputs.map((input, i) => {
          if (i === index - 1 && quiz.sentence.blanks[i].isBlank) {
            return '';
          }
          return input;
        })
      );

      if (quiz.sentence.blanks[index - 1].isBlank) {
        inputRefs.current[index - 1].focus();
      }
    }
  }

  return (
    <div className="sentences">
      <span className="sentences__content">
        <span className="sentences__prefix">{quiz.sentence.prefix}</span>
        <span className="sentences__blanks">
          {quiz.sentence.blanks.map((blank, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="sentences__blank"
              type="text"
              value={userInputs[index] || ''}
              disabled={!blank.isBlank || inputDisabled}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
            />
          ))}
        </span>
        <span className="sentences__suffix">{quiz.sentence.suffix}</span>
      </span>
    </div>
  );
}

export default Sentences;
