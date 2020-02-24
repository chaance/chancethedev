import { graphql } from 'gatsby';

import Podcast from '$components/_templates/Podcast';

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allBuzzsproutPodcastEpisode(sort: { order: DESC, fields: [published_at] }) {
      edges {
        node {
          id
          slug
          fields {
            formattedSlug
          }
          published_at(formatString: "MMMM DD, YYYY")
          audio_url
          artwork_url
          description
          summary
          episode_number
          title
        }
      }
    }
  }
`;

export default Podcast;
