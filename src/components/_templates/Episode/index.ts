export { default } from './Episode';

export interface EpisodeProps {
  data: {
    site: any;
    simplecastPodcastEpisode: {
      id: string;
      slug: string;
      number: number;
      publishedAt: string;
      enclosureUrl: string;
      description: string;
      title: string;
      status: string;
    };
  };
}
