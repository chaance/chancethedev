import React, { Fragment, useState, useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import mdxComponents from '$components/mdx';
import Header from '$components/Header';
import Footer from '$components/Footer';
import Container from '$components/Container';
import { useBreakpoint } from '$lib/hooks';
import { useThemeContext, useFonts } from '$lib/providers';
import { Element, SiteMetadata, Frontmatter } from '$lib/types';

const styles = require('./Layout.module.scss');

const Layout: React.FC<LayoutProps> = ({
  className,
  children,
  frontmatter = {} as Frontmatter,
}) => {
  const { site } = useStaticQuery<{
    site: { siteMetadata: SiteMetadata; title: string };
  }>(
    graphql`
      {
        site {
          ...site
        }
      }
    `
  );

  const {
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata;

  const {
    keywords: frontmatterKeywords = '',
    description: frontmatterDescription = '',
  } = frontmatter;

  const { theme } = useThemeContext();
  const [navIsActive, setNavIsActive] = useState(false);

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;
  const {
    fontsLoaded,
    fontsError,
    fonts: fontList,
    fontsLoadingState,
  } = useFonts();
  const isLargeScreen = useBreakpoint('large');

  useEffect(() => {
    // Close the nav menu when the user resizes to a large screen
    if (isLargeScreen && navIsActive) {
      setNavIsActive(false);
    }
  }, [isLargeScreen, navIsActive]);

  return (
    <Fragment>
      <SkipNavLink />
      <Container
        className={cx(className, 'Layout', styles.wrapper, {
          [styles.navIsActive]: navIsActive,
        })}
      >
        <div className={styles.gridWrapper}>
          <Helmet
            title={site.title}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
            ]}
            bodyAttributes={{
              class: cx(
                `theme-${theme}`,
                {
                  fontsError,
                  fontsLoaded,
                  [`fonts--${fontsLoadingState}`]: fontsLoadingState,
                },
                ...fontList
              ),
            }}
          >
            <html lang="en" />
          </Helmet>
          <Header
            usesToggleNav={!isLargeScreen}
            navIsActive={isLargeScreen ? false : navIsActive}
            setNavIsActive={isLargeScreen ? () => void null : setNavIsActive}
            className={styles.header}
          />
          <SkipNavContent />
          <MDXProvider components={mdxComponents as any}>
            <div className={styles.body}>{children}</div>
          </MDXProvider>
          <Footer className={styles.footer} />
        </div>
      </Container>
    </Fragment>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author {
        name
      }
      keywords
    }
  }
`;

export default Layout;

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
interface LayoutProps extends Element<'div'> {
  frontmatter?: Frontmatter;
}
