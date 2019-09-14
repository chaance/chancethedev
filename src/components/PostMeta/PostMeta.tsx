import React from 'react';
import styled from '@emotion/styled';
import { rem } from 'polished';
import { H4 } from '$components/Heading';
import { TwitterIcon } from '$components/Icons';
import Link from '$components/Link';
import SRT from '$components/SRT';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm, fonts } from '$lib/typography';
import { leadingSlashIt } from '$lib/utils';
import config from '$src/../config';
import { PostMetaProps } from './index';

const PostMeta: React.FC<PostMetaProps> = ({
  author,
  date,
  append,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {author && author.image && (
        <ImageWrapper>
          <img src={leadingSlashIt(author.image)} alt={`${author.name} bio`} />
        </ImageWrapper>
      )}
      <div>
        {author && <AuthorName>{author.name}</AuthorName>}
        <PostInfo>
          {date && <InfoItem>{date}</InfoItem>}
          {append
            ? append.map((item, index) => (
                <InfoItem key={index}>{item}</InfoItem>
              ))
            : null}
          <InfoItem>
            <Link target="_blank" rel="noopener noreferrer" to={config.twitter}>
              <SRT>Twitter</SRT>
              <TwitterIcon aria-hidden />
            </Link>
          </InfoItem>
        </PostInfo>
      </div>
    </Wrapper>
  );
};

export default PostMeta;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  width: ${rem(40)};
  height: ${rem(40)};
  overflow: hidden;
  border-radius: ${rem(30)};
  margin-right: ${rhythm(GLOBAL_MARGIN / 4)};

  ${breakpoint('medium')} {
    margin-right: ${rhythm(GLOBAL_MARGIN / 2)};
    width: ${rem(60)};
    height: ${rem(60)};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostInfo = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: ${fonts.sans};
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.lightText};

  svg {
    color: inherit;
    fill: currentColor;
  }
`;

export const InfoItem = styled.li`
  display: flex;
  margin: 0 0.25em;
  position: relative;
  white-space: nowrap;

  &::after {
    content: '•';
    display: block;
    margin-left: 0.5em;
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;

    &::after {
      display: none;
    }
  }

  ${breakpoint('medium')} {
    font-size: ${rem(16)};
  }
`;

export const AuthorName = styled(H4)`
  margin: 0;
`;
