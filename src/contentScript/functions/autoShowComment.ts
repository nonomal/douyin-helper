import { isEnabled } from '../../base/functions/autoShowComment';
import config from '../../base/config';

export async function execute() {
  if (!(await isEnabled())) {
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
