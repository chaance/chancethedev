import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { rem, rgba } from 'polished';
import Layout from '$components/Layout';
import Audio from '$components/Audio';
import SEO from '$components/SEO';
import { HT } from '$components/Heading';
import PostMeta from '$components/PostMeta';
import { breakpoint, makeContentGrid, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm, fonts } from '$lib/typography';
import { EpisodeProps } from './index';

const Episode: React.FC<EpisodeProps> = ({
  data: {
    simplecastPodcastEpisode: {
      simplecastId: episodeId,
      publishedAt: date,
      enclosureUrl,
      description,
      title,
    },
  },
}) => {
  /*
  TODO: Replace with state machine and do some proper data fetching, gross

  TODO: Consider replacing with markdown source and just copy/pasta the
        friggen shownotes, this extra API call is probs not worth it
  */
  let [shownotes, setShownotes] = useState<string | null>(null);
  let [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(`https://api.simplecast.com/episodes/${episodeId}`)
      .then(res => {
        setError(null);
        switch (res.status) {
          case 200:
            return res.json();
          default:
            throw Error(res.statusText);
        }
      })
      .then(info => {
        if (info.long_description) {
          setShownotes(info.long_description);
        } else {
          throw Error(`Shownotes not found :(`);
        }
      })
      .catch((err: Error) => {
        setError(err.message);
      });
  }, [episodeId]);
  return (
    <Layout>
      <SEO />
      <PostWrapper>
        <Header>
          <HeaderInner>
            {/* banner && (
            <BannerWrapper>
              <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
            </BannerWrapper>
          ) */}
            <PostTitle level={1}>{title.replace(/^E(\d|,)+:\s/, '')}</PostTitle>
            {description ? (
              <Description
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}
            <StyledPostMeta date={date} append={['57 minutes']} />
            <Audio src={enclosureUrl} />
          </HeaderInner>
        </Header>
        <ContentArea
          // eslint-disable-next-line react/no-danger
          // @ts-ignore
          dangerouslySetInnerHTML={
            shownotes ? { __html: shownotes } : undefined
          }
        >
          {!shownotes
            ? error
              ? `An error has occurred: ${error}`
              : 'Loading…'
            : null}
        </ContentArea>
      </PostWrapper>
    </Layout>
  );
};

export default Episode;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const PostWrapper = styled.article`
  ${makeContentGrid('content', 'header')}
`;

export const Header = styled.header`
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

export const HeaderInner = styled.div`
  @supports (display: grid) {
    ${breakpoint('xxlarge')} {
      position: sticky;
      top: ${rhythm(GLOBAL_MARGIN)};
      height: calc(100vh - ${rhythm(GLOBAL_MARGIN * 2)});
    }
  }
`;

export const ContentArea = styled.div`
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

export const BannerWrapper = styled.figure`
  position: relative;
  margin: 0 0 ${rhythm(GLOBAL_MARGIN / 2)};
  overflow: hidden;
  box-shadow: ${`0 ${rem(10)} ${rem(40)} ${rem(-20)} ${rgba('#000', 0.425)}`};
`;

export const Description = styled('p')`
  font-family: ${fonts.sans};
  font-size: ${rem(18)};
  color: ${({ theme }) => theme.colors.lightText};
  margin: ${rhythm(1 / 2)} 0;

  ${breakpoint('medium')} {
    font-size: ${rem(20)};
  }
`;

export const PostTitle = styled(HT)`
  margin: 0 0 ${rhythm(1 / 2)};
`;

export const StyledPostMeta = styled(PostMeta)`
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
