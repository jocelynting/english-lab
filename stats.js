const stats = {
  luigi: {
    words: {
      correct: 2,
      incorrect: 1,
    },
    sentences: {
      correct: 1,
      incorrect: 0,
    },
    score: 35,
  },
  mario: {
    words: {
      correct: 3,
      incorrect: 0,
    },
    sentences: {
      correct: 2,
      incorrect: 1,
    },
    score: 65,
  },
  toad: {
    words: {
      correct: 1,
      incorrect: 0,
    },
    sentences: {
      correct: 0,
      incorrect: 1,
    },
    score: 5,
  },
  peach: {
    words: {
      correct: 1,
      incorrect: 1,
    },
    sentences: {
      correct: 1,
      incorrect: 1,
    },
    score: 20,
  },
};

function initialUserStats(username) {
  stats[username] = {
    words: {
      correct: 0,
      incorrect: 0,
    },
    sentences: {
      correct: 0,
      incorrect: 0,
    },
    score: 0,
  };
}

function updateStats(username, type, isCorrect) {
  if (!stats[username]) {
    initialUserStats(username);
  }

  if (type === 'word') {
    if (isCorrect) {
      stats[username].words.correct += 1;
      stats[username].score += 10;
    } else {
      stats[username].words.incorrect += 1;
      stats[username].score -= 5;
    }
  }

  if (type === 'sentence') {
    if (isCorrect) {
      stats[username].sentences.correct += 1;
      stats[username].score += 20;
    } else {
      stats[username].sentences.incorrect += 1;
      stats[username].score -= 5;
    }
  }

  if (stats[username].score < 0) {
    stats[username].score = 0;
  }
}

function getStats(username) {
  if (!stats[username]) {
    initialUserStats(username);
  }
  const leaderboard = calculateLeaderboard();
  const userStats = stats[username];
  const currentUser = leaderboard.find((user) => user.username === username);
  const statsWithRank = {
    ...userStats,
    rank: currentUser.rank,
  };
  return statsWithRank;
}

function getLeaderboard() {
  const leaderboard = calculateLeaderboard();

  const top5 = leaderboard.slice(0, 5);

  return top5;
}

function calculateLeaderboard() {
  return Object.keys(stats)
    .map((username) => ({
      username,
      score: stats[username].score,
    }))
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
}

export default {
  updateStats,
  getStats,
  getLeaderboard,
};
