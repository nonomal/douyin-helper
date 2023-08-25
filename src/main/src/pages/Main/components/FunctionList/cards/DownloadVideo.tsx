import { Card, Checkbox, Switch, Typography } from '@douyinfe/semi-ui';

import useFunc from '../hooks/useDownloadVideoFunc';

export default function DownloadVideo() {
  const func = useFunc();

  return (
    <Card
      title={
        <div className="flex items-center gap-3">
          <Typography.Title heading={6}>下载视频</Typography.Title>
          <Typography.Text type="quaternary" size="small">
            此功能仅供个人学习研究使用，禁止用于其他用途，使用即承诺遵守法律法规与相关协议
          </Typography.Text>
          <Switch className='ml-auto' checked={func.isEnabled} onChange={func.updateIsEnabled} />
        </div>
      }
    >
      <div className='flex flex-col gap-3'>
        <Checkbox
          disabled={!func.isEnabled}
          checked={func.isPlayerDownloadButtonEnabled} 
          onChange={e => func.updateIsPlayerDownloadButtonEnabled(!!e.target.checked)}
        >
          信息流视频播放器增加下载按钮
        </Checkbox>
        <Checkbox
          disabled={!func.isEnabled}
          checked={func.isListItemDownloadButtonEnabled} 
          onChange={e => func.updateIsListItemDownloadButtonEnabled(!!e.target.checked)}
        >
          视频列表项增加下载按钮
        </Checkbox>
      </div>
    </Card>
  );
}
