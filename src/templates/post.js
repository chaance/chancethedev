import { graphql } from 'gatsby';

import NotesPost from '$components/_templates/NotesPost';

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    allAuthors {
      edges {
        node {
          id
          slug
          name
          image
        }
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        description
        banner {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        slug
        keywords
      }
      body
    }
  }
`;

export default NotesPost;
