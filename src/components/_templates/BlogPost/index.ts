import { Frontmatter, AuthorNode } from '$lib/types';

export { default } from './BlogPost';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface BlogPostProps {
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
