import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { rem, rgba } from 'polished';
import Layout from '$components/Layout';
// import Audio from '$components/Audio';
import SEO from '$components/SEO';
import { HT } from '$components/Heading';
import PostMeta from '$components/PostMeta';
import { breakpoint, makeContentGrid, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm, fonts } from '$lib/typography';
import { EpisodeProps } from './index';

const Episode: React.FC<EpisodeProps> = ({
  data: {
    buzzsproutPodcastEpisode: {
      id: episodeId,
      published_at: date,
      audio_url,
      artwork_url,
      description: shownotes,
      summary,
      title,
    },
  },
}) => {
  return (
    <Layout>
      <SEO />
      <PostWrapper>
        <Header>
          <HeaderInner>
            <PostTitle level={1}>{title.replace(/^E(\d|,)+:\s/, '')}</PostTitle>
            <StyledPostMeta date={date} append={['57 minutes']} />
            <StyledAudio controls>
              <source src={audio_url} />
            </StyledAudio>
            {/* <Audio src={audio_url} /> */}
          </HeaderInner>
        </Header>
        <ContentArea
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={
            shownotes ? { __html: shownotes } : undefined
          }
        ></ContentArea>
      </PostWrapper>
    </Layout>
  );
};

export default Episode;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
const PostWrapper = styled.article`
  ${makeContentGrid('content', 'header')}
`;

const Header = styled.header`
  grid-area: header;
  position: relative;

  ${breakpoint('xxlarge')} {
    @supports (display: grid) {
      /*
      We need to offset the header by the width of the global margin to
      prevent the top margin from being pushed up when the user scrolls to the
      bottom of the post.
       */
      min-height: calc(100% + ${rhythm(GLOBAL_MARGIN)});
    }
  }
`;

const HeaderInner = styled.div`
  @supports (display: grid) {
    ${breakpoint('xxlarge')} {
      position: sticky;
      top: ${rhythm(GLOBAL_MARGIN)};
      height: calc(100vh - ${rhythm(GLOBAL_MARGIN * 2)});
    }
  }
`;

const ContentArea = styled.div`
  grid-area: content;
  margin-top: ${rhythm(GLOBAL_MARGIN / 2)};

  ${breakpoint('medium')} {
    font-size: ${rem(18)};
  }

  ${breakpoint('large')} {
    font-size: ${rem(20)};
  }

  ${breakpoint('xxlarge')} {
    margin-top: 0;
  }
`;

const BannerWrapper = styled.figure`
  position: relative;
  margin: 0 0 ${rhythm(GLOBAL_MARGIN / 2)};
  overflow: hidden;
  box-shadow: ${`0 ${rem(10)} ${rem(40)} ${rem(-20)} ${rgba('#000', 0.425)}`};
`;

const Description = styled('p')`
  font-family: ${fonts.sans};
  font-size: ${rem(18)};
  color: ${({ theme }) => theme.colors.lightText};
  margin: ${rhythm(1 / 2)} 0;

  ${breakpoint('medium')} {
    font-size: ${rem(20)};
  }
`;

const PostTitle = styled(HT)`
  margin: 0 0 ${rhythm(1 / 2)};
`;

const StyledPostMeta = styled(PostMeta)`
  margin: ${rhythm(1 / 2)} 0;
  padding-bottom: ${rhythm(1 / 2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${breakpoint('medium')} {
    margin: ${rhythm(1)} 0;
    padding-bottom: ${rhythm(1)};
  }

  ${breakpoint('xxlarge')} {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }
`;

const StyledAudio = styled.audio`
  display: block;
  width: 100%;
  margin: ${rhythm(1)} 0;
`;
