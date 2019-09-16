import React from 'react';
import { PlayIcon, PauseIcon, LoadingIcon } from '$components/Icons';
import SRT from '$components/SRT';
import { Element } from '$lib/types';

interface PlayButtonProps extends Element<'button'> {
  playing?: boolean;
  seeking?: boolean;
  playReady: boolean;
  // audioTrack?: any;
  seekingIcon?: JSX.Element;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  playing = false,
  seeking = false,
  playReady,
  // audioTrack,
  onClick,
  seekingIcon,
  ...props
}) => {
  let iconNode: React.ReactNode;
  let label;
  const disabled = !!(seeking && seekingIcon);

  if (!playReady) {
    iconNode = <LoadingIcon fill="currentColor" aria-hidden />;
    label = 'Loading Audio';
  } else if (seeking && seekingIcon) {
    iconNode = React.cloneElement(seekingIcon);
    label = 'Seeking';
  } else if (playing) {
    iconNode = <PauseIcon fill="currentColor" aria-hidden />;
    label = 'Pause';
  } else {
    iconNode = <PlayIcon fill="currentColor" aria-hidden />;
    label = 'Play';
  }

  /* function handleKeyDown(event: any) {
    let flag = false;
    switch (event.key) {
      case 'Enter':
      case ' ':
        flag = true;
        togglePlay();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        flag = true;
        stepForward();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        flag = true;
        stepBack();
        break;
      case 'PageDown':
        flag = true;
        stepBack(10);
        break;
      case 'PageUp':
        flag = true;
        stepForward(10);
        break;
      case 'Home':
        flag = true;
        handleSeekTrack(0);
        break;
      case 'End':
        flag = true;
        handleSeekTrack(duration - 0.1);
        break;
      default:
        return;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  } */

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {iconNode}
      <SRT>{label}</SRT>
    </button>
  );
};

export default PlayButton;
