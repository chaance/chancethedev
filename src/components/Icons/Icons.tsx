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
      aria-labelledby={titleId || _titleId}
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
      viewBox="0 0 17 17"
      title={title}
      {...props}
    >
      <path d="M16.5,1.83a6.89,6.89,0,0,1-2.18.88,3.43,3.43,0,0,0-2.55-1.12A3.49,3.49,0,0,0,8.28,5.06h0a5.31,5.31,0,0,0,.07.81A9.89,9.89,0,0,1,1.18,2.21,3.88,3.88,0,0,0,.68,4,3.62,3.62,0,0,0,2.24,6.87,3.26,3.26,0,0,1,.69,6.43v.06a3.51,3.51,0,0,0,2.8,3.42,4.94,4.94,0,0,1-.94.12l-.62,0a3.47,3.47,0,0,0,3.24,2.43A7.32,7.32,0,0,1,.81,13.89L0,13.84A10,10,0,0,0,5.36,15.4a9.83,9.83,0,0,0,9.9-9.77V5A6.48,6.48,0,0,0,17,3.19a6.35,6.35,0,0,1-2,.56,3.27,3.27,0,0,0,1.5-1.93" />
    </SVG>
  );
};
export const GithubIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'GitHub Icon',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 17 17"
      title={title}
      {...props}
    >
      <path d="M8.5.7A8,8,0,0,0,6,16.29c.4.07.55-.17.55-.38s0-.82,0-1.49c-2,.37-2.53-.49-2.69-.94A2.91,2.91,0,0,0,3,12.35c-.28-.15-.68-.52,0-.53a1.6,1.6,0,0,1,1.23.82,1.71,1.71,0,0,0,2.33.66,1.68,1.68,0,0,1,.51-1.07c-1.78-.2-3.64-.89-3.64-4a3.11,3.11,0,0,1,.82-2.15A2.87,2.87,0,0,1,4.32,4s.67-.21,2.2.82a7.54,7.54,0,0,1,4,0c1.53-1,2.2-.82,2.2-.82a2.87,2.87,0,0,1,.08,2.12,3.1,3.1,0,0,1,.82,2.15c0,3.07-1.87,3.75-3.65,4a1.89,1.89,0,0,1,.54,1.48c0,1.07,0,1.93,0,2.2s.15.46.55.38A8,8,0,0,0,8.5.7Z" />
    </SVG>
  );
};

export const PlayIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Play',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 29 40"
      title={title}
      {...props}
    >
      <polygon points="0,40 29,20 0,0 " />
    </SVG>
  );
};

// || Pause
export const PauseIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Pause',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 32 32"
      title={title}
      {...props}
    >
      <path d="M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z" />
    </SVG>
  );
};

// |>| Next
export const NextIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Next',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 32 32"
      title={title}
      {...props}
    >
      <path d="M4 4 L24 14 V4 H28 V28 H24 V18 L4 28 z " />
    </SVG>
  );
};

// |<| Prev
export const PrevIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Previous',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 32 32"
      title={title}
      {...props}
    >
      <path d="M4 4 H8 V14 L28 4 V28 L8 18 V28 H4 z " />
    </SVG>
  );
};

// Download
export const DownloadIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Download',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 32 32"
      title={title}
      {...props}
    >
      <rect x="1" y="24" width="30" height="5" />
      <polygon points="32.05 3 16.02 20 0 3 32.05 3" />
    </SVG>
  );
};

// Loading
export const LoadingIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Loading',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 32 32"
      title={title}
      {...props}
    >
      <circle cx="5.5" cy="16" r="2.5" />
      <circle cx="26.5" cy="16" r="2.5" />
      <circle cx="16" cy="16" r="2.5" />
    </SVG>
  );
};

// Volume
export const VolumeIcon: React.FC<IconProps> = ({
  size = 20,
  title = 'Volume',
  ...props
}) => {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 75 75"
      title={title}
      fill="currentColor"
      stroke="currentColor"
      {...props}
    >
      {props.children}
    </SVG>
  );
};

export const VolumeIconLoud = ({ title = 'Volume Loud', ...props }) => {
  return (
    <VolumeIcon title={title} {...props}>
      <polygon
        points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
        style={{ strokeWidth: 5, strokeLinejoin: 'round' }}
      />
      <path
        d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577"
        style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
      />
      <path
        d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076"
        style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
      />
      <path
        d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01"
        style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
      />
    </VolumeIcon>
  );
};

export const VolumeIconMute = ({ title = 'Volume Mute', ...props }) => {
  return (
    <VolumeIcon title={title} {...props}>
      <polygon
        points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
        style={{
          stroke: 'currentColor',
          strokeWidth: 5,
          strokeLinejoin: 'round',
        }}
      />
      <path
        d="M 48.651772,50.269646 69.395223,25.971024"
        style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
      />
      <path
        d="M 69.395223,50.269646 48.651772,25.971024"
        style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
      />
    </VolumeIcon>
  );
};
