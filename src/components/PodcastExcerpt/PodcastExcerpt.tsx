import React, { Fragment } from 'react';
import cx from 'classnames';
import Img from 'gatsby-image';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { HT, H2 } from '$components/Heading';
import { unSlashIt, getBem } from '$lib/utils';
import { PodcastExcerptProps } from './index';

const styles = require('./PodcastExcerpt.module.scss');

const PodcastExcerpt: React.FC<PodcastExcerptProps> = ({
  audioUrl,
  banner,
  className,
  title,
  slug,
  date,
  timeToListen,
  description,
  includeAllLink,
  isFeatured,
  listenLinkText = t => (
    <Fragment>
      Listen Now<VH> to {`"${t}"`}</VH>
    </Fragment>
  ),
  ...props
}) => {
  const permalink = `/podcast/${unSlashIt(slug)}`;
  const H = isFeatured ? HT : H2;
  return (
    <article
      className={cx(className, 'PodcastExcerpt', styles.wrapper, {
        [styles.isFeatured]: isFeatured,
      })}
      {...props}
    >
      {isFeatured && banner ? (
        <div className={styles.bannerWrapper} aria-hidden>
          <Link
            aria-label={`Listen to "${title}"`}
            to={permalink}
            tabIndex={-1}
          >
            <img src={banner} alt="" />
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
            <Link to={permalink}>{title}</Link>
          </H>
          <span className={styles.episodeInfo}>
            {date}
            {` • ${timeToListen}`}
          </span>
        </header>
        <div>
          <p
            className={styles.desc}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {audioUrl && (
            <audio className={styles.audio} controls>
              <source src={audioUrl} />
            </audio>
          )}
          <span>
            <Link
              className={styles.listenLink}
              to={permalink}
              rel="bookmark"
              tabIndex={-1}
            >
              {typeof listenLinkText === 'function'
                ? listenLinkText(title)
                : title}
            </Link>
            {includeAllLink && (
              <Link className={styles.listenLink} to="/podcast">
                See All Episodes
              </Link>
            )}
          </span>
        </div>
      </div>
    </article>
  );
};

export default PodcastExcerpt;
