import { Element } from '$lib/types';

export { default } from './BlogPostExcerpt';

export interface BlogPostExcerptProps extends Element<'article'> {
  isFeatured?: boolean;
  banner?: any;
  title: string;
  slug: string;
  date: string;
  timeToRead: string;
  spoiler: string;
  contentType?: string;
}
