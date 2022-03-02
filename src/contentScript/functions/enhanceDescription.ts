import { isEnabled } from '../../base/functions/enhanceDescription';
import config from '../../base/config';

const LINK_CLASS_NAME = 'douyinHelper_link';

export async function execute() {
  if (!await isEnabled()) {
    return;
  }
  const slide = document.querySelector(
    config.get<string>(['selectors', 'feed:slide'])
  );
  if (!slide) {
    return;
  }
  const desc = slide.querySelector(
    config.get<string>(['selectors', 'feed:slide:desc'])
  );
  if (!desc) {
    return;
  }
  const elems = Array.from(desc.querySelectorAll(
    config.get<string>(['selectors', 'feed:slide:desc:hash'])
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
        slide.querySelector<HTMLElement>(
          config.get<string>(['selectors', 'feed:slide:playBtn:playing'])
        )?.click();
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
