import React, { Fragment } from 'react';
import VH from '@reach/visually-hidden';
import PostExcerpt from '$components/PostExcerpt';
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
  // Only the first page will have a featured (lastest) post
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
          <PostExcerpt
            audioUrl={firstEpisode.audio_url}
            banner={firstEpisode.artwork_url}
            contentType="podcast"
            date={firstEpisode.published_at}
            excerpt={firstEpisode.summary}
            isFeatured
            slug={firstEpisode.fields.formattedSlug}
            title={formatTitle(firstEpisode.title)}
            renderReadMore={(title) => (
              <Fragment>
                See the Shownotes<VH> for {`"${title}"`}</VH>
              </Fragment>
            )}
          />
        </Section>
      </Section>

      <Section className={bem({ el: 'post-grid' })} wrap={true}>
        <H3 className={bem({ el: 'section-heading', older: true })}>
          Older Episodes
        </H3>

        <Section>
          {episodes.map(({ node: episode }: any, index) => {
            return (
              index !== 0 && (
                <>
                  <PostExcerpt
                    key={episode.id}
                    contentType="podcast"
                    title={formatTitle(episode.title)}
                    slug={episode.fields.formattedSlug}
                    date={episode.published_at}
                    excerpt={episode.summary}
                    renderReadMore={() => 'Listen Now'}
                  />
                </>
              )
            );
          })}
        </Section>
      </Section>
    </Layout>
  );
};

export default Podcast;
