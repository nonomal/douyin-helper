import { Card, Switch, Typography } from '@douyinfe/semi-ui';

import useFunc from '../../../../../hooks/useSearchSelectionFunc';

export default function SearchSelection() {
  const func = useFunc();
  return (
    <Card
      title="右键搜索"
      headerExtraContent={
        <Switch checked={func.isEnabled} onChange={func.updateStatus} />
      }
    >
      <Typography.Text type="secondary">
        在网页里选中文本后，右键菜单增加「使用抖音搜索“所选文本”」。
      </Typography.Text>
    </Card>
  );
}
