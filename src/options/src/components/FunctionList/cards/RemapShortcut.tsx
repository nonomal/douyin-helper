import { useMemo } from 'react';
import { Card, Switch, Typography, Select } from '@douyinfe/semi-ui';

import useFunc, { KEY_INFOS } from '../../../hooks/useRemapShortcutFunc';

export default function RemapShortcut() {
  const func = useFunc();

  const options = useMemo(() => {
    return [
      {
        label: '不覆盖',
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
        覆盖官方原有的快捷键配置。
      </Typography.Text>
      <Card style={{ marginTop: 20 }}>
        <div className="flex flex-col gap-y-3">
          {func.shortcuts.map((shortcut) => (
            <div
              className="flex items-center justify-between"
              key={shortcut.name}
            >
              <div>
                <Typography.Text type="primary">
                  {shortcut.title}
                </Typography.Text>
                <Typography.Text type="tertiary">
                  （默认 {getCodelabel(shortcut.defaultCode)} 键）
                </Typography.Text>
              </div>
              <Select
                style={{ minWidth: 150 }}
                value={shortcut.code}
                optionList={options}
                onChange={(code) => {
                  func.updateShortcut(shortcut.name, {
                    ...shortcut,
                    code: code as string,
                  });
                }}
              />
            </div>
          ))}
        </div>
      </Card>
    </Card>
  );
}

function getCodelabel(code: string) {
  return KEY_INFOS[code]?.label ?? code;
}
