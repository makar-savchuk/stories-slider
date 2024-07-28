import React from 'react';

export default function Stories(props) {
  const { children, ...rest } = props;
  return (
    <div className="swiper-slide" {...rest}>
      <div className="swiper">
        <div className="swiper-wrapper">{children}</div>
      </div>
    </div>
  );
}
