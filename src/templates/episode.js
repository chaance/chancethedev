import { graphql } from 'gatsby';

import Episode from '$components/_templates/Episode';

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    buzzsproutPodcastEpisode(id: { eq: $id }) {
      description
      audio_url
      artwork_url
      id
      episode_number
      published_at(formatString: "MMMM DD, YYYY")
      id
      slug
      fields {
        formattedSlug
      }
      summary
      title
    }
  }
`;

export default Episode;
