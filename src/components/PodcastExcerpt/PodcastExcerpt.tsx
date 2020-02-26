import React, { Fragment } from 'react';
import Img from 'gatsby-image';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { HT, H2 } from '$components/Heading';
import { unSlashIt, getBem } from '$lib/utils';
import { PodcastExcerptProps } from './index';
import './PodcastExcerpt.scss';

let bem = getBem('PodcastExcerpt');

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
      className={bem({ 'is-featured': isFeatured }, className)}
      {...props}
    >
      {isFeatured && banner ? (
        <div className={bem({ el: 'banner-wrapper' })} aria-hidden>
          <Link
            aria-label={`Listen to "${title}"`}
            to={permalink}
            tabIndex={-1}
          >
            <img src={banner} alt="" />
          </Link>
        </div>
      ) : null}
      <div className={bem({ el: 'inner-wrapper' })}>
        <header>
          <H className={bem({ el: 'heading', 'is-featured': isFeatured })}>
            <Link to={permalink}>{title}</Link>
          </H>
          <span className={bem({ el: 'episode-info' })}>
            {date}
            {` • ${timeToListen}`}
          </span>
        </header>
        <div>
          <p
            className={bem({ el: 'desc' })}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {audioUrl && (
            <audio className={bem({ el: 'audio' })} controls>
              <source src={audioUrl} />
            </audio>
          )}
          <span>
            <Link
              className={bem({ el: 'listen-link' })}
              to={permalink}
              rel="bookmark"
              tabIndex={-1}
            >
              {typeof listenLinkText === 'function'
                ? listenLinkText(title)
                : title}
            </Link>
            {includeAllLink && (
              <Link className={bem({ el: 'listen-link' })} to="/podcast">
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
