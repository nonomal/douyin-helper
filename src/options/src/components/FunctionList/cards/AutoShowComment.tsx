import { Card, Switch, Typography } from '@douyinfe/semi-ui';

import useFunc from '../../../hooks/useAutoShowCommentFunc';

export default function AutoShowComment() {
  const func = useFunc();
  return (
    <Card
      title="保持评论区展开"
      headerExtraContent={
        <Switch checked={func.isEnabled} onChange={func.updateStatus} />
      }
    >
      <Typography.Text type="secondary">
        浏览信息流视频时，让评论区保持展开，方便查看评论。
      </Typography.Text>
    </Card>
  );
}
