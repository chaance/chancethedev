import React from 'react';
import { VolumeIconLoud, VolumeIconMute } from '$components/Icons';
import { Element } from '$lib/types';

interface VolumeButtonProps extends Element<'button'> {
  isMuted?: boolean;
  volume: number;
}

export const VolumeButton: React.FC<VolumeButtonProps> = ({
  isMuted,
  volume,
  ...props
}) => {
  let value = volume * 100 || 0;

  if (value < 0 || isMuted) value = 0;
  if (value > 100) value = 100;

  return (
    <button type="button" {...props}>
      {isMuted ? (
        <VolumeIconMute aria-hidden />
      ) : (
        <VolumeIconLoud aria-hidden />
      )}
    </button>
  );
};

export default VolumeButton;
