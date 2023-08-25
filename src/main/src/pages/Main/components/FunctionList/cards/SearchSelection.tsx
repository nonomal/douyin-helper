import { Card, Switch, Typography, Checkbox } from '@douyinfe/semi-ui';

import useFunc from '../hooks/useSearchSelectionFunc';

export default function SearchSelection() {
  const func = useFunc();

  return (
    <Card
      title={
        <div className="flex items-center gap-3">
          <Typography.Title heading={6}>右键搜索</Typography.Title>
          <Typography.Text type="quaternary" size="small">
            在网页里选中文本后，右键菜单增加「使用抖音搜索“所选文本”」
          </Typography.Text>
          <Switch className='ml-auto' checked={func.isEnabled} onChange={func.updateIsEnabled} />
        </div>
      }
    >
      <div className='flex flex-col gap-y-3'>
        <Checkbox
          disabled={!func.isEnabled}
          checked={func.isOpenInNewTab} 
          onChange={e => func.updateIsOpenInNewTab(!!e.target.checked)}
        >
          在新标签页打开搜索页面
        </Checkbox>
      </div>
    </Card>
  );
}
