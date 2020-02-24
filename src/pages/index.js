import { graphql } from 'gatsby';

import Homepage from '$components/_pages/Homepage';

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allBuzzsproutPodcastEpisode {
      edges {
        node {
          id
          slug
          fields {
            formattedSlug
          }
          audio_url
          artwork_url
          episode_number
          published_at(formatString: "MMMM D, Y")
          title
          description
          summary
        }
      }
    }
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          timeToRead
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`;

export default Homepage;
