import { isEnabled } from '../../base/functions/enhanceDescription';
import { querySelector, querySelectorAll } from '../dom';

const LINK_CLASS_NAME = 'douyinHelper_link';

export async function execute() {
  if (!await isEnabled()) {
    return;
  }
  const slide = querySelector(document, ['selectors', 'feed:slide']);
  if (!slide) {
    return;
  }
  const desc = querySelector(slide, ['selectors', 'feed:slide:desc']);
  if (!desc) {
    return;
  }
  const elems = Array.from(querySelectorAll(
    desc,
    ['selectors', 'feed:slide:desc:hash'],
  ));
  for (const elem of elems) {
    if (elem.childElementCount) {
      continue;
    }
    if (/^#/.test(elem.textContent)) {
      const a = document.createElement('a');
      a.href = `/search/${encodeURIComponent(elem.textContent.trim())}`;
      a.target = '_blank';
      a.textContent = elem.textContent;
      a.className = LINK_CLASS_NAME;
      a.onclick = () => {
        const btn = querySelector(
          slide,
          ['selectors', 'feed:slide:playBtn:playing'],
        ) as HTMLElement;
        btn?.click();
      }
      elem.textContent = '';
      elem.appendChild(a);
      continue;
    }
    if (/^@/.test(elem.textContent)) {
      elem.classList.add(LINK_CLASS_NAME);
      continue;
    }
  }
}
