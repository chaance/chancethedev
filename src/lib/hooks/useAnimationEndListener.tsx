import { useEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

export const useAnimationEndListener = (
  element: HTMLElement,
  callback: (ev: AnimationEvent, el: HTMLElement) => any
): any => {
  const handleAnimationEnd = (event: AnimationEvent) => {
    callback(event, element);
  };
  useEffect((): any => {
    if (isBrowser) {
      element.addEventListener('animationend', handleAnimationEnd);
      return () =>
        element.removeEventListener('animationend', handleAnimationEnd);
    }
  }, []);
};
