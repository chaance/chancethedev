import React, { useEffect, useReducer, useRef } from 'react';
import { usePrevious } from '$lib/hooks';

type PlayerAction =
  | { type: 'SET_PLAY_READY' }
  | { type: 'SET_PLAYING'; time?: number }
  | { type: 'SET_PAUSE' }
  | { type: 'TOGGLE_PLAYING' }
  | { type: 'SET_SEEKING'; time?: number }
  | { type: 'STOP_SEEKING'; playing?: boolean; time: number }
  | { type: 'SET_CURRENT_TIME'; time: number }
  | { type: 'TOGGLE_LOOP' }
  | { type: 'MUTE' }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'SET_TO_BEGINNING'; playing: boolean };

interface PlayerState {
  duration: number;
  currentTime: number;
  seeking: boolean;
  playReady: boolean;
  playing: boolean;
  volume: number;
  muted: boolean;
  loop: boolean;
}

interface AudioSource {
  src: string;
  type?: string;
}

interface PlayerProps {
  render?(...props: any): JSX.Element;
  src: string | string[] | AudioSource | AudioSource[];
  crossOrigin?: string;
  preload?: string;
  children?(...props: any): JSX.Element;
  [key: string]: any;
}

const INITIAL_STATE: PlayerState = {
  duration: 0,
  currentTime: 0,
  seeking: false,
  playReady: false,
  playing: false,
  volume: 1,
  muted: false,
  loop: false,
};

export const Player: React.FC<PlayerProps> = ({
  render,
  src,
  crossOrigin,
  preload,
  children,
  className,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const audioEl = useRef(null);
  const prevPlayingState = usePrevious(state.playing);

  const handleSeek = (seconds = 0) => {
    dispatch({
      type: 'SET_SEEKING',
      time: seconds * 1000 || undefined,
    });
  };

  const stopSeeking = (time: number) =>
    dispatch({
      type: 'STOP_SEEKING',
      time: time || 0,
      playing: prevPlayingState,
    });

  const handlePlayReady = () => dispatch({ type: 'SET_PLAY_READY' });

  const handlePlay = () => state.playReady && dispatch({ type: 'SET_PLAYING' });

  const handlePlayFromTime = (seconds: number = 0) =>
    state.playReady && dispatch({ type: 'SET_PLAYING', time: seconds * 1000 });

  const togglePlaying = () =>
    state.playReady && dispatch({ type: 'TOGGLE_PLAYING' });

  const handlePause = () => state.playing && dispatch({ type: 'SET_PAUSE' });

  const handleEnd = () =>
    dispatch({ type: 'SET_TO_BEGINNING', playing: !!state.loop });

  const handleVolumeChange = (volume: number) =>
    dispatch({ type: 'SET_VOLUME', volume });

  const handleMute = () => dispatch({ type: 'MUTE' });

  const handleTimeUpdate = (time: number) =>
    dispatch({ type: 'SET_CURRENT_TIME', time });

  useEffect(() => {
    return () => {};
  }, []);

  const propsToPass = {
    ...props,
    ...state,
    handleSeek,
    stopSeeking,
    handlePlay,
    handlePlayFromTime,
    handlePlayReady,
    togglePlaying,
    handleMute,
    handlePause,
    handleEnd,
    handleVolumeChange,
  };

  return (
    <div className={className}>
      {render
        ? render(propsToPass)
        : children
        ? children(propsToPass)
        : null}
      <audio
        ref={audioEl}
        src={typeof src === 'string' ? src : undefined}
        controls={false}
        autoPlay={false}
        crossOrigin={crossOrigin}
        loop={state.loop}
        muted={state.muted}
        preload={preload}
        onCanPlay={handlePlayReady}
        onEnded={handleEnd}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeeking={e => handleSeek(e.timeStamp)}
        onSeeked={e => stopSeeking(e.timeStamp)}
        onVolumeChange={e =>
          handleVolumeChange((e.target as HTMLAudioElement).volume)
        }
        onTimeUpdate={e => handleTimeUpdate(e.timeStamp)}
      >
        {renderSource(src)}
      </audio>
    </div>
  );
};

export default Player;

function renderSource(src: any) {
  const render = (s: string | AudioSource, i?: number) => (
    <source
      key={i}
      src={typeof s === 'string' ? s : s.src}
      type={typeof s === 'string' ? undefined : s.type}
    />
  );

  if (typeof src === 'string' || typeof src.src !== 'undefined') {
    return render(src);
  }

  if (Array.isArray(src)) {
    return src.map(render);
  }

  return null;
}

function reducer(state: PlayerState, action: PlayerAction) {
  switch (action.type) {
    case 'SET_PLAY_READY':
      return {
        ...state,
        playReady: true,
      };
    case 'SET_PLAYING':
      return {
        ...state,
        currentTime:
          typeof action.time === 'number'
            ? action.time
            : state.currentTime || 0,
        seeking: false,
        playing: true,
      };
    case 'SET_PAUSE':
      return { ...state, seeking: false, playing: false };
    case 'TOGGLE_PLAYING':
      return { ...state, playing: !state.playing };
    case 'SET_SEEKING':
      return {
        ...state,
        seeking: true,
        playing: false,
        currentTime:
          typeof action.time === 'number'
            ? action.time
            : state.currentTime || 0,
      };
    case 'STOP_SEEKING':
      return {
        ...state,
        seeking: false,
        playing: action.playing || false,
        currentTime:
          typeof action.time === 'number'
            ? action.time
            : state.currentTime || 0,
      };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.time || 0 };
    case 'TOGGLE_LOOP':
      return { ...state, loop: !state.loop };
    case 'MUTE':
      return { ...state, volume: 0, muted: true };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.volume || 0,
        muted: action.volume <= 0,
      };
    case 'SET_TO_BEGINNING':
      return {
        ...state,
        seeking: false,
        playing: action.playing || false,
        currentTime: 0,
      };
    default:
      console.error('Invalid action type passed to reducer');
      return state;
  }
}
