import { Element } from '$lib/types';

export { default } from './Pagination';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface PaginationProps extends Element<'nav'> {
  previousPagePath?: string | null;
  previousAriaLabel?: string | null;
  previousLabel?: string | null;
  nextPagePath?: string | null;
  nextAriaLabel?: string | null;
  nextLabel?: string | null;
}
