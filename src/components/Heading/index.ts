import { Element } from '$lib/types';

import * as Headings from './Heading';
export * from './Heading';
export default Headings;

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
