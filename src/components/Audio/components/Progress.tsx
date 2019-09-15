import React from 'react';
import { Element } from '$lib/types';

interface ProgressProps extends Element<'div'> {
  onSeekTrack: Function;
  audioTrack: any;
  currentTime?: number | string;
  duration?: number | string;
  value?: number;
}

export const Progress: React.FC<ProgressProps> = ({
  onSeekTrack,
  audioTrack,
  duration = 0,
  currentTime = 0,
  value = 0,
  ...props
}) => {
  function handleSeekTrack(event: React.MouseEvent) {
    const xPos =
      (event.pageX - event.currentTarget.getBoundingClientRect().left) /
      (event.currentTarget as HTMLElement).offsetWidth;
    if (audioTrack && !isNaN(audioTrack.audio.duration)) {
      audioTrack.audio.currentTime = xPos * audioTrack.audio.duration;
    }
    onSeekTrack && onSeekTrack(xPos, event);
  }

  let width = value;
  if (!value && currentTime && duration)
    width = (parseInt(currentTime as string) / parseInt(duration as string)) * 100 || 0;
  if (value < 0) width = 0;
  if (value > 100) width = 100;

  return (
    <div
      aria-hidden // not accessible yet, so let's at least hide this from SR users
      onClick={handleSeekTrack}
      {...props}
    >
      <div
        className="inner"
        style={{ width: `${width}%` }}
      />
      {/* <input
          type="range"
          step="any"
          min={0}
          max={duration}
          onChange={e => console.log(e)}
          value={currentTime}
          aria-valuetext={prettyTime(currentTime || 0).toString()}
        /> */}
    </div>
  );
};

export default Progress;
