/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const config = require('./config');
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

const envFile = `.env.${process.env.NODE_ENV}`;

require('dotenv').config({
  path: fs.existsSync(path.resolve(__dirname, envFile)) ? envFile : `.env`,
});

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    title: config.siteTitle,
    twitterHandle: config.twitterHandle,
    description: config.siteDescription,
    keywords: config.keywords,
    canonicalUrl: config.siteUrl,
    image: config.siteLogo,
    author: {
      name: config.author.name,
      minibio: ``,
    },
    organization: {
      name: config.organization,
      url: config.siteUrl,
      logo: config.siteLogo,
    },
    social: {
      twitter: config.twitterHandle,
      fbAppID: '',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/notes`,
        name: 'notes',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/talks`,
        name: 'talks',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/workshops`,
        name: 'workshops',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/config/authors`,
        name: 'authors',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md', '.markdown'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: '#fafafa',
              maxWidth: 1035,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-buzzsprout',
      options: {
        token: process.env.BUZZSPROUT_TOKEN,
        podcastId: '153232',
      },
    },
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      // options: {
      //   classNameDark: 'dark-mode',
      //   classNameLight: 'light-mode',
      //   storageKey: 'darkMode',
      //   minify: true,
      // },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: `@import "${__dirname}/src/lib/styles/utils";`,
        postCssPlugins: [
          require(`postcss-preset-env`)({
            stage: 2,
            features: {
              'custom-properties': true,
              'custom-media-queries': true,
              'custom-selectors': true,
            },
          }),
        ],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-twitter',
    'gatsby-plugin-typescript',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    /* {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve(`./src/components/Layout/Layout.tsx`),
      },
    }, */
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(({ node }) => {
                return {
                  ...node.frontmatter,
                  description: node.excerpt,
                  date: node.fields.date,
                  url: site.siteMetadata.siteUrl + '/' + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + '/' + node.fields.slug,
                };
              });
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  filter: { frontmatter: { published: { ne: false } } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      fields {
                        slug
                        date
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Notes RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/lib/typography',
      },
    },
    'gatsby-plugin-offline',
  ],
};
