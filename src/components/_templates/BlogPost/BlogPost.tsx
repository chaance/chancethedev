import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import config from '$src/../config';
import {
  breakpoint,
  makeContentGrid,
  // GLOBAL_MARGIN,
} from '$lib/styles';
// import { rhythm } from '$lib/typography';
// import { fonts } from '$src/lib/typography';
import { BlogPostProps } from './index';

const BlogPost: React.FC<BlogPostProps> = ({
  data: { site, mdx },
  pageContext: { next, prev },
}) => {
  const author = mdx.frontmatter.author || config.author!.name;
  const date = mdx.frontmatter.date;
  const title = mdx.frontmatter.title;
  const banner = mdx.frontmatter.banner;

  return (
    <Layout frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <PostWrapper>
        <Header>
          {banner && (
            <Banner>
              <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
            </Banner>
          )}
          <PostTitle>{title}</PostTitle>
          <PostMeta>
            {author && <h3>{author}</h3>}
            {author && <span>—</span>}
            {date && <h3>{date}</h3>}
          </PostMeta>
        </Header>
        <ContentArea>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </ContentArea>
        {/* <SubscribeForm /> */}
      </PostWrapper>
    </Layout>
  );
};

export default BlogPost;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const PostWrapper = styled.article`
  ${makeContentGrid('content', 'header')}
`;

export const Header = styled.header`
  grid-area: header;
`;

export const ContentArea = styled.div`
  grid-area: content;

  ${breakpoint('xxlarge')} {
    @supports (display: grid) {
      max-height: 100%;
      overflow-y: auto;
    }
  }
`;

export const Banner = styled.div``;

export const PostTitle = styled.h2``;

export const PostMeta = styled.div``;
