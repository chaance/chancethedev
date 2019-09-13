export * from './useAnimationEndListener';
export * from './useBreakpoint';
export * from './useId';
export * from './useInterval';
export * from './usePrevious';
export * from './useMeasure';
export * from './useMedia';
export * from './usePromise';
export * from './useScrollPosition';
export * from './useUpdateEffect';

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

export interface ScrollPosition {
  readonly x: number;
  readonly y: number;
}

export interface UsePromiseState {
  error: any;
  result: any;
  state: PromiseStates;
}

export interface UsePromiseAction {
  type?: PromiseStates;
  payload?: any;
}

export type PromiseStates = 'pending' | 'rejected' | 'resolved';

export type UsePromiseReducer = (
  state: UsePromiseState,
  action: UsePromiseAction
) => UsePromiseState;
