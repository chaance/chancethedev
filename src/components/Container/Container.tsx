import React from 'react';
import { getBem } from '$lib/utils';
import { ContainerProps } from './index';
import './Container.scss';

let bem = getBem('Container');

const Container: React.FC<ContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={bem(className)} {...props}>
      {props.children}
    </div>
  );
};

export default Container;
