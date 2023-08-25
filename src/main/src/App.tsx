import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import NotFound from 'pages/NotFound';
import Main from 'pages/Main';

export default function App() {
  return (
    <Router>
      <Helmet defaultTitle="抖音小助手" titleTemplate="%s - 抖音小助手" />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
