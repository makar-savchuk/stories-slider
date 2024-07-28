/**
 * UI Initiative Stories Slider 1.0.0
 *
 * Instagram-like Stories Slider Made With Swiper
 *
 * https://uiinitiative.com
 *
 * Copyright 2022-2023 UI Initiative
 *
 * Released under the UI Initiative Regular License
 *
 * Released on: July 3, 2023
 */

/* eslint-disable no-shadow */
export default function createStoriesSlider(el, params = {}) {
  const mainSwiperEl = el.querySelector('.swiper');
  const {
    autoplayDuration = 5000,
    Swiper,
    EffectCube,
    onSlidesIndexesChange,
    onAutoplayStart,
    onAutoplayStop,
  } = params;
  let { enabled = true } = params;

  let activeSubSwiperIndex = 0;

  let mainSwiper;
  let videoRaf;
  const subSwipers = [];

  let slideIndexesChangeRaf;

  let isTouched;
  let touchStartTime;
  let touchStartTimeout;
  let touchHoldDuration;
  let autoplayStartTime;
  let autoplayTimeLeft;
  let autoplayTouchPaused;

  const startAutoplay = (swiper, durationForce) => {
    const subSwiperIndex = subSwipers.indexOf(swiper);
    let duration =
      typeof durationForce === 'undefined' ? autoplayDuration : durationForce;
    let currentSlideDuration = parseInt(
      swiper.slides[swiper.activeIndex].getAttribute('data-duration'),
      10,
    );
    const videoEl = swiper.slides[swiper.activeIndex].querySelector('video');
    if (Number.isNaN(currentSlideDuration) && videoEl) {
      currentSlideDuration = videoEl.duration * 1000;
    }
    if (
      !Number.isNaN(currentSlideDuration) &&
      currentSlideDuration > 0 &&
      typeof durationForce === 'undefined'
    ) {
      duration = currentSlideDuration;
    }
    autoplayTimeLeft = duration;

    swiper.storiesSliderAutoplayTimeout = setTimeout(() => {
      if (!swiper.isEnd) {
        swiper.slideNext();
      } else {
        if (activeSubSwiperIndex !== subSwiperIndex) return;
        if (!mainSwiper.isEnd) mainSwiper.slideNext();
      }
    }, duration);

    if (onAutoplayStart) onAutoplayStart(swiper);
    return duration;
  };
  const stopAutoplay = (swiper) => {
    clearTimeout(swiper.storiesSliderAutoplayTimeout);
    if (onAutoplayStop) onAutoplayStop(swiper);
  };
  const pauseAutoplay = (swiper) => {
    stopAutoplay(swiper);
    // find current video
    const videoEl = swiper.slides[swiper.activeIndex].querySelector('video');
    if (videoEl) {
      cancelAnimationFrame(videoRaf);
      videoEl.pause();
    }
    const duration = autoplayTimeLeft || autoplayDuration;
    let currentSlideDuration = parseInt(
      swiper.slides[swiper.activeIndex].getAttribute('data-duration'),
      10,
    );
    if (Number.isNaN(currentSlideDuration)) currentSlideDuration = undefined;
    if (!currentSlideDuration && videoEl) {
      currentSlideDuration = videoEl.duration * 1000;
    }
    autoplayTimeLeft = duration - (new Date().getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;

    const calcTranslate =
      1 - autoplayTimeLeft / (currentSlideDuration || autoplayDuration);
    const currentBullet = swiper.el.querySelector(
      `.stories-slider-pagination-bullet:nth-child(${swiper.activeIndex + 1})`,
    );

    currentBullet.querySelector('span').remove();
    currentBullet.insertAdjacentHTML(
      'beforeend',
      `<span style="transform:translateX(${
        -100 + calcTranslate * 100
      }%)"></span>`,
    );
  };
  const resumeAutoPlay = (swiper) => {
    if (swiper.isEnd && autoplayTimeLeft < 0) return;
    autoplayStartTime = new Date().getTime();

    startAutoplay(swiper, autoplayTimeLeft);
    // find current video
    const videoEl = swiper.slides[swiper.activeIndex].querySelector('video');
    if (videoEl) {
      try {
        videoRaf = requestAnimationFrame(() => {
          videoEl.play();
        });
      } catch (err) {
        // error
      }
    }
    const bullet = swiper.el.querySelector(
      `.stories-slider-pagination-bullet:nth-child(${
        swiper.activeIndex + 1
      }) > span`,
    );

    bullet.style.transform = 'translateX(0%)';
    bullet.style.transitionDuration = `${autoplayTimeLeft}ms`;
  };

  const onSubSwiperSlideChange = (swiper) => {
    stopAutoplay(swiper);
    startAutoplay(swiper);
    autoplayStartTime = new Date().getTime();

    const removeBullet = swiper.el.querySelector(
      '.stories-slider-pagination-bullet-current',
    );
    if (removeBullet) {
      removeBullet.classList.remove('stories-slider-pagination-bullet-current');
    }

    const currentBullet = swiper.el.querySelector(
      `.stories-slider-pagination-bullet:nth-child(${swiper.activeIndex + 1})`,
    );
    // find current video
    const videoEl = swiper.slides[swiper.activeIndex].querySelector('video');
    if (videoEl) {
      videoEl.currentTime = 0;
      try {
        videoRaf = requestAnimationFrame(() => {
          videoEl.play();
        });
      } catch (err) {
        // error
      }
    }
    // find other videos
    swiper.slides.forEach((slideEl) => {
      slideEl.querySelectorAll('video').forEach((vEl) => {
        if (vEl === videoEl) return;
        vEl.currentTime = 0;
        if (!videoEl) cancelAnimationFrame(videoRaf);
        vEl.pause();
      });
    });

    subSwipers
      .filter((s, index) => index !== activeSubSwiperIndex)
      .forEach((s) => {
        s.el.querySelectorAll('video').forEach((vEl) => {
          if (!videoEl) cancelAnimationFrame(videoRaf);
          vEl.pause();
        });
      });
    const allBullets = [...currentBullet.parentElement.children];
    const prevBullets = [...allBullets].filter(
      (el, index) => index < allBullets.indexOf(currentBullet),
    );
    const nextBullets = [...allBullets].filter(
      (el, index) => index > allBullets.indexOf(currentBullet),
    );
    // prev bullets
    prevBullets.forEach((el) => {
      el.classList.add('stories-slider-pagination-bullet-viewed');
      el.querySelectorAll('span').forEach((e) => e.remove());
      el.insertAdjacentHTML('beforeend', '<span></span>');
    });

    // next bullets
    nextBullets.forEach((el) => {
      el.classList.remove(
        'stories-slider-pagination-bullet-viewed',
        'stories-slider-pagination-bullet-current',
      );
      el.querySelectorAll('span').forEach((e) => e.remove());
      el.insertAdjacentHTML('beforeend', '<span></span>');
    });

    // current bullet
    currentBullet.classList.remove('stories-slider-pagination-bullet-viewed');
    currentBullet.classList.add('stories-slider-pagination-bullet-current');
    [...currentBullet.children].forEach((el) => el.remove());
    currentBullet.insertAdjacentHTML('beforeend', '<span></span>');

    // eslint-disable-next-line
    const __clientWidth = currentBullet.clientWidth;
    currentBullet.querySelector('span').style.transform = 'translateX(0%)';
    currentBullet.querySelector(
      'span',
    ).style.transitionDuration = `${autoplayTimeLeft}ms`;

    if (onSlidesIndexesChange) {
      cancelAnimationFrame(slideIndexesChangeRaf);
      slideIndexesChangeRaf = requestAnimationFrame(() => {
        onSlidesIndexesChange(activeSubSwiperIndex, swiper.activeIndex);
      });
    }
  };

  const initMainSwiper = () => {
    const setPerspectiveFix = () => {
      el.classList.add('stories-slider-perspective');
    };
    const removePerspectiveFix = () => {
      el.classList.remove('stories-slider-perspective');
    };
    mainSwiper = new Swiper(mainSwiperEl, {
      modules: typeof EffectCube !== 'undefined' ? [EffectCube] : [],
      effect: 'cube',
      speed: 500,
      threshold: 5,
      cubeEffect: {
        shadow: false,
      },
      observer: true,
      on: {
        transitionStart() {
          removePerspectiveFix();
        },
        sliderFirstMove() {
          removePerspectiveFix();
        },
        transitionEnd() {
          setPerspectiveFix();
        },
        init(mainSwiper) {
          mainSwiper.params.resistanceRatio = 0.5;
          setPerspectiveFix();
        },
        slideChange() {
          const prevSubSwiper = subSwipers[activeSubSwiperIndex];
          activeSubSwiperIndex = mainSwiper.activeIndex;
          const currentSubSwiper = subSwipers[activeSubSwiperIndex];
          stopAutoplay(prevSubSwiper);
          startAutoplay(currentSubSwiper);
          onSubSwiperSlideChange(currentSubSwiper, false);
        },
      },
    });
  };

  const initSubSwiperPagination = (subSwiperEl) => {
    const slides = subSwiperEl.querySelectorAll('.swiper-slide');
    const paginationContainerEl = document.createElement('div');
    paginationContainerEl.classList.add('stories-slider-pagination');

    for (let i = 0; i < slides.length; i += 1) {
      const paginationBulletEl = document.createElement('div');
      paginationBulletEl.classList.add('stories-slider-pagination-bullet');
      paginationBulletEl.appendChild(document.createElement('span'));
      paginationContainerEl.appendChild(paginationBulletEl);
    }

    subSwiperEl.appendChild(paginationContainerEl);
  };
  const destroySubSwiperPagination = (swiper) => {
    swiper.el
      .querySelectorAll(
        '.stories-slider-pagination, .stories-slider-pagination-bullet',
      )
      .forEach((el) => el.remove());
  };
  const initSubSwiperNavigation = (subSwiperEl, swiper) => {
    const slides = subSwiperEl.querySelectorAll('.swiper-slide');

    slides.forEach((slideEl) => {
      const navLeftEl = document.createElement('div');
      const navRightEl = document.createElement('div');

      navLeftEl.classList.add(
        'stories-slider-button',
        'stories-slider-button-prev',
      );
      navRightEl.classList.add(
        'stories-slider-button',
        'stories-slider-button-next',
      );

      slideEl.appendChild(navLeftEl);
      slideEl.appendChild(navRightEl);

      const onNavLeftClick = () => {
        if (touchHoldDuration > 200) return;
        if (swiper.isBeginning) {
          mainSwiper.slidePrev();
          return;
        }
        swiper.slidePrev();
      };
      const onNavRightClick = () => {
        if (touchHoldDuration > 200) return;
        if (swiper.isEnd) {
          mainSwiper.slideNext();
          return;
        }
        swiper.slideNext();
      };

      navLeftEl.addEventListener('click', onNavLeftClick);
      navRightEl.addEventListener('click', onNavRightClick);
    });
  };

  const destroySubSwiperNavigation = (swiper) => {
    swiper.el
      .querySelectorAll('.stories-slider-button')
      .forEach((el) => el.remove());
  };
  const initSubSwipers = () => {
    el.querySelectorAll('.swiper .swiper').forEach(
      (subSwiperEl, subSwiperIndex) => {
        const swiper = new Swiper(subSwiperEl, {
          speed: 1,
          nested: true,
          allowTouchMove: false,
          observer: true,
          on: {
            touchStart(swiper) {
              isTouched = true;
              autoplayTouchPaused = false;
              touchStartTime = new Date().getTime();
              touchStartTimeout = setTimeout(() => {
                autoplayTouchPaused = true;
                pauseAutoplay(swiper);
              }, 200);
            },
            touchEnd(swiper) {
              clearTimeout(touchStartTimeout);
              if (activeSubSwiperIndex !== subSwiperIndex) return;
              if (!isTouched) {
                return;
              }
              touchHoldDuration = new Date().getTime() - touchStartTime;
              if (autoplayTouchPaused) resumeAutoPlay(swiper);
              autoplayTouchPaused = false;
              isTouched = false;
            },
            init(swiper) {
              if (!enabled) return;
              if (activeSubSwiperIndex !== subSwiperIndex) {
                stopAutoplay(swiper);
              } else {
                requestAnimationFrame(() => {
                  onSubSwiperSlideChange(swiper);
                });
              }
            },
            slideChange(swiper) {
              onSubSwiperSlideChange(swiper);
            },
          },
        });

        initSubSwiperPagination(subSwiperEl);

        initSubSwiperNavigation(subSwiperEl, swiper);

        subSwipers.push(swiper);
      },
    );
  };

  initMainSwiper();
  initSubSwipers();

  const enable = () => {
    if (enabled) return;
    subSwipers.forEach((subSwiper, subSwiperIndex) => {
      if (subSwiperIndex === activeSubSwiperIndex) {
        onSubSwiperSlideChange(subSwiper);
      }
    });
  };

  const disable = () => {
    enabled = false;
    subSwipers.forEach((subSwiper, subSwiperIndex) => {
      subSwiper.el.querySelectorAll('video').forEach((videoEl) => {
        cancelAnimationFrame(videoRaf);
        videoEl.pause();
      });
      if (subSwiperIndex === activeSubSwiperIndex) {
        pauseAutoplay(subSwiper);
      } else {
        stopAutoplay(subSwiper);
      }
    });
  };

  const destroy = () => {
    if (mainSwiper && mainSwiper.destroy) mainSwiper.destroy();
    subSwipers.forEach((subSwiper) => {
      stopAutoplay(subSwiper);
      destroySubSwiperPagination(subSwiper);
      destroySubSwiperNavigation(subSwiper);
      if (subSwiper.destroy) subSwiper.destroy();
    });
  };

  const slideTo = (mainIndex, subIndex) => {
    if (mainSwiper && mainSwiper.slideTo && !mainSwiper.destroyed) {
      mainSwiper.slideTo(mainIndex, 0);
    }
    if (typeof subIndex !== 'undefined') {
      const subSwiper = subSwipers[mainIndex];
      if (subSwiper.slideTo && !subSwiper.destroyed) {
        if (subSwiper.activeIndex === subIndex) {
          onSubSwiperSlideChange(subSwiper);
        } else {
          subSwiper.slideTo(subIndex, 0);
        }
      }
    }
  };

  return { el, mainSwiper, subSwipers, destroy, slideTo, enable, disable };
}
