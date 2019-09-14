import { Element } from '$lib/types';

export { default } from './PodcastExcerpt';

export interface PodcastExcerptProps extends Element<'article'> {
  isFeatured?: boolean;
  banner?: any;
  title: string;
  slug: string;
  date: string;
  timeToListen: string;
  description: string;
}
