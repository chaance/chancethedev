import { useEffect, useRef } from 'react';

/**
 * Store a component's previous value in a ref for use after the value changes.
 */
export function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}
