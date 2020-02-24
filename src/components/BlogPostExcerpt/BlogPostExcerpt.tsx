import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { rem } from 'polished';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { HT, H2 } from '$components/Heading';
import { unSlashIt } from '$lib/utils';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm, fonts } from '$lib/typography';
import { BlogPostExcerptProps } from './index';

const PostExcerpt: React.FC<BlogPostExcerptProps> = ({
  banner,
  title,
  slug,
  date,
  timeToRead,
  spoiler,
  isFeatured,
  contentType = 'blog',
  ...props
}) => {
  const W = isFeatured ? FeaturedWrapper : Wrapper;
  const H = isFeatured ? FeaturedHeading : Heading;
  const permalink = `/${contentType}/${unSlashIt(slug)}`;
  return (
    <W {...props}>
      {isFeatured && banner ? (
        <BannerWrapper>
          <StyledLink aria-label={`Read "${title}"`} to={permalink} tabIndex={-1}>
            <Img sizes={banner.childImageSharp.fluid} />
          </StyledLink>
        </BannerWrapper>
      ) : null}
      <InnerWrapper>
        <header>
          <H>
            <StyledLink to={permalink}>{title}</StyledLink>
          </H>
          <PostInfo>
            {date}
            {` • ${timeToRead}`}
          </PostInfo>
        </header>
        <div>
          <Spoiler
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: spoiler }}
          />
          <span>
            <MoreLink to={permalink} rel="bookmark" tabIndex={-1}>
              Read More<VH> from {`"${title}"`}</VH>
            </MoreLink>
          </span>
        </div>
      </InnerWrapper>
    </W>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default PostExcerpt;

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

export const PostInfo = styled('span')`
  display: block;
  margin: ${rhythm(1 / 2)} 0;
  font-family: ${fonts.sans};
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.lightText};
`;

export const Spoiler = styled('p')`
  font-family: ${fonts.sans};
  color: ${({ theme }) => theme.colors.lightText};
  margin: ${rhythm(1 / 2)} 0;
`;

export const MoreLink = styled(StyledLink)`
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
