import React from 'react';
import { NextIcon } from '$components/Icons';
import SRT from '$components/SRT';
import { Element } from '$lib/types';

interface NextButtonProps extends Element<'button'> {
  onNextClick?: Function;
  audioTrack: any;
}

export const NextButton: React.FC<NextButtonProps> = ({
  audioTrack,
  onNextClick,
  ...props
}) => {
  function handleClick(event: any) {
    audioTrack && audioTrack.next();
    onNextClick && onNextClick(event);
  }
  return (
    <button type="button" onClick={handleClick} {...props}>
      <NextIcon fill="currentColor" aria-hidden />
      <SRT>Next Track</SRT>
    </button>
  );
};

export default NextButton;
