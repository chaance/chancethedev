import React from 'react';

import Title from './Title';
import Subtitle from './Subtitle';
import Paragraph from './Paragraph';
import Code from './Code';
import { Element } from '$lib/types';

export default {
  h1: (props: Element<'h1'>) => <Title {...props} />,
  h2: (props: Element<'h2'>) => <Subtitle {...props} />,
  p: (props: Element<'p'>) => <Paragraph {...props} />,
  code: Code,
  pre: (props: Element<'pre'>) => <pre {...props} />,
};
