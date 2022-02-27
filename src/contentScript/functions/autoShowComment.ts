import { isEnabled } from '../../base/functions/autoShowComment';
import config from '../../base/config';

let isEnabledNow = false;
let switchKeyPressCount = 0;
let switchKeyLastDownAt = 0;

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.addEventListener('keydown', event => {
    if (!isEnabledNow) {
      return;
    }

    const { code, shiftKey, target } = event;
    if (
      (target as HTMLElement).contentEditable === 'true' ||
      (target as HTMLElement).nodeName === 'INPUT'
    ) {
      return;
    }
    if (shiftKey || (code !== 'ArrowUp' && code !== 'ArrowDown')) {
      return;
    }

    if (!switchKeyPressCount) {
      event.stopPropagation();
      event.preventDefault();
    }
    switchKeyPressCount++;
    if (Date.now() - switchKeyLastDownAt < 1000) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      switchKeyLastDownAt = Date.now();
    }
  }, true);

  document.documentElement.addEventListener('keyup', ({ code }) => {
    if (!isEnabledNow) {
      return;
    }

    const count = switchKeyPressCount;
    switchKeyPressCount = 0;
    switchKeyLastDownAt = 0;
    if (count !== 1) {
      return;
    }

    const slide = document.querySelector(
      config.get<string>(['selectors', 'feed:slide'])
    );
    if (!slide) {
      return;
    }
    const selector = config.get<string>([
      'selectors',
      `feed:slide:switch:${code === 'ArrowUp' ? 'prev' : 'next'}`,
    ]);
    slide.querySelector<HTMLElement>(selector)?.click();
  }, true);
});

export async function execute() {
  isEnabledNow = await isEnabled();
  if (!isEnabledNow) {
    return;
  }
  const slide = document.querySelector(
    config.get<string>(['selectors', 'feed:slide'])
  );
  if (!slide) {
    return;
  }
  const video = slide.querySelector(
    config.get<string>(['selectors', 'feed:slide:videoWrapper'])
  );
  if (!video) {
    return;
  }
  const slideRect = slide.getBoundingClientRect();
  const videoRect = video.getBoundingClientRect();
  if (slideRect.width - videoRect.width > 200) {
    return;
  }
  slide.querySelector<HTMLElement>(
    config.get<string>(['selectors', 'feed:slide:showCommentBtn'])
  )?.click();
}
