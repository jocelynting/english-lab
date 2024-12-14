import express from 'express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import sessions from './sessions.js';
import users from './users.js';
import words from './words.js';
import sentences from './sentences.js';
import stats from './stats.js';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// sessions
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (!users.isPermitted(username)) {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  res.cookie('sid', sid);

  const userStats = stats.getStats(username);
  const leaderboard = stats.getLeaderboard();

  res.json({ username, stats: userStats, leaderboard });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ wasLoggedIn: !!username });
});

// stats
app.get('/api/v1/stats', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userStats = stats.getStats(username);

  res.json({ stats: userStats });
});

app.get('/api/v1/leaderboard', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const leaderboard = stats.getLeaderboard();

  res.json({ leaderboard });
});

// words
app.get('/api/v1/words', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const randomWords = words.getRandomWords();

  res.json({ words: randomWords });
});

app.post('/api/v1/words/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const { answer, isAutoSubmit } = req.body;

  if (!id || !words.isValidWord(id)) {
    res.status(400).json({ error: 'quiz-not-exist' });
    return;
  }

  const result = words.checkWord(id, answer, isAutoSubmit);
  stats.updateStats(username, 'word', result.isCorrect);

  res.json({ result });
});

// sentences
app.get('/api/v1/sentences', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const randomSentences = sentences.getRandomSentences();

  res.json({ sentences: randomSentences });
});

app.post('/api/v1/sentences/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const { answer, isAutoSubmit } = req.body;

  if (!id || !sentences.isValidSentence(id)) {
    res.status(400).json({ error: 'quiz-not-exist' });
    return;
  }

  const result = sentences.checkSentence(id, answer, isAutoSubmit);
  stats.updateStats(username, 'sentence', result.isCorrect);

  res.json({ result });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
