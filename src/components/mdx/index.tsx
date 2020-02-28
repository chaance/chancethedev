import React from 'react';
import classNames from 'classnames';
import Code from './Code';
import { H1, H2, H3, H4, H5, H6 } from '$components/Heading';
import { Element } from '$lib/types';

const styles = require('./mdx.module.scss');

function cx(module: string, className?: string) {
  return classNames(className, styles[module] || module);
}

export default {
  h1: ({ className, ...props }: Element<'h1'>) => (
    <H1 level={1} className={cx('h1', className)} {...props} />
  ),
  h2: ({ className, ...props }: Element<'h2'>) => (
    <H2 level={2} className={cx('h2', className)} {...props} />
  ),
  h3: ({ className, ...props }: Element<'h2'>) => (
    <H3 level={3} className={cx('h3', className)} {...props} />
  ),
  h4: ({ className, ...props }: Element<'h2'>) => (
    <H4 level={4} className={cx('h4', className)} {...props} />
  ),
  h5: ({ className, ...props }: Element<'h2'>) => (
    <H5 level={5} className={cx('h5', className)} {...props} />
  ),
  h6: ({ className, ...props }: Element<'h2'>) => (
    <H6 level={6} className={cx('h6', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: Element<'blockquote'>) => (
    <blockquote className={cx('blockquote', className)} {...props} />
  ),
  code: Code,
  pre: ({ className, ...props }: Element<'pre'>) => (
    <pre className={cx('pre', className)} {...props} />
  ),
};
