import React from 'react';
import VolumeButton from './VolumeButton';
import VolumeRange from './VolumeRange';

import { Element } from '$lib/types';

interface VolumeControlProps extends Omit<Element<'div'>, 'onVolumeChange'> {
  onToggleMute: Function;
  onVolumeChange?: Function;
  audioTrack: any;
  isMuted?: boolean;
  volume: number;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  onVolumeChange,
  onToggleMute,
  audioTrack,
  isMuted = false,
  volume = 1,
  children,
  ...props
}) => {
  function handleVolumeChange(event: React.SyntheticEvent<any, Event>) {
    const xPos = parseFloat((event.target as HTMLInputElement).value) / 100;
    const mute = xPos <= 0 && !isMuted;

    if (audioTrack && !isNaN(audioTrack.audio.volume)) {
      audioTrack.audio.volume = xPos;
      audioTrack.audio.muted = mute;
    }

    if (mute !== isMuted) {
      onToggleMute && onToggleMute(mute, event);
    }

    onVolumeChange && onVolumeChange(xPos, event);
  }

  function handleMute(event: React.MouseEvent) {
    if (audioTrack && !isNaN(audioTrack.audio.muted)) {
      audioTrack.audio.muted = !audioTrack.audio.muted;
    }
    onToggleMute && onToggleMute(!isMuted, event);
  }

  let value = volume * 100 || 0;

  if (value < 0 || isMuted) {
    value = 0;
  }

  if (value > 100) {
    value = 100;
  }

  return (
    <div {...props}>
      {children && typeof children === 'function' ? (
        children({
          handleMute,
          handleVolumeChange,
          isMuted,
          value,
          volume,
        })
      ) : (
        <React.Fragment>
          <VolumeButton
            onClick={handleMute}
            isMuted={isMuted}
            volume={volume}
          />
          <div>
            <VolumeRange onChange={handleVolumeChange} value={value} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default VolumeControl;
