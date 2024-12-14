import '../styles/Complete.css';

function Complete({ onPracticeMore, onLabQuit }) {
  function handlePracticeMore() {
    onPracticeMore();
  }

  function handleDone() {
    onLabQuit();
  }

  return (
    <div className="lab__complete">
      <p className="complete__content">Practice Complete!</p>
      <p className="complete__icon">🥳🥳🥳</p>
      <div className="complete__buttons">
        <button className="button__more" onClick={() => handlePracticeMore()}>
          Practice More
        </button>
        <button className="button__done" onClick={() => handleDone()}>
          Done
        </button>
      </div>
    </div>
  );
}

export default Complete;
