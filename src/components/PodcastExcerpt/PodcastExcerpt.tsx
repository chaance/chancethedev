import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { rem } from 'polished';
import Link from '$components/Link';
import SRT from '$components/SRT';
import { HT, H2 } from '$components/Heading';
import { leadingSlashIt, unSlashIt } from '$lib/utils';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm, fonts } from '$lib/typography';
import { PodcastExcerptProps } from './index';

const PodcastExcerpt: React.FC<PodcastExcerptProps> = ({
  banner,
  title,
  slug,
  date,
  timeToListen,
  description,
  isFeatured,
  ...props
}) => {
  const W = isFeatured ? FeaturedWrapper : Wrapper;
  const H = isFeatured ? FeaturedHeading : Heading;
  const permalink = `/podcast/${unSlashIt(slug)}`;
  return (
    <W {...props}>
      {isFeatured && banner ? (
        <BannerWrapper>
          <Link aria-label={`Listen to "${title}"`} to={permalink}>
            <Img sizes={banner.childImageSharp.fluid} />
          </Link>
        </BannerWrapper>
      ) : null}
      <InnerWrapper>
        <header>
          <H>
            <Link to={permalink}>{title}</Link>
          </H>
          <EpisodeInfo>
            {date}
            {` • ${timeToListen}`}
          </EpisodeInfo>
        </header>
        <div>
          <Desc
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <span>
            <ListenLink
              to={permalink}
              rel="bookmark"
            >
              Listen Now<SRT> to {`"${title}"`}</SRT>
            </ListenLink>
          </span>
        </div>
      </InnerWrapper>
    </W>
  );
};

export default PodcastExcerpt;

export const InnerWrapper = styled('div')``;

export const BannerWrapper = styled.div`
  margin: 0 0 ${rhythm(GLOBAL_MARGIN / 2)};
`;

export const FeaturedWrapper = styled('article')`
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

export const Wrapper = styled('article')``;

export const EpisodeInfo = styled('span')`
  display: block;
  margin: ${rhythm(1 / 2)} 0;
  font-family: ${fonts.sans};
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.lightText};
`;

export const Desc = styled('p')`
  font-family: ${fonts.sans};
  color: ${({ theme }) => theme.colors.lightText};
  margin: ${rhythm(1 / 2)} 0;
`;

export const ListenLink = styled(Link)`
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
