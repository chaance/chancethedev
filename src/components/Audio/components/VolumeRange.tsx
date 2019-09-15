import React from 'react';
import { Element } from '$lib/types';

interface VolumeRangeProps extends Element<'input'> {}

export const VolumeRange: React.FC<VolumeRangeProps> = ({
  min = 0,
  max = 100,
  step = 1,
  ...props
}) => {
  return <input min={min} max={max} step={step} {...props} type="range" />;
};

export default VolumeRange;
