import { useLayoutEffect, useState, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useMeasure = (
  ref: RefObject<HTMLElement | null>,
  deps: any[] = []
) => {
  const [bounds, setContentRect] = useState<DOMRectReadOnly>(
    // DOMRectReadOnly.fromRect()
    { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
  );

  useLayoutEffect((): any => {
    let animationFrameId: number | null = null;
    const measure: ResizeObserverCallback = ([entry]) => {
      animationFrameId = window.requestAnimationFrame(() => {
        setContentRect(entry.contentRect);
      });
    };

    if (ref.current) {
      const ro = new ResizeObserver(measure);
      ro.observe(ref.current);

      return () => {
        window.cancelAnimationFrame(animationFrameId!);
        ro.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return bounds;
};

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}
