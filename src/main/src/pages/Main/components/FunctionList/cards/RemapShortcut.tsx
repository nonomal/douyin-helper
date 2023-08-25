import { useMemo } from 'react';
import { Card, Switch, Typography, Select, Button } from '@douyinfe/semi-ui';
import {
  IconDoubleChevronRight,
  IconDeleteStroked,
} from '@douyinfe/semi-icons';

import useFunc, { KEY_INFOS } from '../hooks/useRemapShortcutFunc';

export default function RemapShortcut() {
  const func = useFunc();

  const options = useMemo(() => {
    return [
      {
        label: '未选择',
        value: '',
      },
      ...Object.keys(KEY_INFOS).map((code) => ({
        label: <span className='mono'>{KEY_INFOS[code].label}</span>,
        value: code,
      })),
    ];
  }, []);

  return (
    <Card
      title={
        <div className="flex items-center gap-3">
          <Typography.Title heading={6}>自定义快捷键</Typography.Title>
          <Typography.Text type="quaternary" size="small">
            修改官方的快捷键配置
          </Typography.Text>
          <Switch className='ml-auto' checked={func.isEnabled} onChange={func.updateIsEnabled} />
        </div>
      }
    >
      <div className="flex flex-col gap-y-3">
        {[...func.pairs, { oldCode: '', newCode: '' }].map((pair, i) => (
          <div key={i} className="flex items-center gap-x-3">
            <Select
              disabled={!func.isEnabled}
              insetLabel="旧按键"
              style={{ minWidth: 150 }}
              value={pair.oldCode}
              optionList={options}
              onChange={(code) => {
                const p = {
                  oldCode: code as string,
                  newCode: pair.newCode,
                };
                if (i === func.pairs.length) {
                  func.addPair(p);
                } else {
                  func.updatePair(i, p);
                }
              }}
            />
            <IconDoubleChevronRight className="opacity-50" />
            <Select
              disabled={!func.isEnabled}
              insetLabel="新按键"
              style={{ minWidth: 150 }}
              value={pair.newCode}
              optionList={options}
              onChange={(code) => {
                const p = {
                  oldCode: pair.oldCode,
                  newCode: code as string,
                };
                if (i === func.pairs.length) {
                  func.addPair(p);
                } else {
                  func.updatePair(i, p);
                }
              }}
            />
            <div className="ml-auto">
              <Button
                icon={<IconDeleteStroked />}
                type="danger"
                disabled={i === func.pairs.length || !func.isEnabled}
                onClick={() => {
                  func.detelePair(i);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
