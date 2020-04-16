import * as React from 'react';
import cx from 'classnames';
import Img from 'gatsby-image';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { HT, H2, H4 } from '$components/Heading';
import { unSlashIt, getBem } from '$lib/utils';
import { PostExcerptProps, ContentType } from './index';
import { sprintf } from 'sprintf-js';

const styles = require('./PostExcerpt.module.scss');

const languageMap: LanguageMap = {
  notes: {
    plural: 'notes',
    time: '%s to read',
    linkLabel: 'Read "%s"',
    allLinkLabel: 'See All %s',
  },
  podcast: {
    plural: 'episodes',
    time: '%s to listen',
    linkLabel: 'Listen to "%s"',
    allLinkLabel: 'See All %s',
  },
};

const defaultMore = (title: string) => (
  <React.Fragment>
    Read More<VH> from {`"${title}"`}</VH>
  </React.Fragment>
);

const PostExcerpt: React.FC<PostExcerptProps> = ({
  audioUrl,
  banner,
  className,
  contentType = 'notes',
  date,
  excerpt,
  includeAllLink,
  isFeatured,
  renderReadMore = defaultMore,
  slug,
  timeToRead,
  title,
  ...props
}) => {
  let langMap = languageMap[contentType] || languageMap.notes!;

  // For audio, listen time will be pulled from the audio embed directly
  let [timeToListen, setTimeToListen] = React.useState<null | number>(null);
  let audioRef = React.useRef<HTMLAudioElement>(null);

  let time =
    contentType === 'podcast'
      ? timeToListen != null
        ? timeToRoundedMinutes(timeToListen)
        : null
      : timeToRead;

  let permalink = `/${contentType}/${unSlashIt(slug)}`;

  let H = isFeatured ? HT : H4;

  return (
    <article
      className={cx(className, 'PostExcerpt', styles.wrapper, {
        [styles.isFeatured]: isFeatured,
      })}
      {...props}
    >
      {isFeatured && banner ? (
        <div className={styles.bannerWrapper}>
          <Link
            className={styles.bannerLink}
            aria-label={sprintf(langMap.linkLabel, title)}
            to={permalink}
            tabIndex={-1}
          >
            {banner.childImageSharp ? (
              <Img sizes={banner.childImageSharp.fluid} alt="" />
            ) : (
              <img src={banner} alt="" />
            )}
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
            <Link className="shadow-link" to={permalink}>
              {title}
            </Link>
          </H>
          <span className={styles.postInfo}>
            {[
              date,
              time != null ? sprintf(langMap.time, `${time} minutes`) : false,
            ]
              .filter(Boolean)
              .join(' • ')}
          </span>
        </header>
        <div>
          {excerpt && (
            <p
              className={styles.excerpt}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          )}
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
            <span>
              <Link
                className={cx(styles.footerLink, styles.moreLink)}
                to={permalink}
                rel="bookmark"
                tabIndex={-1}
              >
                {renderReadMore(title)}
              </Link>
            </span>
            {includeAllLink && (
              <span>
                <Link
                  className={cx(styles.footerLink, styles.allLink)}
                  to={`/${contentType}`}
                >
                  {sprintf(langMap.allLinkLabel, langMap.plural)}
                </Link>
              </span>
            )}
          </span>
        </div>
      </div>
    </article>
  );
};

// function sprintf(string: string, ...placeholders: string[]) {

// }

export default PostExcerpt;

type LanguageMap = {
  [key in ContentType]?: {
    plural: string;
    time: string;
    linkLabel: string;
    allLinkLabel: string;
  };
};

function timeToRoundedMinutes(time: number) {
  return Math.floor(time / 60);
}
