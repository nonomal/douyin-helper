import * as injection from './injection';
import * as aweme from './aweme';
import * as theme from './theme';
import * as autoShowComment from './func/autoShowComment';
import * as remapShortcut from './func/remapShortcut';
import * as downloadVideo from './func/downloadVideo';

(async () => {
  injection.init();
  aweme.init();
  theme.init();
  autoShowComment.init();
  remapShortcut.init();
  downloadVideo.init();
})();
