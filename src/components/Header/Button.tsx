import React from 'react';
import Link from '$components/Link';
import { Element } from '$lib/types';

export interface ButtonProps extends Element<'button'> {
  to?: any;
  children: any;
}

const Button: React.FC<any> = ({ to, children, ...props }) => {
  return to ? (
    <Link to={to} {...props}>
      {children}
    </Link>
  ) : (
    <button {...props}>{children}</button>
  );
};

export default Button;
