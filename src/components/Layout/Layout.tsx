import React, { useState } from 'react';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

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

  useUpdateEffect(() => {
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

  ${breakpoint('medium down')} {
    max-width: ${rhythm(28)};
  }
`;

export const GridWrapper = styled.div`
  width: 100%;
  max-width: calc(
    100% - ${rhythm(GLOBAL_MARGIN / 2 * SMALL_SCREEN_MULTIPLIER * 2)}
  );
  margin: ${rhythm(GLOBAL_MARGIN / 2 * SMALL_SCREEN_MULTIPLIER)} auto;

  ${breakpoint(348)} {
    max-width: calc(
      100% - ${rhythm(GLOBAL_MARGIN * SMALL_SCREEN_MULTIPLIER * 2)}
    );
    margin: ${rhythm(GLOBAL_MARGIN * SMALL_SCREEN_MULTIPLIER)} auto;
  }

  ${breakpoint('medium')} {
    max-width: calc(100% - ${rhythm(GLOBAL_MARGIN * 2)});
    margin: ${rhythm(GLOBAL_MARGIN)} auto;
  }

  ${breakpoint('large')} {
    display: grid;
    column-gap: ${rhythm(GLOBAL_MARGIN)};
    max-width: calc(${rhythm(22)} - ${rhythm(GLOBAL_MARGIN * 2)});
    grid-template:
      'header body' fit-content(100%)
      'header footer' 1fr / 198px 1fr;

    @supports (display: grid) {
      max-width: calc(100% - ${rhythm(GLOBAL_MARGIN * 2)});
      height: calc(100vh - ${rhythm(GLOBAL_MARGIN * 2)});
      min-height: ${rhythm(12)};
    }
  }
`;

export const Body = styled.div`
  grid-area: body;

  ${breakpoint('large')} {
    @supports (display: grid) {
      max-height: 100%;
      overflow-y: auto;
    }
  }
`;

export const StyledHeader = styled(Header)`
  grid-area: header;
`;

export const StyledFooter = styled(Footer)`
  grid-area: footer;
`;

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
interface LayoutProps extends Element<'div'> {
  frontmatter?: Frontmatter;
}
