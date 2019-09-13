import { Element } from '$lib/types';

export * from './Heading';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export type HLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SectionProps extends Element<'section'> {
  wrap?: boolean;
}

export interface HProps extends Element<'h2'> {
  level?: HLevel
}
