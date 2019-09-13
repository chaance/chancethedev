import {
  useEffect,
  useLayoutEffect,
  useState,
  DependencyList,
  EffectCallback,
} from 'react';
import { json2mq } from '$lib/utils';

export type Effect = (effect: EffectCallback, deps?: DependencyList) => void;

/**
 * Creates a hook for either `useEffect` or `useLayoutEffect`
 * const isDesktop = useMediaLayout({ minWidth: 500 }, true);
 */
export const createUseMedia = (effect: Effect) => (
  rawQuery: any,
  defaultState: boolean = false
) => {
  const [state, setState] = useState(defaultState);
  const query = json2mq(rawQuery);

  if (typeof window !== 'object') return defaultState;

  effect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

export const useMedia = createUseMedia(useEffect);

export const useMediaLayout = createUseMedia(useLayoutEffect);
