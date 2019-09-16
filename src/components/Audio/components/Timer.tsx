import React from 'react';
import { formatTime } from '../utils';
import { Element } from '$lib/types';

interface TimerProps extends Element<'div'> {
  audioTrack: any;
  currentTime?: number | string;
  duration?: number | string;
}

export const Timer: React.FC<TimerProps> = ({
  currentTime = 0,
  duration = 0,
  audioTrack,
  ...props
}) => {
  if (!duration && audioTrack && audioTrack.duration) {
    duration = audioTrack.duration;
  }

  // TODO: Flex container moves a bit as the timestamp changes. Fix plz.

  return (
    <div {...props}>
      {`${formatTime(currentTime)} / ${formatTime(duration)}`}
    </div>
  );
};

export default Timer;
