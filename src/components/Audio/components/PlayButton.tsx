import React from 'react';
import IconButton from '$components/IconButton';
import { PlayIcon, PauseIcon, LoadingIcon } from '$components/Icons';
import { Element } from '$lib/types';

enum PlayerStates {
  Loading = 'LOADING',
  Seeking = 'SEEKING',
  Playing = 'PLAYING',
  Stopped = 'STOPPED',
}

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
  let iconNode: JSX.Element;
  let label: string;
  let state: PlayerStates = !playReady
    ? PlayerStates.Loading
    : seeking && seekingIcon
    ? PlayerStates.Seeking
    : playing
    ? PlayerStates.Playing
    : PlayerStates.Stopped;
  let disabled = !!(seeking && seekingIcon);
  let iconProps = { fill: 'currentColor' };

  switch (state) {
    case PlayerStates.Loading:
      iconNode = <LoadingIcon {...iconProps} />;
      label = 'Loading Audio';
      break;
    case PlayerStates.Seeking:
      iconNode = React.cloneElement(seekingIcon!, iconProps);
      label = 'Seeking';
      break;
    case PlayerStates.Playing:
      iconNode = <PauseIcon {...iconProps} />;
      label = 'Pause';
      break;
    case PlayerStates.Stopped:
    default:
      iconNode = <PlayIcon {...iconProps} />;
      label = 'Play';
      break;
  }

  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      icon={iconNode}
      {...props}
    >
      {iconNode}
      {label}
    </IconButton>
  );
};

export default PlayButton;
