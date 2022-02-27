import { Nav, Typography } from '@douyinfe/semi-ui';

export default function Header() {
  return (
    <Nav
      mode="horizontal"
      header={{
        logo: <img src="../../assets/logo.png" alt="" />,
        text: '抖音小助手',
      }}
      footer={
        <div className="flex gap-x-5">
          <Typography.Text
            link={{
              href: 'https://github.com/douyin-helper/douyin-helper/discussions',
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
          >
            讨论区
          </Typography.Text>
          <Typography.Text
            link={{
              href: 'https://github.com/douyin-helper/douyin-helper',
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
          >
            项目主页
          </Typography.Text>
        </div>
      }
    />
  );
}
