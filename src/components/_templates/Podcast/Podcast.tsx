import React, { Fragment } from 'react';
import VH from '@reach/visually-hidden';
import PodcastExcerpt from '$components/PodcastExcerpt';
import { Section, H1, H3 } from '$components/Heading';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import { formatListenTime, getBem } from '$lib/utils';
import { PodcastProps } from './index';
import './Podcast.scss';

let bem = getBem('PodcastTemplate');

const Podcast: React.FC<PodcastProps> = ({
  data: {
    allBuzzsproutPodcastEpisode: { edges: episodes },
  },
}) => {
  // Only the first page will have a featured (lastest) blog post
  const firstEpisode = episodes[0].node;
  const formatTitle = (title: string) => title.replace(/^E(\d|,)+:\s/, '');

  return (
    <Layout className={bem()}>
      <SEO />

      <Section wrap={true}>
        <H3 className={bem({ el: 'section-heading', featured: true })}>
          Latest Episode
        </H3>
        <Section>
          <PodcastExcerpt
            isFeatured={true}
            banner={firstEpisode.artwork_url}
            title={formatTitle(firstEpisode.title)}
            slug={firstEpisode.fields.formattedSlug}
            date={firstEpisode.published_at}
            description={firstEpisode.summary}
            listenLinkText={title => (
              <Fragment>
                See the Shownotes<VH> for {`"${title}"`}</VH>
              </Fragment>
            )}
            audioUrl={firstEpisode.audio_url}
          />
        </Section>
      </Section>

      <Section className={bem({ el: 'post-grid' })} wrap={true}>
        <H1 className={bem({ el: 'section-heading', older: true })}>
          Older Episodes
        </H1>

        <Section>
          {episodes.map(({ node: episode }: any, index) => {
            return (
              index !== 0 && (
                <PodcastExcerpt
                  key={episode.id}
                  title={formatTitle(episode.title)}
                  slug={episode.fields.formattedSlug}
                  date={episode.published_at}
                  description={episode.summary}
                />
              )
            );
          })}
        </Section>
      </Section>
    </Layout>
  );
};

export default Podcast;
