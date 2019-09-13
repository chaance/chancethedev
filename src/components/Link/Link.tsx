import React from 'react';
import GatsbyLink from 'gatsby-link';
import { LinkProps } from './index';

const Link: React.FC<LinkProps> = ({ children, to, getProps, ...other }) => {
  const internal = /^\/(?!\/)/.test(to);

  if (internal) {
    return (
      <GatsbyLink to={to} getProps={getProps} {...other}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={to} {...other}>
      {children}
    </a>
  );
};

export default Link;
