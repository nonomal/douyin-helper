import { isEnabled } from '../base/enhanceDescription';

setInterval(async () => {
  if (!await isEnabled()) {
    return;
  }
  const slide = document.querySelector('.swiper-slide-active');
  if (!slide) {
    return;
  }
  const title = slide.querySelector('.video-info-detail > .title');
  if (!title) {
    return;
  }
  const spans = Array.from(title.querySelectorAll('span'));
  for (const span of spans) {
    if (span.childElementCount) {
      continue;
    }
    if (span.textContent.startsWith('#')) {
      const a = document.createElement('a');
      a.href = `/search/${encodeURIComponent(span.textContent.trim())}`;
      a.target = '_blank';
      a.textContent = span.textContent;
      a.className = 'douyinHelper_link';
      a.onclick = () => {
        slide.querySelector<HTMLElement>(
          '.xgplayer-play[data-state="play"]'
        )?.click();
      }
      span.textContent = '';
      span.appendChild(a);
    }
  }
}, 1000);
