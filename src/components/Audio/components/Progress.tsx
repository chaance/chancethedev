import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Element } from '$lib/types';
import { getPointerPosition } from '../utils';

interface ProgressProps extends Element<'div'> {
  currentTime?: number;
  duration?: number;
  value?: number;
  handleSeekTrack: Function;
  togglePlay: Function;
}

export const Progress: React.FC<ProgressProps> = ({
  handleSeekTrack,
  duration = 0,
  currentTime = 0,
  value = 0,
  togglePlay,
  ...props
}) => {
  const ref = useRef(null);

  const cleanup = () => {
    document.removeEventListener('mousemove', handleMouseMove as any, true);
    document.removeEventListener('mouseup', handleMouseUp as any, true);
    document.removeEventListener('touchmove', handleMouseMove as any, true);
    document.removeEventListener('touchend', handleMouseUp as any, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  function calculateDistance(event: any) {
    if (ref && ref.current) {
      const { x } = getPointerPosition(ref.current as any, event);
      return x;
    }
    return 0;
  }

  function getNewTime(event: any) {
    const distance = calculateDistance(event);
    const newTime = distance * duration;

    // Don't let track end while scrubbing.
    return newTime === duration ? newTime - 0.1 : newTime;
  }

  function handleMouseDown(event: any) {
    // event.preventDefault();
    // event.stopPropagation();
    document.addEventListener('mousemove', handleMouseMove as any, true);
    document.addEventListener('mouseup', handleMouseUp as any, true);
    document.addEventListener('touchmove', handleMouseMove as any, true);
    document.addEventListener('touchend', handleMouseUp as any, true);
    handleMouseMove(event);
  }

  function handleMouseMove(event: any) {
    const newTime = getNewTime(event);
    handleSeekTrack(newTime, event);
  }

  function handleMouseUp(event: any) {
    event.preventDefault();
    const newTime = getNewTime(event);
    handleSeekTrack(newTime, event);
    cleanup();
  }

  function handleClick(event: any) {
    event.preventDefault();
    if (ref.current) {
      (ref.current as any).focus();
    }
  }

  function stepForward(step: number = 1) {
    const multiplier = 100 / duration;
    const advance = step * multiplier * 100;
    handleSeekTrack(Math.min(duration - 0.1, currentTime + advance));
  }

  function stepBack(step: number = 1) {
    const multiplier = 100 / duration;
    const rewind = step * multiplier * 100;
    handleSeekTrack(Math.max(0, currentTime - rewind));
  }

  function handleKeyDown(event: any) {
    let flag = false;
    switch (event.key) {
      case 'Enter':
      case ' ':
        flag = true;
        togglePlay();
        break;
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
        handleSeekTrack(0);
        break;
      case 'End':
        flag = true;
        handleSeekTrack(duration - 0.1);
        break;
      default:
        return;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  let width = value;
  if (!value && currentTime && duration)
    width = (currentTime / duration) * 100 || 0;
  if (value < 0) width = 0;
  if (value > 100) width = 100;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={ref}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...props}
    >
      <div className="inner" style={{ width: `${width}%` }} />
    </div>
  );
};

export default Progress;
