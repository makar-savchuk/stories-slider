<script>
export default {
  props: {
    avatar: { type: String, default: undefined },
    userLink: { type: String, default: undefined },
    name: { type: String, default: undefined },
    date: { type: String, default: undefined },
    closeButton: { type: Boolean, default: false },
    duration: { type: Number, default: undefined },
  },
  emits: ['closeButtonClick'],
  setup(props, ctx) {
    const onCloseButtonClick = (e) => {
      ctx.emit('closeButtonClick', e);
    };

    return {
      onCloseButtonClick,
    };
  },
};
</script>
<template>
  <div class="swiper-slide" :data-duration="duration">
    <a :href="userLink" class="stories-slider-user">
      <div v-if="avatar || $slots.avatar" class="stories-slider-user-avatar">
        {{ avatar || '' }}
        <slot name="avatar" />
      </div>
      <div v-if="name || $slots.name" class="stories-slider-user-name">
        {{ name || '' }}
        <slot name="name" />
      </div>
      <div v-if="date || $slots.date" class="stories-slider-user-date">
        {{ date || '' }}
        <slot name="date" />
      </div>
    </a>
    <div v-if="closeButton" class="stories-slider-actions">
      <button class="stories-slider-close-button" @click="onCloseButtonClick" />
    </div>

    <div class="stories-slider-content"><slot /></div>
  </div>
</template>
