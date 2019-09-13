import React from 'react';
import { useId } from '$lib/hooks';
import { SVGProps, IconProps } from './index';

export const SVG: React.FC<SVGProps> = ({
  children,
  title,
  titleId,
  ...props
}) => {
  const _titleId = useId('svg-');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      role="img"
      {...props}
    >
      <title id={titleId || _titleId}>{title}</title>
      {children}
    </svg>
  );
};

export const TwitterIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Twitter Icon',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      title={title}
      {...props}
    >
      <path d="M16.5,1.84a7.13,7.13,0,0,1-2.18.88A3.39,3.39,0,0,0,11.77,1.6,3.48,3.48,0,0,0,8.28,5.08a5.31,5.31,0,0,0,.07.81A9.94,9.94,0,0,1,1.18,2.22,3.9,3.9,0,0,0,.68,4,3.65,3.65,0,0,0,2.24,6.88,3.38,3.38,0,0,1,.69,6.44V6.5a3.52,3.52,0,0,0,2.8,3.42,6.69,6.69,0,0,1-.94.12L1.93,10a3.5,3.5,0,0,0,3.24,2.43A7.38,7.38,0,0,1,.81,13.9L0,13.85a10,10,0,0,0,5.36,1.56,9.84,9.84,0,0,0,9.9-9.9V5A6.81,6.81,0,0,0,17,3.2a6.62,6.62,0,0,1-2,.56,3.33,3.33,0,0,0,1.5-1.93" />
    </SVG>
  );
};
export const GithubIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Twitter Icon',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      title={title}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </SVG>
  );
};
