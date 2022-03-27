import { Card, Switch, Typography, Tooltip } from '@douyinfe/semi-ui';

export default function DownloadVideo() {
  return (
    <Card
      title="下载视频"
      headerExtraContent={
        <Tooltip content="这是主动触发的功能，无需关闭">
          <Switch checked={true} disabled={true} />
        </Tooltip>
      }
    >
      <Typography.Text type="secondary">
        浏览信息流、详情页时点击插件，可下载当前播放的视频。
      </Typography.Text>
      <Card style={{ marginTop: 20 }}>
        <Typography.Text type="tertiary" size="small">
          此功能仅用于个人学习研究，请务必在遵守当地法律法规的前提下，合理使用内容。
        </Typography.Text>
      </Card>
    </Card>
  );
}
