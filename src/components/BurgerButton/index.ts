import { Element } from '$lib/types';

export { default } from './BurgerButton';
export * from './BurgerButton';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface BurgerButtonProps extends Element<'button'> {
  lineHeight?: number;
  buttonWidth?: number;
  gutter?: number;
  active: boolean;
  setActive(state: boolean): void;
}
