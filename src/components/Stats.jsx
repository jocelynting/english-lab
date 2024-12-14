import Leaderboard from './Leaderboard';
import { LAB_TYPES } from '../utils/constants';
import '../styles/Stats.css';

function Stats({
  username,
  theme,
  stats,
  leaderboard,
  onSelectLabType,
  onTheme,
  onLogout,
}) {
  const isBlank = Object.keys(stats).length === 0;

  function handleLabSelection(type) {
    onSelectLabType(type);
  }

  function handleTheme() {
    onTheme();
  }

  function handleLogout() {
    onLogout();
  }

  return (
    <div className="lab">
      <div className="lab__header">
        <p className="lab__title">Welcome, {username}!</p>
        <div className="lab__header-buttons">
          <button className="lab__theme" onClick={() => handleTheme()}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="lab__logout" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
      <Leaderboard leaderboard={leaderboard} />
      {isBlank ? (
        <p className="lab__blank">No stats available</p>
      ) : (
        <div className="lab__stats">
          <p className="stats__title">Performance Overview</p>
          <p className="stats__score">
            💯 Score: {stats.score} | 📈 Rank: {stats.rank}
          </p>
          <div className="stats__detail">
            <div className="stats__info">
              <p className="stats__type">📖 Read and Select</p>
              <p className="stats__content">
                &#10004; Correct: {stats.words.correct}
              </p>
              <p className="stats__content">
                &#10008; Incorrect: {stats.words.incorrect}
              </p>
              <button
                className="lab__button"
                onClick={() => handleLabSelection(LAB_TYPES.WORDS)}
              >
                Practice
              </button>
            </div>
            <div className="stats__info">
              <p className="stats__type">📝 Fill in the Blanks</p>
              <p className="stats__content">
                &#10004; Correct: {stats.sentences.correct}
              </p>
              <p className="stats__content">
                &#10008; Incorrect: {stats.sentences.incorrect}
              </p>
              <button
                className="lab__button"
                onClick={() => handleLabSelection(LAB_TYPES.SENTENCES)}
              >
                Practice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;
