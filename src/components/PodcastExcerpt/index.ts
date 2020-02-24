import { Element } from '$lib/types';

export { default } from './PodcastExcerpt';

export interface PodcastExcerptProps extends Element<'article'> {
  banner?: any;
  date: string;
  description: string;
  includeAllLink?: boolean;
  isFeatured?: boolean;
  slug: string;
  timeToListen: string;
  title: string;
  listenLinkText?: ((title: string) => React.ReactNode) | string;
  audioUrl?: string;
}
