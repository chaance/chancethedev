import React, { createContext, useContext } from 'react';
import styled from '@emotion/styled';
import { rem } from 'polished';
import { breakpoint } from '$lib/styles';
import { fonts } from '$lib/typography';
import { SectionProps, HProps, HLevel } from './index';

export const LevelContext = createContext<HLevel>(1);

export const Section: React.FC<SectionProps> = ({
  wrap,
  children,
  ...passedProps
}) => {
  const Wrapper = wrap ? 'section' : React.Fragment;
  const props = wrap ? passedProps : {};
  const level = useContext(LevelContext);
  return (
    <Wrapper {...props}>
      <LevelContext.Provider value={Math.min(level + 1, 6) as HLevel}>
        {children}
      </LevelContext.Provider>
    </Wrapper>
  );
};

export const H: React.FC<HProps> = ({ level: levelProp, ...props }) => {
  const level = useContext(LevelContext);
  const Heading = `h${levelProp ? levelProp : level}`;
  return <Heading {...props} />;
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const HT = styled(H)`
  font-size: ${rem(22)};
  font-family: ${fonts.serif};
  font-weight: normal;
  ${breakpoint('medium')} {
    font-size: ${rem(36)};
  }
`;

export const H1 = styled(H)`
  font-size: ${rem(20)};
  font-weight: bold;
  ${breakpoint('medium')} {
    font-size: ${rem(32)};
  }
`;

export const H2 = styled(H)`
  font-size: ${rem(18)};
  ${breakpoint('medium')} {
    font-size: ${rem(24)};
  }
`;

export const H3 = styled(H)`
  font-size: ${rem(16)};
  ${breakpoint('medium')} {
    font-size: ${rem(20)};
  }
`;

export const H4 = styled(H)`
  font-size: ${rem(16)};
  ${breakpoint('medium')} {
    font-size: ${rem(18)};
  }
`;

export const H5 = styled(H)`
  font-size: ${rem(16)};
  letter-spacing: 0.5;
  text-transform: uppercase;
`;

export const H6 = styled(H)`
  font-size: ${rem(14)};
  letter-spacing: 0.5;
  text-transform: uppercase;
`;
