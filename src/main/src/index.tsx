import ReactDOM from 'react-dom';

import config from '../../base/config';
import './index.css';
import App from './App';

(async () => {
  await config.prepare();
  ReactDOM.render(<App />, document.getElementById('root'));
})();
