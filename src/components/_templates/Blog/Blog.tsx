import React from 'react';
import BlogPostExcerpt from '$components/BlogPostExcerpt';
import { Section, H1, H2 } from '$components/Heading';
import Layout from '$components/Layout';
import Pagination from '$components/Pagination';
import SEO from '$components/SEO';
import { formatReadingTime, getBem } from '$lib/utils';
import { BlogProps } from './index';
import './Blog.scss';

let bem = getBem('BlogTemplate');

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
    <Layout className={bem()}>
      <SEO />

      {hasFeaturedPost && (
        <Section wrap={true}>
          <H1 className={bem({ el: 'section-heading', featured: true })}>
            Latest Post
          </H1>
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

      <Section className={bem({ el: 'post-grid' })} wrap={true}>
        {hasFeaturedPost && (
          <H1 className={bem({ el: 'section-heading', older: true })}>Older Posts</H1>
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
      </Section>

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
