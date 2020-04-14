import React, { Fragment } from 'react';
import cx from 'classnames';
import Img from 'gatsby-image';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { HT, H2, H4 } from '$components/Heading';
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
  description,
  includeAllLink,
  isFeatured,
  listenLinkText = (t) => (
    <Fragment>
      Listen Now<VH> to {`"${t}"`}</VH>
    </Fragment>
  ),
  ...props
}) => {
  let audioRef = React.useRef<HTMLAudioElement>(null);
  let [timeToListen, setTimeToListen] = React.useState<null | number>(null);
  let permalink = `/podcast/${unSlashIt(slug)}`;
  let H = isFeatured ? HT : H4;
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
            <img src="/images/cover-art-2x.jpg" alt="" />
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
            <Link to={permalink} className="shadow-link">
              {title}
            </Link>
          </H>
          <span className={styles.episodeInfo}>
            {[
              date,
              timeToListen &&
                `${timeToRoundedMinutes(timeToListen)} minute listen`,
            ]
              .filter(Boolean)
              .join(' • ')}
          </span>
        </header>
        <div>
          <p
            className={styles.desc}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {audioUrl && (
            <audio
              className={styles.audio}
              ref={audioRef}
              onLoadedMetadata={(event) => {
                setTimeToListen(audioRef.current!.duration);
              }}
              controls
            >
              <source src={audioUrl} />
            </audio>
          )}
          <span className={styles.linkWrapper}>
            <Link
              className={cx(styles.listenLink)}
              to={permalink}
              rel="bookmark"
              tabIndex={-1}
            >
              {typeof listenLinkText === 'function'
                ? listenLinkText(title)
                : title}
            </Link>
            {includeAllLink && (
              <Link className={cx(styles.listenLink)} to="/podcast">
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

function timeToRoundedMinutes(time: number) {
  return Math.floor(time / 60);
}
