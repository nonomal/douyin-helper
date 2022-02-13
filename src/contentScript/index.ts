import * as autoShowComment from './functions/autoShowComment';
import * as enhanceDescription from './functions/enhanceDescription';
import * as showPublishTime from './functions/showPublishTime';
import './functions/autoHideCursor';

setInterval(() => {
  autoShowComment.execute();
  enhanceDescription.execute();
  showPublishTime.execute();
}, 1000);
