import path from 'path';
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import SchemaOrg from './SchemaOrg';
import { Frontmatter } from '$lib/types';
import { SEOProps } from './index';

const SEO: React.FC<SEOProps> = ({
  title: titleProp,
  description: desc,
  postData = { childMarkdownRemark: { frontmatter: {} as Frontmatter } },
  frontmatter = {} as Frontmatter,
  lang = 'en',
  locale = 'en_US',
  meta = [],
  postImage = null,
  isBlogPost = false,
}) => {
  const {
    site: { siteMetadata: seo },
  } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            description
            canonicalUrl
            image
            author {
              name
            }
            organization {
              name
              url
              logo
            }
            social {
              twitter
              fbAppID
            }
          }
        }
      }
    `
  );

  const postMeta =
    frontmatter || postData.childMarkdownRemark.frontmatter || {};
  const title =
    isBlogPost && postMeta ? postMeta.title : titleProp || seo.title;
  const description = postMeta.description || seo.description;
  const image = postImage ? `${seo.canonicalUrl}${postImage}` : seo.image;
  const url = postMeta.slug
    ? `${seo.canonicalUrl}${path.sep}${postMeta.slug}`
    : seo.canonicalUrl;

  const datePublished = isBlogPost ? postMeta.date : false;

  const defaultMeta = [
    { name: 'copyright', content: 'Chance Digital' },
    { name: `image`, content: image },
    { name: `description`, content: description },
    { property: 'og:site_name', content: `Chance the Developer Podcast` },
    { property: `og:title`, content: title },
    { property: `og:description`, content: description },
    { property: `og:type`, content: isBlogPost ? 'article' : 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:locale', content: locale },
    { property: 'fb:app_id', content: seo.social.fbAppID },
    { name: `twitter:title`, content: title },
    { name: `twitter:card`, content: 'summary_large_image' },
    { name: `twitter:creator`, content: seo.social.twitter },
    { name: `twitter:description`, content: description },
    { name: 'twitter:image', content: image },
    { name: 'apple-itunes-app', content: `app-id=${seo.social.itunesAppId}` },
  ];

  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        meta={[...defaultMeta, ...meta].filter(({ content }) =>
          Boolean(content)
        )}
        title={title}
        titleTemplate={seo.title === title ? `%s` : `%s | ${seo.title}`}
      />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={title}
        image={image}
        description={description}
        datePublished={datePublished}
        canonicalUrl={seo.canonicalUrl}
        author={seo.author}
        organization={seo.organization}
        defaultTitle={seo.title}
      />
    </React.Fragment>
  );
};

export default SEO;
