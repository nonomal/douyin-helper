import ReactDOM from 'react-dom/client';
import App from './App';
import { getTheme } from '../../base/theme';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

(async () => {
  document.body.setAttribute('theme-mode', await getTheme());
})();
