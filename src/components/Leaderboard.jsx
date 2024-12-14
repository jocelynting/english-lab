function Leaderboard({ leaderboard }) {
  const getRankEmoji = (index) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      case 3:
        return '4️⃣';
      case 4:
        return '5️⃣';
      default:
        return '';
    }
  };

  return (
    <div className="lab__leaderboard">
      <p className="top5__title">Top 5</p>
      {leaderboard.map((user, index) => (
        <div key={index} className="top5__user">
          <p className="top5__rank">{getRankEmoji(index)}</p>
          <p className="top5__name">{user.username}</p>
          <p className="top5__score">{user.score}</p>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
