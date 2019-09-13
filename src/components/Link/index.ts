import { GatsbyLinkProps } from 'gatsby-link';
import { Element } from '$lib/types';

export { default } from './Link';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export interface ExternalLinkProps extends Omit<Element<'a'>, 'href'> {
  to: string;
}

// GatsbyLinkProps extends Reach Link, which takes a state object
// @link https://reach.tech/router/api/Link
export interface InternalLinkProps extends GatsbyLinkProps<{}> {}

export type LinkProps = any;
