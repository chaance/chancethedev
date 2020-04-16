import { Element } from '$lib/types';

export { default } from './PostExcerpt';

export type ContentType = 'notes' | 'talks' | 'workshops' | 'podcast';

export interface PostExcerptProps extends Element<'article'> {
  audioUrl?: string;
  banner?: any;
  contentType?: ContentType;
  date: string;
  excerpt?: string;
  includeAllLink?: boolean;
  isFeatured?: boolean;
  slug: string;
  timeToRead?: string;
  title: string;
  renderReadMore?(title: string): React.ReactNode;
}
