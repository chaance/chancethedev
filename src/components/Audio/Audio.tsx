import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { rgba, rem } from 'polished';
import SRT from '$components/SRT';
import { DownloadIcon } from '$components/Icons';
import { withCustomAudio } from './react-soundplayer/addons';
import { EmotionTheme } from '$providers/theme';
import {
  PlayButton,
  Progress,
  Timer,
  VolumeButton,
  VolumeControl,
  VolumeRange,
} from './components';
import { fonts } from '$lib/typography';

// TODO: Lots of bugs in this component; refactoring as we go.

interface AudioPlayerState {
  duration: number;
  currentTime: number;
  isSeeking: boolean;
  isPlaying: boolean;
  playReady: boolean;
  volume: number;
  isMuted: boolean;
}

export type AudioPlayerAction =
  | { type: 'SET_PLAYING' }
  | { type: 'SET_PAUSE' }
  | { type: 'START_SEEKING' }
  | { type: 'SEEK'; time: number }
  | { type: 'STOP_SEEKING'; time: number }
  | { type: 'SET_ELAPSED_TIME' }
  | { type: 'SET_TO_BEGINNING' }
  | { type: 'PLAY_FROM_BEGINNING' }
  | { type: 'TOGGLE_LOOP' }
  | { type: 'TOGGLE_PLAYING' }
  | { type: 'MUTE' }
  | { type: 'SET_VOLUME' };

const initialState: AudioPlayerState = {
  duration: 0,
  currentTime: 0,
  isSeeking: false,
  isPlaying: false,
  playReady: true,
  volume: 1,
  isMuted: false,
};

const reducer = (
  state: AudioPlayerState,
  action: AudioPlayerAction
): AudioPlayerState => {
  switch (action.type) {
    case 'SET_PLAYING':
      return { ...state, isPlaying: true };
    case 'SET_PAUSE':
      return { ...state, isPlaying: false };
    case 'TOGGLE_PLAYING':
      return { ...state, isPlaying: !state.isPlaying };
    case 'START_SEEKING':
      return {
        ...state,
        isSeeking: true,
      };
    case 'SEEK':
      return {
        ...state,
        isSeeking: true,
        currentTime: action.time,
      };
    case 'STOP_SEEKING':
      return {
        ...state,
        isSeeking: false,
        currentTime: action.time,
      };
    default:
      return state;
  }
};

const AudioPlayer = withCustomAudio(({ className, ...props }: any) => {
  // const { streamUrl } = props;
  return (
    <Container className={className}>
      <StyledPlayButton {...props} />
      <StyledVolume {...props}>
        {({ handleMute, isMuted, volume, value, handleVolumeChange }: any) => (
          <React.Fragment>
            <StyledVolumeButton
              onClick={handleMute}
              isMuted={isMuted}
              volume={volume}
            />
            <StyledRangeContainer>
              <StyledRange
                className=""
                onChange={handleVolumeChange}
                value={value}
              />
            </StyledRangeContainer>
          </React.Fragment>
        )}
      </StyledVolume>
      <StyledProgress {...props} />
      <StyledTimer {...props} />
      {/* <StyledDownloadLink
        href={streamUrl}
        target="_blank"
        rel="noreferrer noopener"
        tabIndex={0}
        role="button"
      >
        <DownloadIcon fill="currentColor" aria-hidden />
        <SRT>Download the episode</SRT>
      </StyledDownloadLink> */}
    </Container>
  );
});

export default AudioPlayer;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const trackStyles = (theme: EmotionTheme) =>
  css({
    background: rgba(theme.colors.text, 0.2),
    height: `0.5em`,
    borderRadius: '0.25em',
  });

export const thumbStyles = (theme: EmotionTheme) =>
  css({
    height: '1em',
    width: '1em',
    border: 0,
    borderRadius: '0.5em',
    background: theme.colors.primary,
    cursor: 'pointer',
    appearance: 'none',
    marginTop: '-0.25em',
  });

export const buttonStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  appearance: 'none',
  border: 0,
  margin: 0,
  height: '2.5rem',
  width: '2.5rem',
  padding: '0.5rem',
  background: 0,
  color: 'inherit',
  cursor: 'pointer',
  '& svg': {
    overflow: 'hidden',
    position: 'relative',
    width: '1em',
    height: '1em',
    maxHeight: '100%',
    verticalAlign: 'middle',
    color: 'inherit',
  },
});

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  background: 0;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 3px;
  font-family: ${fonts.sans};

  input:focus {
    outline-offset: 5px;
  }
`;

export const StyledProgress = styled(Progress)`
  width: 100%;
  height: 10px;
  margin: 0 0.5rem;
  background: ${({ theme }) => rgba(theme.colors.text, 0.2)};
  cursor: pointer;

  & > * {
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledVolume: any = styled(VolumeControl)`
  display: flex;
  align-items: center;
`;

export const StyledTimer: any = styled(Timer)`
  font-size: 0.75rem;
  white-space: nowrap;
`;

export const StyledPlayButton = styled(PlayButton)`
  flex: none;
  ${buttonStyles};
  padding: 0;
  width: ${rem(29)};
  height: ${rem(40)};

  svg {
    width: inherit;
    height: inherit;
  }
`;

export const StyledDownloadLink = styled.a`
  flex: none;
  ${buttonStyles};

  @media (max-width: 400px) {
    display: none;
  }
`;

export const StyledVolumeButton = styled(VolumeButton)`
  ${buttonStyles};
`;

export const StyledRange = styled(VolumeRange)`
  border: 0;
  background: 0;
  user-select: none !important;
  cursor: default;
  appearance: none;
  width: 98%;

  &::-ms-track {
    ${({ theme }) => trackStyles(theme)};
  }

  &::-webkit-slider-runnable-track {
    ${({ theme }) => trackStyles(theme)};
  }

  &::-moz-range-track {
    ${({ theme }) => trackStyles(theme)};
  }

  &::-webkit-slider-thumb {
    ${({ theme }) => thumbStyles(theme)};
  }

  &::-moz-range-thumb {
    ${({ theme }) => thumbStyles(theme)};
  }

  &::-ms-thumb {
    ${({ theme }) => thumbStyles(theme)};
  }
`;

export const StyledRangeContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 0;
  height: 2.25em;
  transition: width 0.2s ease-out;
  position: relative;
  background: 0;

  ${StyledVolume}:hover &,
  ${StyledVolume}:focus-within & {
    width: 80px;
    overflow: visible;
  }
`;
