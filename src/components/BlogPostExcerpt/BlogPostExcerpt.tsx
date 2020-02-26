import React from 'react';
import Img from 'gatsby-image';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { HT, H2 } from '$components/Heading';
import { unSlashIt, getBem } from '$lib/utils';
import { BlogPostExcerptProps } from './index';
import './BlogPostExcerpt.scss';

let bem = getBem('BlogPostExcerpt');

const BlogPostExcerpt: React.FC<BlogPostExcerptProps> = ({
  banner,
  className,
  title,
  slug,
  date,
  timeToRead,
  spoiler,
  isFeatured,
  contentType = 'blog',
  ...props
}) => {
  const permalink = `/${contentType}/${unSlashIt(slug)}`;
  const H = isFeatured ? HT : H2;
  return (
    <article
      className={bem({ 'is-featured': isFeatured }, className)}
      {...props}
    >
      {isFeatured && banner ? (
        <div className={bem({ el: 'banner-wrapper' })}>
          <Link
            className={bem({ el: 'banner-link' })}
            aria-label={`Read "${title}"`}
            to={permalink}
            tabIndex={-1}
          >
            <Img sizes={banner.childImageSharp.fluid} />
          </Link>
        </div>
      ) : null}
      <div className={bem({ el: 'inner-wrapper' })}>
        <header>
          <H className={bem({ el: 'heading', 'is-featured': isFeatured })}>
            <Link to={permalink}>{title}</Link>
          </H>
          <span className={bem({ el: 'post-info' })}>
            {date}
            {` • ${timeToRead}`}
          </span>
        </header>
        <div>
          <p
            className={bem({ el: 'spoiler' })}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: spoiler }}
          />
          <span>
            <Link
              className={bem({ el: 'more-link' })}
              to={permalink}
              rel="bookmark"
              tabIndex={-1}
            >
              Read More<VH> from {`"${title}"`}</VH>
            </Link>
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogPostExcerpt;
