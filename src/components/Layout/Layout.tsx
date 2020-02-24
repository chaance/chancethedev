import React, { useState, useEffect } from 'react';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

import mdxComponents from '$components/mdx';
import Header from '$components/Header';
import Footer from '$components/Footer';
import Container from '$components/Container';

import { useBreakpoint, useUpdateEffect } from '$lib/hooks';
import { useTheme, useFonts } from '$lib/providers';
import { Element, SiteMetadata, Frontmatter } from '$lib/types';
import { rhythm } from '$lib/typography';
import {
  breakpoint,
  resetStyles,
  globalStyles,
  GLOBAL_MARGIN,
  SMALL_SCREEN_MULTIPLIER,
  MOBILE_NAV_WIDTH,
} from '$lib/styles';
import { rem } from 'polished';

const Layout: React.FC<LayoutProps> = ({
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

  const [theme, { themeName }] = useTheme();
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
    <SiteContainer maxWidth={rhythm(58)} navIsActive={navIsActive}>
      <GridWrapper>
        <Global styles={resetStyles()} />
        <Global styles={globalStyles(theme)} />
        <Helmet
          title={site.title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
          ]}
          bodyAttributes={{
            class: cx(
              themeName,
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
        <StyledHeader
          navIsActive={navIsActive}
          setNavIsActive={!isLargeScreen ? setNavIsActive : () => void null}
        />
        <MDXProvider components={mdxComponents as any}>
          <Body>{children}</Body>
        </MDXProvider>
        <StyledFooter />
      </GridWrapper>
    </SiteContainer>
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
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const SiteContainer = styled(Container)<{ navIsActive: boolean }>`
  will-change: transform;
  transition: transform 700ms cubic-bezier(0, 1, 0.8, 1);
  transform: translateX(
    ${({ navIsActive }) => (navIsActive ? rem(MOBILE_NAV_WIDTH * -1) : 0)}
  );
  padding: ${rhythm((GLOBAL_MARGIN / 2) * SMALL_SCREEN_MULTIPLIER)};

  ${breakpoint(348)} {
    padding: ${rhythm(GLOBAL_MARGIN * SMALL_SCREEN_MULTIPLIER)};
  }

  ${breakpoint('medium down')} {
    max-width: ${rhythm(28)};
  }

  ${breakpoint('medium')} {
    padding: ${rhythm(GLOBAL_MARGIN)};
  }

  ${breakpoint('large')} {
    @supports (display: grid) {
      padding-bottom: 0;
    }
  }
`;

export const GridWrapper = styled.div`
  width: 100%;

  ${breakpoint('large')} {

    @supports (display: grid) {
      display: grid;
      grid-template:
        'header body' 1fr
        'header footer' fit-content(100%) / 198px 1fr;
      column-gap: ${rhythm(GLOBAL_MARGIN)};
      min-height: calc(100vh - ${rhythm(GLOBAL_MARGIN)});
      margin-bottom: 0;
    }
  }
`;

export const Body = styled.div`
  grid-area: body;
  padding-bottom: ${rhythm(GLOBAL_MARGIN / 2)};
`;

export const StyledHeader = styled(Header)`
  grid-area: header;
`;

export const StyledFooter = styled(Footer)`
  grid-area: footer;
  ${breakpoint('large')} {
    @supports (display: grid) {
      position: sticky;
      bottom: 0;
      background: ${({ theme }) => theme.colors.bodyBg};
      padding-bottom: ${rhythm(GLOBAL_MARGIN)};
      transition:
        color 400ms ease-out,
        background 400ms ease-out,
        box-shadow 400ms ease-out;
      /* box-shadow: 0 -10px 20px 20px ${({ theme }) => theme.colors.bodyBg}; */
    }
  }
`;

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
interface LayoutProps extends Element<'div'> {
  frontmatter?: Frontmatter;
}
