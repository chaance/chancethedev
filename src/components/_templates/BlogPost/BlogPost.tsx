import React from 'react';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import { HT } from '$components/Heading';
import PostMeta from '$components/PostMeta';
import config from '$src/../config';
import { formatReadingTime, getBem } from '$lib/utils';
import { BlogPostProps } from './index';
import './BlogPost.scss';

let bem = getBem('BlogPostTemplate');

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
  const authorObject = authorNode ? authorNode.node : null;
  return (
    <Layout className={bem()} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article className={bem({ el: 'post-wrapper' })}>
        <header className={bem({ el: 'header' })}>
          <div className={bem({ el: 'header-inner' })}>
            {banner && (
              <figure className={bem({ el: 'banner-wrapper' })}>
                <Img
                  sizes={banner.childImageSharp.fluid}
                  alt={site.siteMetadata.keywords.join(', ')}
                />
              </figure>
            )}
            <HT className={bem({ el: 'post-title' })} level={1}>
              {title}
            </HT>
            {description ? (
              <p
                className={bem({ el: 'description' })}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}
            {authorObject && (
              <PostMeta
                className={bem({ el: 'PostMeta' })}
                author={authorObject}
                date={date}
                append={[formatReadingTime(timeToRead)]}
              />
            )}
          </div>
        </header>
        <div className={bem({ el: 'content-area' })}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
