import { graphql } from 'gatsby';

export { default } from '$components/_templates/Podcast';

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allSimplecastPodcastEpisode(sort: { order: DESC, fields: [publishedAt] }) {
      edges {
        node {
          id
          slug
          publishedAt(formatString: "MMMM DD, YYYY")
          enclosureUrl
          description
          number
          title
          status
        }
      }
    }
  }
`;
