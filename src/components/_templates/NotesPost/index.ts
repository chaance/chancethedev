import { Frontmatter, AuthorNode } from '$lib/types';

export { default } from './NotesPost';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface NotesPostProps {
  data: {
    site: any;
    allAuthors: {
      edges: {
        node: AuthorNode;
      }[];
    };
    mdx: {
      timeToRead: string;
      frontmatter: Frontmatter;
      body: string;
    };
  };
  pageContext: any;
}
