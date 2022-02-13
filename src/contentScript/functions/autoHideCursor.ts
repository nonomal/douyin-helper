import { isEnabled } from '../../base/functions/autoHideCursor';
import config from '../../base/config';

const NO_CURSOR_CLASS = 'douyinHelper_noCursorRoot';

const autoHideCursor = debounce(async ({ clientX, clientY }: MouseEvent) => {
  if (!(await isEnabled())) {
    return;
  }
  const videos = Array.from(document.querySelectorAll(
    config.get<string>(['selectors', 'video'])
  ));
  for (const video of videos) {
    const { left, width, top, height } = video.getBoundingClientRect();
    if (
      clientX > left &&
      clientX < left + width &&
      clientY > top &&
      clientY < top + height
    ) {
      document.documentElement.classList.add(NO_CURSOR_CLASS);
      return;
    }
  }
}, 2000);

document.addEventListener('mousemove', event => {
  document.documentElement.classList.remove(NO_CURSOR_CLASS);
  autoHideCursor(event);
}, true);

function debounce(fn: Function, timeout: number) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(null, args), timeout);
  };
}
