import { graphql } from 'gatsby';

export { default } from '$components/_templates/Episode';

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    simplecastPodcastEpisode(id: { eq: $id }) {
      id
      slug
      number
      publishedAt(formatString: "MMMM DD, YYYY")
      enclosureUrl
      description
      title
      status
    }
  }
`;
