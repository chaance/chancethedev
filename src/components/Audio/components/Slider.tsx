import React, { createContext, useRef, useState, forwardRef } from 'react';
import classNames from 'classnames';
import { getPointerPosition } from '../utils';
import { wrapEvent } from '$lib/utils';

interface SliderProps {
  stepForward(amount?: number | 'max'): void;
  stepBack(amount?: number | 'min'): Function;
  sliderActive?: Function;
  sliderInactive?: Function;
  onKeyDown?: Function;
  onMouseUp?: Function;
  onMouseDown?: Function;
  onMouseMove: Function;
  onFocus?: Function;
  onBlur?: Function;
  onClick: Function;
  max?: number;
  min?: number;
  getPercent?: Function;
  vertical: boolean;
  children: React.ReactNode;
  label: string;
  value: number;
  valueText?: string;
}

const initialContext = {
  min: 0,
  max: 100,
  progress: 0,
  percentage: '0%',
  active: false,
  calculateDistance: (...args: any) => null as any,
};

export const SliderContext = createContext(initialContext);

export const Slider: React.FC<SliderProps> = forwardRef(function Slider(
  {
    getPercent,
    onFocus,
    label,
    max,
    min,
    onBlur,
    onClick,
    onKeyDown,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    sliderActive,
    sliderInactive,
    stepBack,
    stepForward,
    value,
    valueText,
    vertical,
    children,
  },
  forwardedRef
) {
  const [active, setActive] = useState(false);
  const ownRef = useRef();
  const ref = (forwardedRef as React.MutableRefObject<any>) || ownRef;
  const cleanup = () => {
    document.removeEventListener('mousemove', handleMouseMove as any, true);
    document.removeEventListener('mouseup', handleMouseUp as any, true);
    document.removeEventListener('touchmove', handleMouseMove as any, true);
    document.removeEventListener('touchend', handleMouseUp as any, true);
    document.removeEventListener('keydown', handleKeyDown as any, true);
  };

  function getProgress() {
    if (!getPercent) {
      return 0;
    }

    const currentProgress = getPercent();
    return typeof currentProgress !== 'number' ||
      currentProgress < 0 ||
      currentProgress === Infinity
      ? 0
      : currentProgress;
  }

  const { progress, percentage } = React.useMemo(() => {
    const currentProgress = getProgress();
    const currentPercentage = `${(currentProgress * 100).toFixed(2)}%`;
    return { progress: currentProgress, percentage: currentPercentage };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPercent, getProgress]);

  const handleMouseDown = wrapEvent(onMouseDown as any, (event: any) => {
    // event.preventDefault();
    // event.stopPropagation();

    document.addEventListener('mousemove', handleMouseMove as any, true);
    document.addEventListener('mouseup', handleMouseUp as any, true);
    document.addEventListener('touchmove', handleMouseMove as any, true);
    document.addEventListener('touchend', handleMouseUp as any, true);
    setActive(true);
    sliderActive && sliderActive(event);
    handleMouseMove(event);
  });

  const handleMouseMove = onMouseMove;

  const handleMouseUp = wrapEvent(onMouseUp as any, event => {
    // On iOS safari, a subsequent mouseup event will be fired after touchend.
    // Its weird event positions make the player seek a wrong time.
    // calling preventDefault (at touchend phase) will prevent the mouseup event
    event.preventDefault();
    cleanup();
    setActive(false);
    sliderInactive && sliderInactive(event);
  });

  const handleFocus = wrapEvent(onFocus as any, event => {
    document.addEventListener('keydown', handleKeyDown, true);
  });

  const handleBlur = wrapEvent(onBlur as any, e => {
    document.removeEventListener('keydown', handleKeyDown, true);
  });

  const handleClick = wrapEvent(onClick as any, event => {
    event.preventDefault();
    // event.stopPropagation();
  });

  const handleKeyDown = wrapEvent(onKeyDown as any, (event: any) => {
    let flag = false;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        flag = true;
        stepForward();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        flag = true;
        stepBack();
        break;
      case 'PageDown':
        flag = true;
        stepBack(10);
        break;
      case 'PageUp':
        flag = true;
        stepForward(10);
        break;
      case 'Home':
        flag = true;
        stepBack('min');
        break;
      case 'End':
        flag = true;
        stepForward('max');
        break;
      default:
        return;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  function calculateDistance(event: any) {
    if (ref && ref.current) {
      const { x, y } = getPointerPosition(ref.current, event);
      return vertical ? y : x;
    }
    return null;
  }

  return (
    <SliderContext.Provider
      value={{
        min: min!,
        max: max!,
        progress,
        percentage,
        active,
        calculateDistance,
      }}
    >
      <div
        ref={ref}
        tabIndex={0}
        role="slider"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        aria-label={label}
        aria-valuenow={value}
        aria-valuetext={valueText || String(value)}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
});

export default Slider;
