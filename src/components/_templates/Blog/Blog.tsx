import React from 'react';
import styled from '@emotion/styled';
import BlogPostExcerpt from '$components/BlogPostExcerpt';
import Layout from '$components/Layout';
import Link from '$components/Link';
import SEO from '$components/SEO';
import { GLOBAL_MARGIN, breakpoint } from '$lib/styles';
import { rhythm } from '$lib/typography';
import { formatReadingTime, leadingSlashIt } from '$lib/utils';
import { BlogProps } from './index';

const Blog: React.FC<BlogProps> = ({
  data: { site, allMdx },
  pageContext: { pagination },
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
        <section>
          <SectionHeading>Latest Posts</SectionHeading>
          <BlogPostExcerpt
            isFeatured={true}
            banner={firstPost.frontmatter.banner}
            title={firstPost.frontmatter.title}
            slug={firstPost.fields.slug}
            date={firstPost.frontmatter.date}
            timeToRead={formatReadingTime(firstPost.timeToRead)}
            spoiler={firstPost.frontmatter.description}
          />
        </section>
      )}

      <PostGrid>
        {hasFeaturedPost && <SectionHeading>Older Posts</SectionHeading>}
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
              />
            )
          );
        })}
      </PostGrid>

      <div>
        {nextPagePath && (
          <Link to={leadingSlashIt(nextPagePath)} aria-label="View next page">
            Next Page
          </Link>
        )}
        {previousPagePath && (
          <Link
            to={leadingSlashIt(previousPagePath)}
            aria-label="View previous page"
          >
            Previous Page
          </Link>
        )}
      </div>
      <hr />
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

export const PostGrid = styled.section`
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

export const SectionHeading = styled.h3`
  ${breakpoint('medium')} {
    grid-column: 1 / 3;
  }
  ${breakpoint('xlarge')} {
    grid-column: 1 / 4;
  }
`;
