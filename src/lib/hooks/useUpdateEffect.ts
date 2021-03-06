import { useRef, useEffect } from 'react';

export function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: readonly any[] | undefined
) {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      effect();
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
