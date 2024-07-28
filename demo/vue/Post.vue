<template>
  <div class="demo-post">
    <div class="demo-post-header">
      <a href="#" class="demo-post-avatar" @click="onAvatarClick">
        <img :src="avatar" />
      </a>
      <div class="demo-post-name">{{ name }}</div>
      <button class="demo-post-header-actions">
        <span />
        <span />
        <span />
      </button>
    </div>
    <div class="demo-post-image">
      <img :src="image" />
    </div>
    <div class="demo-post-footer">
      <div class="demo-post-footer-actions">
        <div class="demo-post-footer-actions-left">
          <button>
            <img src="icons/like.svg" />
          </button>
          <button>
            <img src="icons/comment.svg" />
          </button>
          <button>
            <img src="icons/send.svg" />
          </button>
        </div>
        <div class="demo-post-footer-actions-right">
          <button>
            <img src="icons/bookmark.svg" />
          </button>
        </div>
      </div>
      <div class="demo-post-likes">Likes: {{ likesCount }}</div>
      <div class="demo-post-content">
        <span class="demo-post-content-name">{{ name }}</span>
        <span class="demo-post-content-text">{{ text }}</span>
      </div>
      <div class="demo-post-date">{{ date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    likesCount: {
      type: [String, Number],
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
  emits: ['avatarClick'],
  setup(props, ctx) {
    const onAvatarClick = (e) => {
      ctx.emit('avatarClick', e);
    };

    return {
      onAvatarClick,
    };
  },
};
</script>
