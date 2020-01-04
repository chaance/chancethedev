import React from 'react';
import VH from '@reach/visually-hidden';
import { NextIcon } from '$components/Icons';
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
      <VH>Next Track</VH>
    </button>
  );
};

export default NextButton;
