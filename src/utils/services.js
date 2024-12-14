export function fetchSession() {
  return fetchData('/api/v1/session/', {
    method: 'GET',
  });
}

export function fetchLogin(username) {
  return fetchData('/api/v1/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
}

export function fetchLogout() {
  return fetchData('/api/v1/session', {
    method: 'DELETE',
  });
}

export function fetchStats() {
  return fetchData('/api/v1/stats');
}

export function fetchLeaderboard() {
  return fetchData('/api/v1/leaderboard');
}

export function fetchWords() {
  return fetchData('/api/v1/words');
}

export function fetchCheckWord(id, answer, isAutoSubmit) {
  return fetchData(`/api/v1/words/${id}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ answer, isAutoSubmit }),
  });
}

export function fetchSentences() {
  return fetchData('/api/v1/sentences');
}

export function fetchCheckSentence(id, answer, isAutoSubmit) {
  return fetchData(`/api/v1/sentences/${id}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ answer, isAutoSubmit }),
  });
}

function fetchData(url, options = {}) {
  return fetch(url, options)
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}
