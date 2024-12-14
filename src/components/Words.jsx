function Words({ quiz, onCheckQuiz, buttonEnabled, selected, setSelected }) {
  function handleCheckWord(answer) {
    if (!buttonEnabled) {
      return;
    }
    setSelected(answer);
    onCheckQuiz(quiz.id, answer);
  }

  return (
    <div className="words">
      <p className="words__word">{quiz.word}</p>
      <div className="words__buttons">
        <button
          className={`words__button ${selected === true ? 'selected' : ''}`}
          onClick={() => {
            handleCheckWord(true);
          }}
        >
          <span className="words__button-icon">&#10004;</span>Yes
        </button>
        <button
          className={`words__button ${selected === false ? 'selected' : ''}`}
          onClick={() => {
            handleCheckWord(false);
          }}
        >
          <span className="words__button-icon">&#10008;</span>No
        </button>
      </div>
    </div>
  );
}

export default Words;
