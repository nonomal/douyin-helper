import { useMemo } from 'react';
import { Nav, Typography } from '@douyinfe/semi-ui';

export default function Header() {
  const version = useMemo(() => {
    return chrome.runtime.getManifest().version;
  }, []);
  return (
    <Nav
      mode="horizontal"
      header={{
        logo: <img src="../../assets/logo.png" alt="" />,
        text: (
          <div className="flex items-center gap-x-2">
            <span>抖音小助手</span>
            <span className="text-sm opacity-40">v{version}</span>
          </div>
        ),
      }}
      footer={
        <div className="flex gap-x-5">
          <Typography.Text
            link={{
              href: 'https://chrome.google.com/webstore/detail/%E6%8A%96%E9%9F%B3%E5%B0%8F%E5%8A%A9%E6%89%8B/khgcifnapfcaleokihendkolpcfgkepk',
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
          >
            去应用商店评分
          </Typography.Text>
          <Typography.Text
            link={{
              href: 'https://github.com/douyin-helper/douyin-helper/discussions',
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
          >
            去讨论区提建议
          </Typography.Text>
          <Typography.Text
            link={{
              href: 'https://douyinhelper.com',
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
          >
            小助手主页
          </Typography.Text>
        </div>
      }
    />
  );
}
