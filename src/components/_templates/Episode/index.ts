export { default } from './Episode';

export interface EpisodeProps {
  data: {
    site: any;
    buzzsproutPodcastEpisode: {
      description: string;
      summary: string;
      audio_url: string;
      artwork_url: string;
      id: string;
      number: number;
      published_at: string;
      slug: string;
      title: string;
    };
  };
}
