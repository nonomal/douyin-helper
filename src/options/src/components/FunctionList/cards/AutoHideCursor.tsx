import { Card, Switch, Typography } from '@douyinfe/semi-ui';

import useFunc from '../../../hooks/useAutoHideCursorFunc';

export default function AutoHideCursor() {
  const func = useFunc();
  return (
    <Card
      title="自动隐藏光标"
      headerExtraContent={
        <Switch checked={func.isEnabled} onChange={func.updateStatus} />
      }
    >
      <Typography.Text type="secondary">
        光标在视频上方悬停时自动隐藏，以减少对视频画面的遮挡。
      </Typography.Text>
    </Card>
  );
}
