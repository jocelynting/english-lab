import '../styles/Loading.css';

function Loading({ children = 'Loading...', loadingType = 'login' }) {
  return (
    <div
      className={
        loadingType === 'login'
          ? 'app__spinner login__loading'
          : 'app__spinner data__loading'
      }
    >
      <div className="spinner"></div>
      <p className="spinner__title">{children}</p>
    </div>
  );
}

export default Loading;
