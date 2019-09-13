import { HelmetProps } from 'react-helmet';
import { Frontmatter } from '$lib/types';

export { default } from './SEO';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface SEOProps {
  description?: string;
  frontmatter?: Frontmatter;
  isBlogPost?: boolean;
  lang?: string;
  locale?: string;
  meta?: HelmetProps['meta'];
  postData?: {
    childMarkdownRemark: {
      frontmatter: Frontmatter;
      excerpt?: string;
    };
  };
  postImage?: string;
  title?: string;
}

export interface SchemaOrgProps {
  author: {
    name: string;
  };
  canonicalUrl: string;
  datePublished: string | false;
  defaultTitle: string;
  description: string;
  image: string;
  isBlogPost?: boolean;
  organization: {
    logo?: string;
    name?: string;
    url?: string;
  };
  title: string;
  url: string;
}
