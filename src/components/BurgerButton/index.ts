import { Element } from '$lib/types';

export { default } from './BurgerButton';
export * from './BurgerButton';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface BurgerButtonProps extends Element<'button'> {
  active: boolean;
  setActive(state: boolean): void;
}
