import { Element, AuthorNode } from '$lib/types';
export { default } from './PostMeta';

export interface PostMetaProps extends Element<'div'> {
  author?: AuthorNode;
  date?: string;
  append?: React.ReactNode[];
}
