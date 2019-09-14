import React from 'react';
import styled from '@emotion/styled';
import BlogPostExcerpt from '$components/BlogPostExcerpt';
import { Section, H1, H2 } from '$components/Heading';
import Layout from '$components/Layout';
import Link from '$components/Link';
import Pagination from '$components/Pagination';
import SEO from '$components/SEO';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm } from '$lib/typography';
import { formatReadingTime } from '$lib/utils';
import { BlogProps } from './index';

const Blog: React.FC<BlogProps> = ({
  data: { site, allMdx },
  pageContext: { pagination, contentType },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination;

  const posts: any[] = page
    .map((id: any) =>
      allMdx.edges.find(
        (edge: any) =>
          edge.node.id === id && edge.node.parent.sourceInstanceName !== 'pages'
      )
    )
    .filter((post: any) => post !== undefined);

  // Only the first page will have a featured (lastest) blog post
  const hasFeaturedPost = !nextPagePath;
  const firstPost = posts[0].node;

  return (
    <Layout>
      <SEO />

      {hasFeaturedPost && (
        <Section wrap={true}>
          <SectionHeading>Latest Post</SectionHeading>
          <Section>
            <BlogPostExcerpt
              isFeatured={true}
              banner={firstPost.frontmatter.banner}
              title={firstPost.frontmatter.title}
              slug={firstPost.fields.slug}
              date={firstPost.frontmatter.date}
              timeToRead={formatReadingTime(firstPost.timeToRead)}
              spoiler={firstPost.frontmatter.description}
              contentType={contentType}
            />
          </Section>
        </Section>
      )}

      <PostGrid wrap={true}>
        {hasFeaturedPost && (
          <SectionHeading style={{ marginTop: rhythm(GLOBAL_MARGIN) }}>
            Older Posts
          </SectionHeading>
        )}
        <Section>
          {posts.map(({ node: post }: any, index) => {
            return (
              !(hasFeaturedPost && index === 0) && (
                <BlogPostExcerpt
                  key={post.fields.slug}
                  banner={post.frontmatter.banner}
                  title={post.frontmatter.title}
                  slug={post.fields.slug}
                  date={post.frontmatter.date}
                  timeToRead={formatReadingTime(post.timeToRead)}
                  spoiler={post.frontmatter.description}
                  contentType={contentType}
                />
              )
            );
          })}
        </Section>
      </PostGrid>

      {previousPagePath || nextPagePath ? (
        <Pagination
          previousPagePath={previousPagePath}
          nextPagePath={nextPagePath}
        />
      ) : null}
    </Layout>
  );
};

export default Blog;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const PostWrapper = styled.div``;

export const Banner = styled.div`
  margin: ${rhythm(2)} 0;
`;

export const PostTitle = styled.h2``;

export const PostGrid = styled(Section)`
  display: grid;
  gap: ${rhythm(GLOBAL_MARGIN)};
  grid-template: auto / auto;
  ${breakpoint('medium')} {
    grid-template: auto / repeat(2, 1fr);
  }
  ${breakpoint('xlarge')} {
    grid-template: auto / repeat(3, 1fr);
  }
`;

export const SectionHeading = styled(H1)`
  ${breakpoint('medium')} {
    grid-column: 1 / 3;
  }
  ${breakpoint('xlarge')} {
    grid-column: 1 / 4;
  }
`;
