import { Card, Switch, Typography } from '@douyinfe/semi-ui';

import useFunc from '../hooks/useAutoShowCommentFunc';

export default function AutoShowComment() {
  const func = useFunc();

  return (
    <Card
      title={
        <div className="flex items-center gap-3">
          <Typography.Title heading={6}>保持评论区展开</Typography.Title>
          <Typography.Text type="quaternary" size="small">
            刷信息流时，让评论区保持展开，方便浏览评论
          </Typography.Text>
          <Switch className='ml-auto' checked={func.isEnabled} onChange={func.updateIsEnabled} />
        </div>
      }
      headerLine={false}
    />
  );
}
