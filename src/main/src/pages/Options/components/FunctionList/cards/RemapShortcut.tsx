import { useMemo } from 'react';
import { Card, Switch, Typography, Select, Button } from '@douyinfe/semi-ui';
import {
  IconDoubleChevronRight,
  IconDeleteStroked,
} from '@douyinfe/semi-icons';

import useFunc, { KEY_INFOS } from '../../../../../hooks/useRemapShortcutFunc';

export default function RemapShortcut() {
  const func = useFunc();

  const options = useMemo(() => {
    return [
      {
        label: '未选择',
        value: '',
      },
      ...Object.keys(KEY_INFOS).map((code) => ({
        label: KEY_INFOS[code].label,
        value: code,
      })),
    ];
  }, []);

  return (
    <Card
      title="自定义快捷键"
      headerExtraContent={
        <Switch checked={func.isEnabled} onChange={func.updateStatus} />
      }
    >
      <Typography.Text type="secondary">
        覆盖官方原有的
        <Typography.Text
          type="secondary"
          link={{
            href: 'https://github.com/douyin-helper/douyin-helper/wiki#%E4%BD%BF%E7%94%A8%E5%BF%AB%E6%8D%B7%E9%94%AE',
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
        >
          快捷键配置
        </Typography.Text>
        。
      </Typography.Text>
      <Card style={{ marginTop: 20 }}>
        <div className="flex flex-col gap-y-3">
          {[...func.pairs, { oldCode: '', newCode: '' }].map((pair, i) => (
            <div key={i} className="flex items-center gap-x-3">
              <Select
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
                  disabled={i === func.pairs.length}
                  onClick={() => {
                    func.detelePair(i);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Card>
  );
}
