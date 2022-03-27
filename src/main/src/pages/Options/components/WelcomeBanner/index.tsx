import { useMemo } from 'react';
import { Banner, Typography } from '@douyinfe/semi-ui';
import { IconCrown } from '@douyinfe/semi-icons';

export default function WelcomeBanner() {
  const isUpdateMode = useMemo(() => {
    return window.location.search.includes('reason=update');
  }, []);
  const version = useMemo(() => {
    return chrome.runtime.getManifest().version;
  }, []);
  if (!isUpdateMode) {
    return null;
  }
  return (
    <Banner
      type="success"
      icon={<IconCrown />}
      description={
        <div>
          <Typography.Text>
            小助手已成功升级至 v{version} 版本，功能与体验正在持续增强中。
          </Typography.Text>
          <Typography.Text
            link={{
              href: 'https://github.com/douyin-helper/douyin-helper#%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97',
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
          >
            [查看更新日志]
          </Typography.Text>
        </div>
      }
    />
  );
}
