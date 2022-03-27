import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getTheme } from '../../base/theme';

import Options from './pages/Options';
import Popup from './pages/Popup';
import NotFound from './pages/NotFound';

export default function App() {
  useEffect(() => {
    initTheme();
  }, []);
  return (
    <Router>
      <Helmet defaultTitle="抖音小助手" titleTemplate="%s - 抖音小助手" />
      <Routes>
        <Route path="/options" element={<Options />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

async function initTheme() {
  document.body.setAttribute('theme-mode', await getTheme());
}
