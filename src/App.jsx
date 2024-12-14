import { useEffect, useReducer, useRef, useCallback } from 'react';
import './App.css';
import Login from './pages/Login';
import Loading from './components/Loading';
import Home from './pages/Home';

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchStats,
  fetchLeaderboard,
} from './utils/services';
import reducer, { initialState } from './utils/reducer';
import {
  ACTIONS,
  CLIENT,
  LOGIN_STATUS,
  SERVER,
  POLLING_DELAY,
  PAGES,
} from './utils/constants';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pollingRef = useRef();

  function onLogin(username) {
    dispatch({ type: ACTIONS.START_LOADING });
    fetchLogin(username)
      .then(({ username, stats, leaderboard }) => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.FETCH_STATS, stats });
        dispatch({ type: ACTIONS.FETCH_LEADERBOARD, leaderboard });
        dispatch({ type: ACTIONS.NAVIGATE, page: PAGES.LAB });
        window.history.replaceState(null, '', PAGES.LAB);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.LOG_OUT });
        handleError(err?.error);
      });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    dispatch({ type: ACTIONS.NAVIGATE, page: PAGES.LOGIN });
    window.history.replaceState(null, '', PAGES.LOGIN);
    fetchLogout().catch((error) => {
      handleError(error?.error);
    });
  }

  function checkSession() {
    dispatch({ type: ACTIONS.START_LOADING });
    fetchSession()
      .then(({ username }) => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        return Promise.all([fetchStats(), fetchLeaderboard()]);
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then(([{ stats }, { leaderboard }]) => {
        dispatch({ type: ACTIONS.FETCH_STATS, stats });
        dispatch({ type: ACTIONS.FETCH_LEADERBOARD, leaderboard });
        dispatch({ type: ACTIONS.NAVIGATE, page: PAGES.LAB });
        window.history.replaceState(null, '', PAGES.LAB);
      })
      .catch((err) => {
        handleError(err?.error);
      });
  }

  useEffect(() => {
    checkSession();
  }, []);

  function handleError(error) {
    if (error === CLIENT.NO_SESSION) {
      dispatch({ type: ACTIONS.LOG_OUT });
      dispatch({ type: ACTIONS.NAVIGATE, page: PAGES.LOGIN });
      window.history.replaceState(null, '', PAGES.LOGIN);
      return;
    }

    if (error === SERVER.AUTH_MISSING) {
      dispatch({ type: ACTIONS.LOG_OUT });
      dispatch({ type: ACTIONS.NAVIGATE, page: PAGES.LOGIN });
      window.history.replaceState(null, '', PAGES.LOGIN);
    }

    dispatch({ type: ACTIONS.REPORT_ERROR, error });
  }

  const pollUserData = useCallback(() => {
    Promise.all([fetchStats(), fetchLeaderboard()])
      .then(([{ stats }, { leaderboard }]) => {
        dispatch({ type: ACTIONS.FETCH_STATS, stats });
        dispatch({ type: ACTIONS.FETCH_LEADERBOARD, leaderboard });
      })
      .then(() => {
        pollingRef.current = setTimeout(pollUserData, POLLING_DELAY);
      })
      .catch((err) => {
        pollingRef.current = setTimeout(pollUserData, POLLING_DELAY);
        handleError(err?.error);
      });
  }, []);

  useEffect(() => {
    if (
      state.loginStatus == LOGIN_STATUS.IS_LOGGED_IN &&
      state.page === PAGES.LAB
    ) {
      pollingRef.current = setTimeout(pollUserData, POLLING_DELAY);
    }
    return () => {
      clearTimeout(pollingRef.current);
    };
  }, [state.loginStatus, state.page, pollUserData]);

  useEffect(() => {
    function onPageChange() {
      if (
        document.location.pathname === PAGES.WORDS ||
        document.location.pathname === PAGES.SENTENCES
      ) {
        dispatch({ type: ACTIONS.NAVIGATE, page: PAGES.LAB });
        return;
      }
      if (
        document.location.pathname === PAGES.LAB ||
        document.location.pathname === PAGES.INSTRUCTION ||
        document.location.pathname === PAGES.COMPLETE
      ) {
        dispatch({ type: ACTIONS.RESET_LAB });
      }
      dispatch({ type: ACTIONS.NAVIGATE, page: document.location.pathname });
    }

    onPageChange();

    window.addEventListener('popstate', onPageChange);

    return () => {
      window.removeEventListener('popstate', onPageChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark__theme');
      root.classList.remove('light__theme');
    } else {
      root.classList.add('light__theme');
      root.classList.remove('dark__theme');
    }
  }, [state.theme]);

  return (
    <>
      {state.loginStatus === LOGIN_STATUS.PENDING && (
        <Loading>Loading...</Loading>
      )}
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <Login onLogin={onLogin} error={state.error} />
      )}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <Home state={state} dispatch={dispatch} onLogout={onLogout} />
      )}
    </>
  );
}

export default App;
