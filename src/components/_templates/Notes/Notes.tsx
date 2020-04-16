import React from 'react';
import PostExcerpt from '$components/PostExcerpt';
import { Section, H1, H3 } from '$components/Heading';
import Layout from '$components/Layout';
import Pagination from '$components/Pagination';
import SEO from '$components/SEO';
import { formatReadingTime, getBem } from '$lib/utils';
import { NotesProps } from './index';
import './Notes.scss';

let bem = getBem('NotesTemplate');

const Notes: React.FC<NotesProps> = ({
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

  // Only the first page will have a featured (lastest) post
  const hasFeaturedPost = !nextPagePath;
  const firstPost = posts[0].node;

  return (
    <Layout className={bem()}>
      <SEO />

      {hasFeaturedPost && (
        <Section wrap={true}>
          <H3 className={bem({ el: 'section-heading', featured: true })}>
            Latest Note
          </H3>
          <Section>
            <PostExcerpt
              isFeatured={true}
              banner={firstPost.frontmatter.banner}
              title={firstPost.frontmatter.title}
              slug={firstPost.fields.slug}
              date={firstPost.frontmatter.date}
              // timeToRead={formatReadingTime(firstPost.timeToRead)}
              excerpt={firstPost.frontmatter.description}
              contentType={contentType}
            />
          </Section>
        </Section>
      )}

      <Section className={bem({ el: 'post-grid' })} wrap={true}>
        {hasFeaturedPost && (
          <H3 className={bem({ el: 'section-heading', older: true })}>
            Older Notes
          </H3>
        )}
        <Section>
          {posts.map(({ node: post }: any, index) => {
            return (
              !(hasFeaturedPost && index === 0) && (
                <PostExcerpt
                  key={post.fields.slug}
                  banner={post.frontmatter.banner}
                  title={post.frontmatter.title}
                  slug={post.fields.slug}
                  date={post.frontmatter.date}
                  // timeToRead={formatReadingTime(post.timeToRead)}
                  excerpt={post.frontmatter.description}
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

export default Notes;
