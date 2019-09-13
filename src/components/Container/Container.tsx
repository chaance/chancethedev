import React from 'react';
import styled from '@emotion/styled';
import { rem } from 'polished';
import { rhythm } from '$lib/typography';
import { ContainerProps } from './index';

const Container: React.FC<ContainerProps> = ({
  fullWidth = false,
  maxWidth = rhythm(19),
  ...props
}) => {
  return (
    <Wrapper fullWidth={fullWidth} maxWidth={maxWidth} {...props}>
      {props.children}
    </Wrapper>
  );
};

export default Container;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const Wrapper = styled('div')<ContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'number' ? rem(maxWidth) : maxWidth};
  margin-right: auto;
  margin-left: auto;
`;
