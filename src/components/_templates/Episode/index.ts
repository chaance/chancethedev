export { default } from './Episode';

export interface EpisodeProps {
  data: {
    site: any;
    simplecastPodcastEpisode: {
      description: string;
      enclosureUrl: string;
      id: string;
      number: number;
      publishedAt: string;
      simplecastId: string;
      slug: string;
      status: string;
      title: string;
    };
  };
}
