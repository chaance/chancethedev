import React from 'react';
import { SRTProps } from './index';

const style = {
  position: 'absolute' as 'absolute',
  height: '1px',
  width: '1px',
  padding: 0,
  border: 0,
  clip: 'rect(0 0 0 0)',
  margin: '-1px',
  overflow: 'hidden',
};

const SRT: React.FC<SRTProps> = ({ component: Comp = 'span', ...props }) => {
  return <Comp style={style} {...props} />;
};

export default SRT;
