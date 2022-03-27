import { Helmet } from 'react-helmet';
import { Empty } from '@douyinfe/semi-ui';
import {
  IllustrationNotFound,
  IllustrationNotFoundDark,
} from '@douyinfe/semi-illustrations';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Helmet>
        <title>此页面不存在</title>
      </Helmet>
      <Empty
        image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
        darkModeImage={
          <IllustrationNotFoundDark style={{ width: 150, height: 150 }} />
        }
        description={'此页面不存在'}
      />
    </div>
  );
}
