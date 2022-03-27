import { Card, Switch, Typography } from '@douyinfe/semi-ui';

import useFunc from '../../../../../hooks/useShowPublishTimeFunc';

export default function ShowPublishTime() {
  const func = useFunc();
  return (
    <Card
      title="显示视频发布时间"
      headerExtraContent={
        <Switch checked={func.isEnabled} onChange={func.updateStatus} />
      }
    >
      <Typography.Text type="secondary">
        在信息流视频的作者名称后加上视频发布时间。
      </Typography.Text>
    </Card>
  );
}
