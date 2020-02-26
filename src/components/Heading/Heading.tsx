import React, { createContext, useContext } from 'react';
import cx from 'classnames';
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
export const HT: React.FC<HProps> = ({ className, ...props }) => (
  <H className={cx(className, 'h-title')} {...props} />
);

export const H1: React.FC<HProps> = ({ className, ...props }) => (
  <H className={cx(className, 'h1')} {...props} />
);

export const H2: React.FC<HProps> = ({ className, ...props }) => (
  <H className={cx(className, 'h2')} {...props} />
);

export const H3: React.FC<HProps> = ({ className, ...props }) => (
  <H className={cx(className, 'h3')} {...props} />
);

export const H4: React.FC<HProps> = ({ className, ...props }) => (
  <H className={cx(className, 'h4')} {...props} />
);

export const H5: React.FC<HProps> = ({ className, ...props }) => (
  <H className={cx(className, 'h5')} {...props} />
);

export const H6: React.FC<HProps> = ({ className, ...props }) => (
  <H className={cx(className, 'h6')} {...props} />
);
