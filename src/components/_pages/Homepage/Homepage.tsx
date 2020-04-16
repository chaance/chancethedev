import React, { Fragment } from 'react';
import VH from '@reach/visually-hidden';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import { Section, H1, H2, H3 } from '$components/Heading';
import PostExcerpt from '$components/PostExcerpt';
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
          <PostExcerpt
            contentType="podcast"
            isFeatured={true}
            banner={firstEpisode.artwork_url}
            title={formatTitle(firstEpisode.title)}
            slug={firstEpisode.fields.formattedSlug}
            date={firstEpisode.published_at}
            excerpt={firstEpisode.summary}
            includeAllLink
            audioUrl={firstEpisode.audio_url}
            renderReadMore={(title) => (
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
