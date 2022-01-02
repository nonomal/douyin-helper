setInterval(async () => {
  if (!(await isAutoShowCommentEnabled())) {
    return;
  }
  const swiper = document.querySelector('.swiper-container');
  const video = document.querySelector('video');
  if (!swiper || !video) {
    return;
  }
  const swiperRect = swiper.getBoundingClientRect();
  const videoRect = video.getBoundingClientRect();
  if (swiperRect.width - videoRect.width > 200) {
    return;
  }
  document.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'x',
    code: 'KeyX',
  }));
}, 1000);
