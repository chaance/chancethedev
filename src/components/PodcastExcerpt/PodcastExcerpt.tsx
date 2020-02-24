import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { rem, rgba } from 'polished';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { HT, H2 } from '$components/Heading';
import { leadingSlashIt, unSlashIt } from '$lib/utils';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm, fonts } from '$lib/typography';
import { PodcastExcerptProps } from './index';

const PodcastExcerpt: React.FC<PodcastExcerptProps> = ({
  audioUrl,
  banner,
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
  const W = isFeatured ? FeaturedWrapper : Wrapper;
  const H = isFeatured ? FeaturedHeading : Heading;
  const permalink = `/podcast/${unSlashIt(slug)}`;
  return (
    <W {...props}>
      {isFeatured && banner ? (
        <BannerWrapper aria-hidden>
          <StyledLink
            aria-label={`Listen to "${title}"`}
            to={permalink}
            tabIndex={-1}
          >
            <img src={banner} alt="" />
          </StyledLink>
        </BannerWrapper>
      ) : null}
      <InnerWrapper>
        <header>
          <H>
            <StyledLink to={permalink}>{title}</StyledLink>
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
          {audioUrl && (
            <StyledAudio controls>
              <source src={audioUrl} />
            </StyledAudio>
          )}
          <span>
            <ListenLink to={permalink} rel="bookmark" tabIndex={-1}>
              {typeof listenLinkText === 'function'
                ? listenLinkText(title)
                : title}
            </ListenLink>
            {includeAllLink && (
              <ListenLink to="/podcast">See All Episodes</ListenLink>
            )}
          </span>
        </div>
      </InnerWrapper>
    </W>
  );
};

export default PodcastExcerpt;

const InnerWrapper = styled('div')``;

const BannerWrapper = styled.div`
  img {
    display: block;
    margin: 0 0 ${rhythm(GLOBAL_MARGIN / 2)};
    box-shadow: ${`0 ${rem(10)} ${rem(40)} ${rem(-20)} ${rgba('#000', 0.425)}`};
  }
`;

const FeaturedWrapper = styled('article')`
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const FeaturedHeading = styled(HT)`
  margin-top: 0;
`;

const Heading = styled(H2)`
  margin: ${rhythm(1 / 2)} 0;
`;

const Wrapper = styled('article')``;

const EpisodeInfo = styled('span')`
  display: block;
  margin: ${rhythm(1 / 2)} 0;
  font-family: ${fonts.sans};
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.lightText};
`;

const Desc = styled('p')`
  font-family: ${fonts.sans};
  color: ${({ theme }) => theme.colors.lightText};
  margin: ${rhythm(1 / 2)} 0;
`;

const ListenLink = styled(StyledLink)`
  display: inline-block;
  font-family: ${fonts.sans};
  font-weight: bold;
  margin-top: ${rhythm(1 / 2)};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.5;

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }

  &:not(:first-of-type) {
    margin-left: ${rhythm(1 / 2)};
  }
`;

const StyledAudio = styled.audio`
  display: block;
  width: 100%;
  margin: ${rhythm(1)} 0;
`;
