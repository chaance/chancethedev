import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { rem, rgba } from 'polished';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import { HT } from '$components/Heading';
import Pagination from '$components/Pagination';
import PostMeta from '$components/PostMeta';
import config from '$src/../config';
import {
  breakpoint,
  makeContentGrid,
  GLOBAL_MARGIN,
  // GLOBAL_MARGIN,
} from '$lib/styles';
import { Frontmatter } from '$lib/types';
import { rhythm, fonts } from '$lib/typography';
import { formatReadingTime } from '$lib/utils';
import { BlogPostProps } from './index';

const BlogPost: React.FC<BlogPostProps> = ({
  data: {
    site,
    mdx,
    allAuthors: { edges: authors },
  },
  pageContext: { next, prev },
}) => {
  const frontmatter = mdx.frontmatter;
  const timeToRead = mdx.timeToRead;
  const { author: authorSlug, date, title, banner, description } = frontmatter;
  const authorNode = authors.find(
    ({ node }) => node.slug === (authorSlug || config.author.id)
  );
  console.log({ next, prev });
  const authorObject = authorNode ? authorNode.node : null;
  return (
    <Layout frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <PostWrapper>
        <Header>
          <HeaderInner>
            {banner && (
              <BannerWrapper>
                <Img
                  sizes={banner.childImageSharp.fluid}
                  alt={site.siteMetadata.keywords.join(', ')}
                />
              </BannerWrapper>
            )}
            <PostTitle level={1}>{title}</PostTitle>
            {description ? (
              <Description
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}
            {authorObject && (
              <StyledPostMeta
                author={authorObject}
                date={date}
                append={[formatReadingTime(timeToRead)]}
              />
            )}
          </HeaderInner>
        </Header>
        <ContentArea>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </ContentArea>
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
  position: relative;

  ${breakpoint('large')} {
    @supports (display: grid) {
      /*
       * We need to offset the header by the width of the global margin to
       * prevent the top margin from being pushed up when the user scrolls to
       * the bottom of the post.
       */
      min-height: calc(100% + ${rhythm(GLOBAL_MARGIN)});
    }
  }
`;

export const HeaderInner = styled.div`
  @supports (display: grid) {
    ${breakpoint('large')} {
      position: sticky;
      top: ${rhythm(GLOBAL_MARGIN)};
      height: calc(100vh - ${rhythm(GLOBAL_MARGIN * 2)});
    }
  }
`;

export const ContentArea = styled.div`
  grid-area: content;

  ${breakpoint('medium')} {
    font-size: ${rem(18)};
  }

  ${breakpoint('large')} {
    font-size: ${rem(20)};
  }
`;

export const BannerWrapper = styled.figure`
  position: relative;
  margin: 0 0 ${rhythm(GLOBAL_MARGIN / 2)};
  overflow: hidden;
  box-shadow: ${`0 ${rem(10)} ${rem(40)} ${rem(-20)} ${rgba('#000', 0.425)}`};
`;

export const Description = styled('p')`
  font-family: ${fonts.sans};
  font-size: ${rem(18)};
  color: ${({ theme }) => theme.colors.lightText};
  margin: ${rhythm(1 / 2)} 0;

  ${breakpoint('medium')} {
    font-size: ${rem(20)};
  }
`;

export const PostTitle = styled(HT)`
  margin: 0 0 ${rhythm(1 / 2)};
`;

export const StyledPostMeta = styled(PostMeta)`
  margin: ${rhythm(1 / 2)} 0;
  padding-bottom: ${rhythm(1 / 2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${breakpoint('medium')} {
    margin: ${rhythm(1)} 0;
    padding-bottom: ${rhythm(1)};
  }

  ${breakpoint('xxlarge')} {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }
`;
