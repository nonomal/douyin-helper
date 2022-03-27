import { isEnabled } from '../../base/functions/autoShowComment';
import { querySelector } from '../dom';
import Func from './Func';

export default class AutoShowCommentFunc extends Func {

  async isEnabled() {
    return await isEnabled();
  }

  async execute() {
    if (!(await isEnabled())) {
      return;
    }
    const slide = querySelector(document, ['selectors', 'feed:slide']);
    if (!slide) {
      return;
    }
    const video = querySelector(slide, ['selectors', 'feed:slide:videoWrapper']);
    if (!video) {
      return;
    }
    const slideRect = slide.getBoundingClientRect();
    const videoRect = video.getBoundingClientRect();
    if (slideRect.width - videoRect.width > 200) {
      return;
    }
    const btn = querySelector(
      slide,
      ['selectors', 'feed:slide:showCommentBtn'],
    ) as HTMLElement;
    btn?.click();
  }

}
