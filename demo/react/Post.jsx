import React from 'react';

export default function Post(props) {
  const { name, avatar, likesCount, image, text, date, onAvatarClick } = props;

  return (
    <div className="demo-post">
      <div className="demo-post-header">
        <a href="#" className="demo-post-avatar" onClick={onAvatarClick}>
          <img src={avatar} />
        </a>
        <div className="demo-post-name">{name}</div>
        <button className="demo-post-header-actions">
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="demo-post-image">
        <img src={image} />
      </div>
      <div className="demo-post-footer">
        <div className="demo-post-footer-actions">
          <div className="demo-post-footer-actions-left">
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
          <div className="demo-post-footer-actions-right">
            <button>
              <img src="icons/bookmark.svg" />
            </button>
          </div>
        </div>
        <div className="demo-post-likes">Likes: {likesCount}</div>
        <div className="demo-post-content">
          <span className="demo-post-content-name">{name}</span>
          <span className="demo-post-content-text">{text}</span>
        </div>
        <div className="demo-post-date">{date}</div>
      </div>
    </div>
  );
}
