import { useEffect } from 'react';
import { Layout } from '@douyinfe/semi-ui';

import { getTheme } from '../../base/theme';

import FunctionList from './components/FunctionList';
import Header from './components/Header';

export default function App() {
  useEffect(() => {
    initTheme();
  }, []);
  return (
    <Layout className="flex flex-col h-screen">
      <Layout.Header className="flex-none">
        <Header />
      </Layout.Header>
      <Layout.Content className="overflow-auto">
        <FunctionList className="mx-auto max-w-2xl my-10" />
      </Layout.Content>
    </Layout>
  );
}

async function initTheme() {
  document.body.setAttribute('theme-mode', await getTheme());
}
