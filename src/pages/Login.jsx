import { useState } from 'react';
import Status from '../components/Status';
import '../styles/Login.css';

function Login({ onLogin, error }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username);
  };

  return (
    <div className="login">
      <p className="login__title">🎯 English Lab</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__username">
          <label className="login__label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="login__input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        {error && <Status className="status" error={error} />}
        <button className="login__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
