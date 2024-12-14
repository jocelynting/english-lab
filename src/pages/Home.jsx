import Stats from '../components/Stats';
import Instruction from '../components/Instruction';
import Lab from '../components/Lab';
import Complete from '../components/Complete';
import Status from '../components/Status';
import Loading from '../components/Loading';
import '../styles/Home.css';

import {
  fetchWords,
  fetchCheckWord,
  fetchSentences,
  fetchCheckSentence,
} from '../utils/services';

import { ACTIONS, LAB_TYPES, SERVER, PAGES } from '../utils/constants';

function Home({ state, dispatch, onLogout }) {
  function onSelectLabType(lab) {
    dispatch({ type: ACTIONS.SET_LAB_TYPE, lab });
    navigateToPage(PAGES.INSTRUCTION);
  }

  function onLabQuit() {
    dispatch({ type: ACTIONS.RESET_LAB });
    navigateToPage(PAGES.LAB);
  }

  function onLabStart() {
    if (state.lab === LAB_TYPES.WORDS) {
      onFetchWords();
    }

    if (state.lab === LAB_TYPES.SENTENCES) {
      onFetchSentences();
    }
  }

  function handlePracticeMore() {
    dispatch({ type: ACTIONS.RESET_LAB });
    onLabStart();
  }

  function onLabComplete() {
    navigateToPage(PAGES.COMPLETE);
  }

  function onFetchWords() {
    dispatch({ type: ACTIONS.DATA_LOADING, loading: true });
    fetchWords()
      .then(({ words }) => {
        dispatch({ type: ACTIONS.DATA_LOADING, loading: false });
        dispatch({ type: ACTIONS.FETCH_WORDS, words });
        navigateToPage(PAGES.WORDS);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.DATA_LOADING, loading: false });
        handleError(err?.error);
      });
  }

  function onCheckWord(id, answer, isAutoSubmit) {
    dispatch({ type: ACTIONS.DATA_LOADING, loading: true });
    fetchCheckWord(id, answer, isAutoSubmit)
      .then(({ result }) => {
        dispatch({ type: ACTIONS.DATA_LOADING, loading: false });
        dispatch({ type: ACTIONS.FETCH_CHECK_WORDS, result });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.DATA_LOADING, loading: false });
        handleError(err?.error);
      });
  }

  function onFetchSentences() {
    dispatch({ type: ACTIONS.DATA_LOADING, loading: true });
    fetchSentences()
      .then(({ sentences }) => {
        dispatch({ type: ACTIONS.DATA_LOADING, loading: false });
        dispatch({ type: ACTIONS.FETCH_SENTENCES, sentences });
        navigateToPage(PAGES.SENTENCES);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.DATA_LOADING, loading: false });
        handleError(err?.error);
      });
  }

  function onCheckSentence(id, answer, isAutoSubmit) {
    dispatch({ type: ACTIONS.DATA_LOADING, loading: true });
    fetchCheckSentence(id, answer, isAutoSubmit)
      .then(({ result }) => {
        dispatch({ type: ACTIONS.DATA_LOADING, loading: false });
        dispatch({
          type: ACTIONS.FETCH_CHECK_SENTENCES,
          result,
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.DATA_LOADING, loading: false });
        handleError(err?.error);
      });
  }

  function handleError(error) {
    if (error === SERVER.AUTH_MISSING) {
      dispatch({ type: ACTIONS.LOG_OUT });
    }

    dispatch({ type: ACTIONS.REPORT_ERROR, error });
  }

  function navigateToPage(page) {
    dispatch({ type: ACTIONS.NAVIGATE, page });
    if (page === PAGES.LAB) {
      window.history.replaceState(null, '', PAGES.LAB);
    } else {
      window.history.pushState(null, '', page);
    }
  }

  function toggleTheme() {
    dispatch({ type: ACTIONS.TOGGLE_THEME });
  }

  return (
    <div className="home">
      {state.dataLoading && <Loading loadingType="data">Loading...</Loading>}
      {state.page === PAGES.LAB && (
        <Stats
          username={state.username}
          stats={state.stats}
          theme={state.theme}
          leaderboard={state.leaderboard}
          onSelectLabType={onSelectLabType}
          onTheme={toggleTheme}
          onLogout={onLogout}
        />
      )}
      {state.page === PAGES.INSTRUCTION && (
        <Instruction
          type={state.lab}
          onLabStart={onLabStart}
          onLabQuit={onLabQuit}
          error={state.error}
        />
      )}
      {(state.page === PAGES.WORDS || state.page === PAGES.SENTENCES) && (
        <Lab
          type={state.lab}
          quiz={state.quiz}
          result={state.result}
          onCheckQuiz={
            state.lab === LAB_TYPES.WORDS ? onCheckWord : onCheckSentence
          }
          onLabComplete={onLabComplete}
          onLabQuit={onLabQuit}
        />
      )}
      {state.page === PAGES.COMPLETE && (
        <Complete onPracticeMore={handlePracticeMore} onLabQuit={onLabQuit} />
      )}
      {state.error && <Status className="status__center" error={state.error} />}
    </div>
  );
}

export default Home;
