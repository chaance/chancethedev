import React, { Fragment } from 'react';
import VH from '@reach/visually-hidden';
import styled from '@emotion/styled';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import { Section, H1 } from '$components/Heading';
import PodcastExcerpt from '$components/PodcastExcerpt';
import { breakpoint } from '$lib/styles';

const Homepage: React.FC<any> = ({
  data: {
    site,
    allBuzzsproutPodcastEpisode: { edges: episodes },
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
            banner={firstEpisode.artwork_url}
            title={formatTitle(firstEpisode.title)}
            slug={firstEpisode.fields.formattedSlug}
            date={firstEpisode.published_at}
            //timeToListen={formatListenTime(firstEpisode.timeToListen)}
            timeToListen="57 minute listen"
            description={firstEpisode.summary}
            includeAllLink
            audioUrl={firstEpisode.audio_url}
            listenLinkText={title => (
              <Fragment>
                See the Shownotes<VH> for {`"${title}"`}</VH>
              </Fragment>
            )}
          />
        </Section>
      </Section>
    </Layout>
  );
};

export const SectionHeading = styled(H1)`
  ${breakpoint('medium')} {
    grid-column: 1 / 3;
  }
  ${breakpoint('xlarge')} {
    grid-column: 1 / 4;
  }
`;

export default Homepage;
