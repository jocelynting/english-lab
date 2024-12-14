import { MESSAGES } from '../utils/constants';
import '../styles/Status.css';

function Status({ error, className }) {
  const message = MESSAGES[error] || MESSAGES.default;
  return <div className={className}>{error && message}</div>;
}

export default Status;
