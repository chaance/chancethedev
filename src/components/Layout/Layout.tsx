import React, { useState, useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import mdxComponents from '$components/mdx';
import Header from '$components/Header';
import Footer from '$components/Footer';
import Container from '$components/Container';
import { useBreakpoint } from '$lib/hooks';
import { useThemeContext, useFonts } from '$lib/providers';
import { Element, SiteMetadata, Frontmatter } from '$lib/types';
import { getBem } from '$lib/utils';
import './Layout.scss';

let bem = getBem('Layout');

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
    <Container className={bem({ 'nav-is-active': navIsActive }, className)}>
      <div className={bem({ el: 'grid-wrapper' })}>
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
          className={bem({ el: 'Header' })}
        />
        <MDXProvider components={mdxComponents as any}>
          <div className={bem({ el: 'body' })}>{children}</div>
        </MDXProvider>
        <Footer className={bem({ el: 'Footer' })} />
      </div>
    </Container>
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
