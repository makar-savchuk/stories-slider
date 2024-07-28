import React from 'react';

export default function Story(props) {
  const {
    avatar,
    userLink = '',
    name,
    date,
    duration,
    closeButton,
    onCloseButtonClick,
    children,
    ...rest
  } = props;
  return (
    <div className="swiper-slide" data-duration={duration} {...rest}>
      <a href={userLink} className="stories-slider-user">
        {avatar && <div className="stories-slider-user-avatar">{avatar}</div>}
        {name && <div className="stories-slider-user-name">{name}</div>}
        {date && <div className="stories-slider-user-date">{date}</div>}
      </a>
      {closeButton && (
        <div className="stories-slider-actions">
          <button
            className="stories-slider-close-button"
            onClick={onCloseButtonClick}
          />
        </div>
      )}

      <div className="stories-slider-content">{children}</div>
    </div>
  );
}
