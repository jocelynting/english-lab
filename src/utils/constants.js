export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const PAGES = {
  LOGIN: '/',
  LAB: '/lab',
  INSTRUCTION: '/instruction',
  WORDS: '/words',
  SENTENCES: '/sentences',
  COMPLETE: '/complete',
};

export const ACTIONS = {
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
  NAVIGATE: 'navigate',
  TOGGLE_THEME: 'toggleTheme',
  START_LOADING: 'startLoading',
  SET_LAB_TYPE: 'labType',
  DATA_LOADING: 'dataLoading',
  FETCH_STATS: 'fetchStats',
  FETCH_LEADERBOARD: 'fetchLeaderboard',
  FETCH_WORDS: 'fetchWords',
  FETCH_CHECK_WORDS: 'fetchCheckWords',
  FETCH_SENTENCES: 'fetchSentences',
  FETCH_CHECK_SENTENCES: 'fetchCheckSentences',
  RESET_LAB: 'resetLab',
  REPORT_ERROR: 'reportError',
};

export const LAB_TYPES = {
  WORDS: 'words',
  SENTENCES: 'sentences',
};

export const LAB_TIMER = {
  [LAB_TYPES.WORDS]: 10,
  [LAB_TYPES.SENTENCES]: 20,
  default: 10,
};

export const POLLING_DELAY = 2000;

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  UNKNOWN_ACTION: 'unknownAction',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  INVAILD_QUIZ: 'quiz-not-exist',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    'Trouble connecting to the network.  Please try again',
  [SERVER.AUTH_MISSING]: 'Authentication is missing. Please log in again.',
  [SERVER.AUTH_INSUFFICIENT]:
    'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]:
    'Please enter a valid (letters and/or numbers) username.',
  [SERVER.INVAILD_QUIZ]: 'Quiz is not exist.',
  default: 'Something went wrong. Please try again.',
};
