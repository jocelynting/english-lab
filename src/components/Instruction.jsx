import { LAB_TYPES } from '../utils/constants';
import '../styles/Instruction.css';

function Instruction({ type, onLabStart, onLabQuit }) {
  const content = {
    [LAB_TYPES.WORDS]: {
      icon: '📖📖📖',
      title: 'Read and Select',
      description:
        'You will see a word on the screen. You will have to decide if the word is a real word in English.',
      time: '5 seconds',
      number: '10',
    },
    [LAB_TYPES.SENTENCES]: {
      icon: '📝📝📝',
      title: 'Fill in the Blanks',
      description:
        'You will see a sentence with an unfinished word and complete the sentence with the correct word.',
      time: '20 seconds',
      number: '5',
    },
  };

  function handleStart() {
    onLabStart();
  }

  function handleCancel() {
    onLabQuit();
  }

  return (
    <div className="lab__instructions">
      <p className="instruction__title">{content[type].title}</p>
      <p className="instruction__icon">{content[type].icon}</p>
      <p className="instruction__description">{content[type].description}</p>
      <div className="instruction__detail">
        <div className="detail__info">
          <p className="detail__title">time per question</p>
          <p className="detail__content">{content[type].time}</p>
        </div>
        <div className="detail__info">
          <p className="detail__title">questions</p>
          <p className="detail__content">{content[type].number}</p>
        </div>
      </div>
      <ul className="instruction__list">
        <li>Make sure you have a stable internet connection.</li>
        <li>
          Do not refresh the page during the quiz to avoid losing your progress.
        </li>
        <li>Answer all questions to the best of your ability.</li>
      </ul>
      <div className="instruction__buttons">
        <button className="button__cancel" onClick={() => handleCancel()}>
          Cancel
        </button>
        <button className="button__start" onClick={() => handleStart()}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Instruction;
