import React, { useRef } from 'react';
import {
  SliderProps,
  SliderHandle,
  SliderInput,
  SliderInputProps,
  SliderTrack,
  SliderTrackHighlight,
  SLIDER_HANDLE_ALIGN_CONTAIN,
} from '@reach/slider';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { rgba, rem } from 'polished';
import { Element } from '$lib/types';
import '@reach/slider/styles.css';

// TODO: Remove Omit hack after reach is updated
interface VolumeRangeProps extends Omit<SliderInputProps, 'ref' | 'children'> {}

export const VolumeRange: React.FC<VolumeRangeProps> = ({
  min = 0,
  max = 100,
  step = 1,
  ...props
}) => {
  return (
    <StyledRange
      min={min}
      max={max}
      step={step}
      handleAlignment={SLIDER_HANDLE_ALIGN_CONTAIN}
      {...props}
    >
      <StyledTrack>
        <StyledTrackHighlight />
        <StyledHandle />
      </StyledTrack>
    </StyledRange>
  );
};

export default VolumeRange;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const StyledTrack = styled(SliderTrack)`
  background: ${({ theme }) => rgba(theme.colors.text, 0.2)};
  height: 0.5em;
  border-radius: 0.25em;
  overflow: hidden;
`;

const StyledTrackHighlight = styled(SliderTrackHighlight)`
  background: ${({ theme }) => theme.colors.primary};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const StyledHandle = styled(SliderHandle)`
  height: 0.5em;
  width: 0.5em;
  border: 0;
  border-radius: 0.5em;
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  appearance: none;
`;

export const StyledRange = styled(SliderInput)`
  height: 0.5em;
  border: 0;
  background: 0;
  user-select: none !important;
  cursor: default;
  appearance: none;
  width: 100%;
  padding: 0;
`;
