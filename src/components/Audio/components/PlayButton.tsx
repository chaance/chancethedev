import React from 'react';
import { PlayIcon, PauseIcon, LoadingIcon } from '$components/Icons';
import SRT from '$components/SRT';
import { Element } from '$lib/types';

interface PlayButtonProps extends Element<'button'> {
  playing?: boolean;
  seeking?: boolean;
  playReady: boolean;
  audioTrack: any;
  currentTime: number;
  onTogglePlay?: Function;
  seekingIcon?: JSX.Element;
  isMuted?: boolean;
  streamUrl?: string;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  playing = false,
  seeking = false,
  playReady,
  audioTrack,
  onTogglePlay,
  currentTime,
  seekingIcon,
  isMuted,
  streamUrl,
  ...props
}) => {
  function handleClick(event: any) {
    if (!playReady) return;
    if (!playing) {
      audioTrack &&
        audioTrack.play({
          playlistIndex: audioTrack._playlistIndex,
        });
    } else {
      audioTrack && audioTrack.pause();
    }
    onTogglePlay && onTogglePlay(event);
  }

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

  return (
    <button type="button" onClick={handleClick} disabled={disabled} {...props}>
      {iconNode}
      <SRT>{label}</SRT>
    </button>
  );
};

export default PlayButton;
