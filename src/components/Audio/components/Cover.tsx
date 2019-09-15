import React from 'react';
import { Element } from '$lib/types';

interface CoverProps extends Element<'div'> {
  backgroundUrl: string;
  trackName: string;
  artistName: string;
}

export const Cover: React.FC<CoverProps> = ({
  backgroundUrl,
  trackName,
  artistName,
  className,
  style = {},
  children,
  ...props
}) => {
  return (
    <div
      style={{
        ...style,
        backgroundImage: `url(${backgroundUrl})`,
      }}
      {...props}
    >
      <div>
        <span>{trackName}</span>
      </div>
      <div>
        <span className="sb-soundplayer-artist sb-soundplayer-info-box">
          by {artistName}
        </span>
      </div>
      {children}
    </div>
  );
};

export default Cover;
