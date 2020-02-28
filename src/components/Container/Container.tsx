import React from 'react';
import cx from 'classnames';
import { ContainerProps } from './index';

const styles = require('./Container.module.scss');

const Container: React.FC<ContainerProps> = ({ className, ...props }) => {
  return (
    <div className={cx(className, 'Container', styles.container)} {...props}>
      {props.children}
    </div>
  );
};

export default Container;
