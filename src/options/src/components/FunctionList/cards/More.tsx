import { Card, Typography } from '@douyinfe/semi-ui';

export default function More() {
  return (
    <Card>
      <Typography.Text type="tertiary" size="small">
        想要更多功能？快去
        <Typography.Text
          type="tertiary"
          size="small"
          link={{
            href: 'https://github.com/douyin-helper/douyin-helper/discussions',
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
        >
          讨论区
        </Typography.Text>
        提建议吧~
      </Typography.Text>
    </Card>
  );
}
