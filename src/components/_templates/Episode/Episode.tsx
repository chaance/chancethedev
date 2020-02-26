import React, { useEffect, useState } from 'react';
import Layout from '$components/Layout';
import SEO from '$components/SEO';
import { HT } from '$components/Heading';
import PostMeta from '$components/PostMeta';
import { getBem } from '$lib/utils';
import { EpisodeProps } from './index';
import './Episode.scss';

let bem = getBem('EpisodeTemplate');

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
    <Layout className={bem()}>
      <SEO />
      <article className={bem({ el: 'post-wrapper' })}>
        <header className={bem({ el: 'header' })}>
          <div className={bem({ el: 'header-inner' })}>
            <HT className={bem({ el: 'post-title' })} level={1}>
              {title.replace(/^E(\d|,)+:\s/, '')}
            </HT>
            <PostMeta
              className={bem({ el: 'PostMeta' })}
              date={date}
              append={['57 minutes']}
            />
            <audio className={bem({ el: 'audio' })} controls>
              <source src={audio_url} />
            </audio>
          </div>
        </header>
        <div
          className={bem({ el: 'content-area' })}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={
            shownotes ? { __html: shownotes } : undefined
          }
        />
      </article>
    </Layout>
  );
};

export default Episode;
