import { Element } from '$lib/types';

export { default } from './NotesPostExcerpt';

export interface NotesPostExcerptProps extends Element<'article'> {
  isFeatured?: boolean;
  banner?: any;
  title: string;
  slug: string;
  date: string;
  timeToRead: string;
  spoiler: string;
  contentType?: string;
}
