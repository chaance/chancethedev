const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require('lodash');
const fs = require('fs');
const readingTime = require('reading-time');
const PAGINATION_OFFSET = 6;

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allBuzzsproutPodcastEpisode(
        sort: { order: DESC, fields: [published_at] }
      ) {
        edges {
          node {
            id
            slug
            fields {
              formattedSlug
            }
          }
        }
      }
      allMdx(
        filter: { frontmatter: { published: { ne: false } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            excerpt(pruneLength: 250)
            fields {
              title
              slug
              date
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    if (_.isEmpty(data.allMdx)) {
      return Promise.reject('There are no posts!');
    }

    const {
      allMdx: { edges: mdxPosts },
      allBuzzsproutPodcastEpisode: { edges: podcastEpisodes },
    } = data;

    const { createRedirect, createPage } = actions;

    createPosts(createPage, createRedirect, mdxPosts, 'infer');
    createPosts(createPage, createRedirect, podcastEpisodes, 'podcast');

    createPage({
      path: 'podcast',
      component: path.resolve(`src/templates/podcast.js`),
      context: {},
    });

    createPaginatedPages(actions.createPage, mdxPosts, {
      categories: [],
    });
  });

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        'react-helmet': path.join(__dirname, './src/components/Helmet'),
        'react-dom': '@hot-loader/react-dom',
        $src: path.join(__dirname, './src'),
        $content: path.join(__dirname, './content'),
        $components: path.join(__dirname, './src/components'),
        $images: path.join(__dirname, './src/images'),
        $lib: path.join(__dirname, './src/lib'),
        $pages: path.join(__dirname, './src/pages'),
        $providers: path.join(__dirname, './src/lib/providers'),
        $templates: path.join(__dirname, './src/templates'),
      },
    },
  });
};

exports.onCreateNode = ({
  node,
  getNode,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNodeField, createNode, createParentChildLink } = actions;

  if (node.internal.type === 'BuzzsproutPodcastEpisode') {
    createNodeField({
      name: 'formattedSlug',
      node,
      value: removeEpisodeNumberFromSlug(node.slug),
    });
  }

  // Create GraphQL query for site authors
  if (
    node.internal.type === 'File' &&
    node.sourceInstanceName === 'authors' &&
    node.relativePath === 'index.js'
  ) {
    const authors = require(node.absolutePath);
    if (Array.isArray(authors)) {
      authors.forEach((author, index) => {
        const authorNode = {
          ...author,
          slug: author.id,
          id: createNodeId(`authors-${node.id}-${index}-${author.id}`),
          children: [],
          parent: node.id,
          internal: {
            contentDigest: createContentDigest(author),
            type: 'Authors',
          },
        };
        createNode(authorNode);
        createParentChildLink({ parent: node, child: authorNode });
      });
    }
  }

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const contentType = parent.sourceInstanceName;
    const titleSlugged = _.join(_.drop(parent.name.split('-'), 3), '-');

    // Get the slug from our file path.
    // Content type directory names must match the type defined in gatsby-config.
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: `content/${contentType}/`,
    });

    const slug = (node.frontmatter.slug || relativeFilePath || titleSlugged)
      .trim()
      .replace(/^\/|\/$/g, '');

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    });

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    });

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    });

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    });

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    });

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    });

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    });

    createNodeField({
      name: 'timeToRead',
      node,
      value: readingTime(node.rawBody),
    });
  }
};

//////////////////////////////////////////////////
// Utils
//////////////////////////////////////////////////
function fileExists(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return true;
    }
  } catch (err) {
    //
  }
  return false;
}

function createPosts(createPage, createRedirect, edges, pathPrefix = null) {
  edges.forEach(({ node }, i) => {
    let realPathPrefix = pathPrefix;
    let { fields = {}, slug } = node;

    if (!node.fields && !slug) {
      return;
    }

    if (node.fields.formattedSlug) {
      slug = node.fields.formattedSlug;
    }

    const contentType = node.parent ? node.parent.sourceInstanceName : null;
    if (pathPrefix === 'infer') {
      realPathPrefix = contentType || pathPrefix;
    }

    const prev = i === 0 ? null : edges[i - 1].node;
    const next = i === edges.length - 1 ? null : edges[i + 1].node;
    const pagePath = realPathPrefix
      ? `${realPathPrefix}/${fields.slug || slug}`
      : fields.slug || slug;

    if (fields.redirects) {
      fields.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        });
      });
    }

    let template;
    switch (realPathPrefix) {
      case 'podcast':
        template = 'episode';
        break;
      default:
        template = 'post';
        break;
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/${template}.js`),
      context: {
        id: node.id,
        prev,
        next,
        contentType,
        template,
      },
    });
  });
}

function createPaginatedPages(createPage, edges, context) {
  const edgesByContentType = edges.reduce((acc, edge) => {
    const contentType = edge.node.parent.sourceInstanceName || 'blog';
    if (!acc[contentType]) {
      acc[contentType] = [];
    }
    acc[contentType].push(edge);
    return acc;
  }, {});

  Object.keys(edgesByContentType).forEach(contentType => {
    const pages = edgesByContentType[contentType].reduce(
      (acc, { node }, index) => {
        // These content types will have a featured first post.
        // This will offset the total number of posts in a grid row, so we
        // want the first page to have one more post than subsequent pages.
        const hasFeaturedFirstPost = ['blog', 'podcast'].includes(contentType);
        const pageIndex = Math.floor(
          (hasFeaturedFirstPost && index > 0 ? index - 1 : index) /
            PAGINATION_OFFSET
        );

        if (!acc[pageIndex]) {
          acc[pageIndex] = [];
        }
        acc[pageIndex].push(node.id);
        return acc;
      },
      []
    );

    pages.forEach((page, index) => {
      const pathPrefix = contentType;
      const previousPagePath = `${pathPrefix}/${index + 1}`;
      const nextPagePath =
        index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`;
      const component = fileExists(
        path.resolve(`src/templates/${contentType}.js`)
      )
        ? path.resolve(`src/templates/${contentType}.js`)
        : path.resolve(`src/templates/blog.js`);

      createPage({
        path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
        component,
        context: {
          contentType,
          pagination: {
            page,
            nextPagePath: index === 0 ? null : nextPagePath,
            previousPagePath:
              index === pages.length - 1 ? null : previousPagePath,
            pageCount: pages.length,
            pathPrefix,
          },
          ...context,
        },
      });
    });
  });
}

/**
 * Total hack. I was silly and started prepending my episode slugs with
 * e[episode number]-*, but I don't want those in the URL.
 * @param {string} slug
 */
function removeEpisodeNumberFromSlug(slug) {
  return slug.replace(/^e\d+-/g, '');
}
