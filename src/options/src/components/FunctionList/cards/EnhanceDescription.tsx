import { Card, Switch, Typography } from '@douyinfe/semi-ui';

import useFunc from '../../../hooks/useEnhanceDescriptionFunc';

export default function EnhanceDescription() {
  const func = useFunc();
  return (
    <Card
      title="优化视频描述"
      headerExtraContent={
        <Switch checked={func.isEnabled} onChange={func.updateStatus} />
      }
    >
      <Typography.Text type="secondary">
        点击信息流视频描述内的话题（#）可直接跳到搜索页。
      </Typography.Text>
    </Card>
  );
}
