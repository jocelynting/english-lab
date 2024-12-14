function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function isPermitted(username) {
  return username !== 'dog';
}

export default {
  isValid,
  isPermitted,
};
