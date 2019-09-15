import React from 'react';
import { PrevIcon } from '$components/Icons';
import SRT from '$components/SRT';
import { Element } from '$lib/types';

interface PrevButtonProps extends Element<'button'> {
  audioTrack?: any;
  onPrevClick?: Function;
}

export const PrevButton: React.FC<PrevButtonProps> = ({ audioTrack, onPrevClick, ...props }) => {
  function handleClick(event: React.MouseEvent) {
    audioTrack && audioTrack.previous();
    onPrevClick && onPrevClick(event);
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      {...props}
    >
      <PrevIcon fill="currentColor" aria-hidden />
      <SRT>Previous Track</SRT>
    </button>
  );
};

export default PrevButton;
