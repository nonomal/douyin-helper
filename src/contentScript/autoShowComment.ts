import { isEnabled } from '../base/autoShowComment';

setInterval(async () => {
  if (!await isEnabled()) {
    return;
  }
  const slide = document.querySelector('.swiper-slide-active');
  if (!slide) {
    return;
  }
  const video = slide.querySelector('video');
  if (!video) {
    return;
  }
  const slideRect = slide.getBoundingClientRect();
  const videoRect = video.getBoundingClientRect();
  if (slideRect.width - videoRect.width > 200) {
    return;
  }
  slide.querySelector<HTMLElement>(
    '.xgplayer-video-interaction-wrap > div:nth-child(3) > div'
  )?.click();
}, 1000);
