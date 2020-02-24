import React, { forwardRef } from 'react';
import ReactTooltip, { TooltipProps } from '@reach/tooltip';
import styled from '@emotion/styled';
import '@reach/tooltip/styles.css';

// TODO: Remove Omit hack after reach is updated
const Tooltip = forwardRef<HTMLDivElement, Omit<TooltipProps, 'ref'>>(
  (props, ref) => {
    return <StyledTooltip ref={ref} {...props} />;
  }
);

export default Tooltip;

const StyledTooltip = styled(ReactTooltip)``;