import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { IconDownloadStroked, IconSettingStroked } from '@douyinfe/semi-icons';

import { Video } from '../../../../base/functions/downloadVideo';

export default function Popup() {
  const [video, setVideo] = useState<Video>();
  const port = useRef<chrome.runtime.Port>();

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      port.current = chrome.tabs.connect(tabs[0].id || 0, { name: 'popup' });
      port.current.onMessage.addListener((msg) => {
        setVideo(msg.video);
      });
    });
    return () => {
      port.current?.disconnect();
    };
  }, []);

  const downloadVideo = useCallback(() => {
    if (!video) {
      return;
    }
    // https://bugs.chromium.org/p/chromium/issues/detail?id=579563
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1288041
    chrome.downloads.download(
      {
        url: video.url,
        filename: video.filename,
        saveAs: true,
      },
      () => {
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    );
  }, [video]);

  return (
    <div className="flex flex-col gap-y-2 p-3 w-48">
      <Button
        icon={<IconDownloadStroked />}
        block={true}
        size="large"
        disabled={!video}
        onClick={() => downloadVideo()}
      >
        {video ? '下载当前视频' : '未检测到视频'}
      </Button>
      <Button
        icon={<IconSettingStroked />}
        block={true}
        type="tertiary"
        onClick={openOptionsPage}
      >
        选项
      </Button>
    </div>
  );
}

async function openOptionsPage() {
  const baseUrl = chrome.runtime.getURL('main/index.html');
  const url = baseUrl + '#/options';
  const tabs = await chrome.tabs.query({
    windowId: chrome.windows.WINDOW_ID_CURRENT,
    url: baseUrl + '*',
  });
  for (const tab of tabs) {
    if (tab.url?.includes(url)) {
      chrome.tabs.update(tab.id || 0, {
        active: true,
      });
      return;
    }
  }
  chrome.tabs.create({ url });
}
