import React from 'react';
import styled from '@emotion/styled';
import PodcastExcerpt from '$components/PodcastExcerpt';
import { Section, H1, H2 } from '$components/Heading';
import Layout from '$components/Layout';
import Link from '$components/Link';
import Pagination from '$components/Pagination';
import SEO from '$components/SEO';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm } from '$lib/typography';
import { formatListenTime } from '$lib/utils';
import { PodcastProps } from './index';

const Podcast: React.FC<PodcastProps> = ({
  data: {
    allSimplecastPodcastEpisode: { edges: episodes },
  },
}) => {
  // Only the first page will have a featured (lastest) blog post
  const firstEpisode = episodes[0].node;
  const formatTitle = (title: string) => title.replace(/^E(\d|,)+:\s/, '');

  return (
    <Layout>
      <SEO />

      <Section wrap={true}>
        <SectionHeading>Latest Episode</SectionHeading>
        <Section>
          <PodcastExcerpt
            isFeatured={true}
            banner={firstEpisode.banner}
            title={formatTitle(firstEpisode.title)}
            slug={firstEpisode.slug}
            date={firstEpisode.publishedAt}
            //timeToListen={formatListenTime(firstEpisode.timeToListen)}
            timeToListen="57 minute listen"
            description={firstEpisode.description}
          />
        </Section>
      </Section>

      <PostGrid wrap={true}>
        <SectionHeading style={{ marginTop: rhythm(GLOBAL_MARGIN) }}>
          Older Episodes
        </SectionHeading>

        <Section>
          {episodes.map(({ node: episode }: any, index) => {
            return (
              index !== 0 && (
                <PodcastExcerpt
                  key={episode.id}
                  title={formatTitle(episode.title)}
                  slug={episode.slug}
                  date={episode.publishedAt}
                  // GET TIMESTAMP
                  // timeToListen={formatListenTime(episode.timeToListen)}
                  timeToListen="57 minute listen"
                  description={episode.description}
                />
              )
            );
          })}
        </Section>
      </PostGrid>
    </Layout>
  );
};

export default Podcast;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const PostWrapper = styled.div``;

export const Banner = styled.div`
  margin: ${rhythm(2)} 0;
`;

export const PostTitle = styled.h2``;

export const PostGrid = styled(Section)`
  display: grid;
  gap: ${rhythm(GLOBAL_MARGIN)};
  grid-template: auto / auto;
  ${breakpoint('medium')} {
    grid-template: auto / repeat(2, 1fr);
  }
  ${breakpoint('xlarge')} {
    grid-template: auto / repeat(3, 1fr);
  }
`;

export const SectionHeading = styled(H1)`
  ${breakpoint('medium')} {
    grid-column: 1 / 3;
  }
  ${breakpoint('xlarge')} {
    grid-column: 1 / 4;
  }
`;
