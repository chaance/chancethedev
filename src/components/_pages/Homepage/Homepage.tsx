import React, { Fragment } from 'react';
import VH from '@reach/visually-hidden';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import { Section, H1, H2, H3 } from '$components/Heading';
import PodcastExcerpt from '$components/PodcastExcerpt';
import { getBem } from '$lib/utils';
import './Homepage.scss';

let bem = getBem('Homepage');

const Homepage: React.FC<any> = ({
  data: {
    site,
    allBuzzsproutPodcastEpisode: { edges: episodes },
  },
}) => {
  // Only the first page will have a featured (lastest) notes post
  const firstEpisode = episodes[0].node;
  const formatTitle = (title: string) => title.replace(/^E(\d|,)+:\s/, '');

  return (
    <Layout className={bem()}>
      <SEO />

      <Section wrap={true}>
        <H3 className={bem({ el: 'section-heading' })}>Latest Episode</H3>
        <Section>
          <PodcastExcerpt
            isFeatured={true}
            banner={firstEpisode.artwork_url}
            title={formatTitle(firstEpisode.title)}
            slug={firstEpisode.fields.formattedSlug}
            date={firstEpisode.published_at}
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

export default Homepage;
