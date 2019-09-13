import React from 'react';
import styled from '@emotion/styled';
import cx from 'classnames';
import Img from 'gatsby-image';
import Link from '$components/Link';
import SRT from '$components/SRT';
import { leadingSlashIt } from '$lib/utils';
import { EmotionTheme } from '$lib/providers';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm } from '$lib/typography';
import { BlogPostExcerptProps } from './index';

const PostExcerpt: React.FC<BlogPostExcerptProps> = ({
  banner,
  className,
  title,
  slug,
  date,
  timeToRead,
  spoiler,
  isFeatured,
  ...props
}) => {
  const W = isFeatured ? FeaturedWrapper : Wrapper;
  const H = isFeatured ? 'h3' : 'h3';
  return (
    <W {...props}>
      {isFeatured && banner ? (
        <BannerWrapper>
          <Link aria-label={`Read "${title}"`} to={leadingSlashIt(slug)}>
            <Img sizes={banner.childImageSharp.fluid} />
          </Link>
        </BannerWrapper>
      ) : null}
      <div>
        <header>
          <H>
            <Link to={leadingSlashIt(slug)}>{title}</Link>
          </H>
          <small>
            {date}
            {` • ${timeToRead}`}
          </small>
        </header>
        <div>
          <p
            className="PostExcerpt__spoiler"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: spoiler }}
          />
          <small className="PostExcerpt__more">
            <Link
              className="PostExcerpt__moreLink"
              to={leadingSlashIt(slug)}
              rel="bookmark"
            >
              Read More<SRT> from {`"${title}"`}</SRT>
            </Link>
          </small>
        </div>
      </div>
    </W>
  );
};

export default PostExcerpt;

export const FeaturedWrapper = styled('article')<{ theme?: EmotionTheme }>`
  max-width: ${rhythm(22)};
  ${breakpoint('xlarge')} {
    display: grid;
    grid-template: 1fr / ${rhythm(9.5)} auto;
    column-gap: ${rhythm(GLOBAL_MARGIN)};
  }
`;

export const Wrapper = styled('article')<{ theme?: EmotionTheme }>``;

export const BannerWrapper = styled.div`
  margin: 0 0 ${rhythm(GLOBAL_MARGIN)};
`;
