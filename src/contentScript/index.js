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
  const trigger = document.querySelector('.xgplayer-video-interaction-wrap > div:nth-child(3) > div');
  trigger?.click();
}, 1000);
