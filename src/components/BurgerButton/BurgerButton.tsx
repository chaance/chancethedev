import React from 'react';
import styled from '@emotion/styled';
import VH from '@reach/visually-hidden';
import { BurgerButtonProps } from './index';

// Values are in pixels.
// NOTE: Using rem values here will create unexpected spacing and size inconsistencies
//       between lines. If you need the burger to scale, you'll need to do it manually
//       using ResizeObserver
const defaultProps = {
  lineHeight: 2,
  buttonWidth: 18,
  gutter: 4,
};

const BurgerButton: React.FC<BurgerButtonProps> = ({
  children,
  lineHeight = defaultProps.lineHeight,
  buttonWidth = defaultProps.buttonWidth,
  gutter = defaultProps.gutter,
  onClick,
  setActive,
  active,
  ...props
}) => {
  return (
    <Button
      {...props}
      lineHeight={lineHeight}
      buttonWidth={buttonWidth}
      gutter={gutter}
      onClick={event => {
        onClick && onClick(event);
        setActive(!active);
      }}
      setActive={setActive}
      active={active}
    >
      <VH>{children}</VH>
      <span className="line" aria-hidden />
    </Button>
  );
};

export default BurgerButton;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const Button = styled('button')<BurgerButtonProps>`
  width: ${({ buttonWidth }) => buttonWidth};
  height: ${({ lineHeight, gutter }) => lineHeight! * 3 + gutter! * 2};
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: 0;
  box-shadow: none;

  .line {
    display: block;
    ${({ active, buttonWidth, lineHeight, gutter, theme }) => {
      const userSelect = 'none';
      const transitionDuration = 300;
      const backgroundColor =
        theme.activeTheme === 'dark' ? theme.colors.white : theme.colors.black;

      const getTransform = (which: 'before' | 'after') => {
        const activeTranslate =
          which === 'before'
            ? gutter! + lineHeight!
            : (gutter! + lineHeight!) * -1;
        const activeRotate = which === 'before' ? '45deg' : '-45deg';
        return `translateY(${active ? `${activeTranslate}px` : 0}) rotate(${
          active ? activeRotate : 0
        })`;
      };

      return {
        position: 'relative',
        marginTop: lineHeight! + gutter!,
        marginBottom: lineHeight! + gutter!,
        width: buttonWidth!,
        height: lineHeight!,
        backgroundColor: active ? 'transparent' : backgroundColor,
        WebkitUserSelect: userSelect,
        MozUserSelect: userSelect,
        msUserSelect: userSelect,
        userSelect,

        '&, &::before, &::after': {
          display: 'block',
          borderRadius: 0,
          transitionProperty: 'background-color, transform',
          transitionDuration: `${transitionDuration}ms`,
        },

        '&::before, &::after': {
          position: 'absolute',
          width: 'inherit',
          height: 'inherit',
          content: '""',
          backgroundColor,
        },

        '&::before': {
          top: (lineHeight! + gutter!) * -1,
          Webkittransform: getTransform('before'),
          transform: getTransform('before'),
        },

        '&::after': {
          top: lineHeight! + gutter!,
          Webkittransform: getTransform('after'),
          transform: getTransform('after'),
        },
      };
    }}
  }
`;
