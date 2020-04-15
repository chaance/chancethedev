import React from 'react';
import cx from 'classnames';
import Img from 'gatsby-image';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { HT, H2 } from '$components/Heading';
import { unSlashIt, getBem } from '$lib/utils';
import { NotesPostExcerptProps } from './index';

const styles = require('./NotesPostExcerpt.module.scss');

const NotesPostExcerpt: React.FC<NotesPostExcerptProps> = ({
  banner,
  className,
  title,
  slug,
  date,
  timeToRead,
  spoiler,
  isFeatured,
  contentType = 'notes',
  ...props
}) => {
  const permalink = `/${contentType}/${unSlashIt(slug)}`;
  const H = isFeatured ? HT : H2;
  return (
    <article
      className={cx(className, 'NotesPostExcerpt', styles.wrapper, {
        [styles.isFeatured]: isFeatured,
      })}
      {...props}
    >
      {isFeatured && banner ? (
        <div className={styles.bannerWrapper}>
          <Link
            className={styles.bannerLink}
            aria-label={`Read "${title}"`}
            to={permalink}
            tabIndex={-1}
          >
            <Img sizes={banner.childImageSharp.fluid} />
          </Link>
        </div>
      ) : null}
      <div className={styles.innerWrapper}>
        <header>
          <H
            className={cx(styles.heading, {
              [styles.headingFeatured]: isFeatured,
            })}
          >
            <Link className="shadow-link" to={permalink}>{title}</Link>
          </H>
          <span className={styles.postInfo}>
            {date}
            {` • ${timeToRead}`}
          </span>
        </header>
        <div>
          <p
            className={styles.spoiler}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: spoiler }}
          />
          <span className={styles.linkWrapper}>
            <Link
              className={styles.moreLink}
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

export default NotesPostExcerpt;
