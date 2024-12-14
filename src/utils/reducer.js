import {
  LOGIN_STATUS,
  PAGES,
  ACTIONS,
  CLIENT,
  LAB_TYPES,
} from '../utils/constants';

export const initialState = {
  loginStatus: LOGIN_STATUS.PENDING,
  page: PAGES.LOGIN,
  theme: 'light',
  username: '',
  lab: LAB_TYPES.WORDS,
  dataLoading: false,
  stats: {},
  leaderboard: [],
  quiz: [],
  result: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
        page: PAGES.LAB,
        error: '',
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: '',
        page: PAGES.LOGIN,
        error: '',
      };

    case ACTIONS.NAVIGATE:
      return {
        ...state,
        page: action.page,
        error: '',
      };

    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
        error: '',
      };

    case ACTIONS.START_LOADING:
      return {
        ...state,
        loginStatus: LOGIN_STATUS.PENDING,
        error: '',
      };

    case ACTIONS.DATA_LOADING:
      return {
        ...state,
        dataLoading: action.loading,
        error: '',
      };

    case ACTIONS.FETCH_STATS:
      return {
        ...state,
        stats: action.stats,
        error: '',
      };

    case ACTIONS.FETCH_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.leaderboard,
        error: '',
      };

    case ACTIONS.SET_LAB_TYPE:
      return {
        ...state,
        lab: action.lab,
        error: '',
      };

    case ACTIONS.FETCH_WORDS:
      return {
        ...state,
        quiz: action.words,
        error: '',
      };

    case ACTIONS.FETCH_CHECK_WORDS:
      return {
        ...state,
        result: action.result,
        error: '',
      };

    case ACTIONS.FETCH_SENTENCES:
      return {
        ...state,
        quiz: action.sentences,
        error: '',
      };

    case ACTIONS.FETCH_CHECK_SENTENCES:
      return {
        ...state,
        result: action.result,
        error: '',
      };

    case ACTIONS.RESET_LAB:
      return {
        ...state,
        quiz: [],
        result: {},
        error: '',
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || 'ERROR',
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
  }
}

export default reducer;
