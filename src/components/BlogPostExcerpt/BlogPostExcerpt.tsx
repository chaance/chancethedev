import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { rem } from 'polished';
import Link from '$components/Link';
import SRT from '$components/SRT';
import { HT, H2 } from '$components/Heading';
import { leadingSlashIt } from '$lib/utils';
import { EmotionTheme } from '$lib/providers';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm, fonts } from '$lib/typography';
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
  const H = isFeatured ? FeaturedHeading : Heading;
  return (
    <W {...props}>
      {isFeatured && banner ? (
        <BannerWrapper>
          <Link aria-label={`Read "${title}"`} to={leadingSlashIt(slug)}>
            <Img sizes={banner.childImageSharp.fluid} />
          </Link>
        </BannerWrapper>
      ) : null}
      <InnerWrapper>
        <header>
          <H>
            <Link to={leadingSlashIt(slug)}>{title}</Link>
          </H>
          <PostInfo>
            {date}
            {` • ${timeToRead}`}
          </PostInfo>
        </header>
        <div>
          <Spoiler
            className="PostExcerpt__spoiler"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: spoiler }}
          />
          <span className="PostExcerpt__more">
            <MoreLink
              className="PostExcerpt__moreLink"
              to={leadingSlashIt(slug)}
              rel="bookmark"
            >
              Read More<SRT> from {`"${title}"`}</SRT>
            </MoreLink>
          </span>
        </div>
      </InnerWrapper>
    </W>
  );
};

export default PostExcerpt;

export const InnerWrapper = styled('div')<{ theme?: EmotionTheme }>``;

export const BannerWrapper = styled.div`
  margin: 0 0 ${rhythm(GLOBAL_MARGIN)};
`;

export const FeaturedWrapper = styled('article')<{ theme?: EmotionTheme }>`
  /* max-width: ${rhythm(33)}; */
  ${breakpoint('large')} {
    display: grid;
    grid-template: 1fr / repeat(2, 1fr);
    column-gap: ${rhythm(GLOBAL_MARGIN)};
  }

  ${breakpoint('xlarge')} {
    grid-template: 1fr / repeat(3, 1fr);
    ${InnerWrapper} {
      max-width: ${rhythm(18)};
      grid-column: 2 / 4;
    }
  }
`;

export const FeaturedHeading = styled(HT)`
  margin-top: 0;
`;

export const Heading = styled(H2)`
  margin: ${rhythm(1 / 2)} 0;
`;

export const Wrapper = styled('article')<{ theme?: EmotionTheme }>``;

export const PostInfo = styled('span')<{ theme?: EmotionTheme }>`
  display: block;
  margin: ${rhythm(1 / 2)} 0;
  font-family: ${fonts.sans};
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.lightText};
`;

export const Spoiler = styled('p')<{ theme?: EmotionTheme }>`
  font-family: ${fonts.sans};
  color: ${({ theme }) => theme.colors.lightText};
  margin: ${rhythm(1 / 2)} 0;
`;

export const MoreLink = styled(Link)<{ theme?: EmotionTheme }>`
  display: block;
  font-family: ${fonts.sans};
  font-weight: bold;
  margin-top: ${rhythm(1 / 2)};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.5;

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }
`;
