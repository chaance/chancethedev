import React, { Fragment } from 'react';
import VH from '@reach/visually-hidden';
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
        <Fragment>
          <VH>Unmute</VH>
          <VolumeIconMute title="" aria-hidden />
        </Fragment>
      ) : (
        <Fragment>
          <VH>Mute</VH>
          <VolumeIconLoud title="" aria-hidden />
        </Fragment>
      )}
    </button>
  );
};

export default VolumeButton;
