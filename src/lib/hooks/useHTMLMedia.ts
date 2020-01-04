import React, {
  cloneElement,
  createElement,
  isValidElement,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { wrapEvent } from '$lib/utils';

type HTMLAudioProps = Omit<React.HTMLProps<HTMLAudioElement>, 'src'> & {
  src: string;
};

type HTMLVideoProps = Omit<React.HTMLProps<HTMLVideoElement>, 'src'> & {
  src: string;
};

type HTMLMediaProps = HTMLAudioProps | HTMLVideoProps;

type MediaState = {
  buffered: any[];
  duration: number;
  paused: boolean;
  muted: boolean;
  currentTime: number;
  volume: number;
};

interface MediaControls {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (currentTime: number) => void;
}

enum MediaActionTypes {
  GetDerivedState = 'GET_DERIVED_STATE',
  Play = 'PLAY',
  Pause = 'PAUSE',
  ChangeVolume = 'CHANGE_VOLUME',
  ChangeDuration = 'CHANGE_DURATION',
  ChangeTime = 'CHANGE_TIME',
  Progress = 'PROGRESS',
}

type MediaAction =
  | {
      type: MediaActionTypes.GetDerivedState;
      volume: number;
      paused: boolean;
    }
  | {
      type: MediaActionTypes.Play;
    }
  | {
      type: MediaActionTypes.Pause;
    }
  | {
      type: MediaActionTypes.ChangeVolume;
      volume: number;
    }
  | {
      type: MediaActionTypes.ChangeDuration;
      duration: number;
      buffered: TimeRanges;
    }
  | {
      type: MediaActionTypes.Progress;
      buffered: TimeRanges;
    }
  | {
      type: MediaActionTypes.ChangeTime;
      currentTime: number;
    };

const initialState: MediaState = {
  buffered: [] as any,
  currentTime: 0,
  duration: 0,
  paused: true,
  muted: false,
  volume: 1,
};

export function useHTMLMedia(
  tag: 'audio' | 'video',
  ref: React.MutableRefObject<HTMLMediaElement | null>,
  elOrProps: HTMLMediaProps | React.ReactElement<HTMLMediaProps>
): [React.ReactElement<HTMLMediaProps>, MediaState, MediaControls] {
  let element: React.ReactElement<any>;
  let props: HTMLMediaProps;

  const [state, dispatch] = useReducer(reducer, initialState);

  const onPlay = () => dispatch({ type: MediaActionTypes.Play });

  const onPause = () => dispatch({ type: MediaActionTypes.Pause });

  const onVolumeChange = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    dispatch({ type: MediaActionTypes.ChangeVolume, volume: el.volume });
  };

  const onDurationChange = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const { duration, buffered } = el;
    dispatch({ type: MediaActionTypes.ChangeDuration, duration, buffered });
  };

  const onTimeUpdate = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    dispatch({ type: MediaActionTypes.ChangeTime, currentTime: el.currentTime });
  };

  const onProgress = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    dispatch({ type: MediaActionTypes.Progress, buffered: el.buffered });
  };

  if (isValidElement(elOrProps)) {
    element = elOrProps;
    props = element.props;
    element = cloneElement(elOrProps, {
      controls: false,
      ...props,
      ref,
      onPlay: wrapEvent(props.onPlay, onPlay),
      onPause: wrapEvent(props.onPause, onPause),
      onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
      onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
      onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
      onProgress: wrapEvent(props.onProgress, onProgress),
    });
  } else {
    props = elOrProps as HTMLMediaProps;
    element = createElement(tag, {
      controls: false,
      ...props,
      ref,
      onPlay: wrapEvent(props.onPlay, onPlay),
      onPause: wrapEvent(props.onPause, onPause),
      onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
      onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
      onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
      onProgress: wrapEvent(props.onProgress, onProgress),
    });
  }

  // Some browsers return `Promise` on `.play()` and may throw errors
  // if one tries to execute another `.play()` or `.pause()` while that
  // promise is resolving. So we prevent that with this lock.
  // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
  let lockPlay = false;

  const controls = {
    play: () => {
      const el = ref.current;
      if (!el) {
        return undefined;
      }

      if (!lockPlay) {
        const promise = el.play();
        const isPromise = typeof promise === 'object';

        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise.then(resetLock, resetLock);
        }

        return promise;
      }
      return undefined;
    },
    pause: () => {
      const el = ref.current;
      if (el && !lockPlay) {
        return el.pause();
      }
    },
    seek: (currentTime: number) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }
      currentTime = Math.min(state.duration, Math.max(0, currentTime));
      el.currentTime = currentTime;
    },
    volume: (volume: number) => {
      const el = ref.current;
      if (!el) {
        return;
      }
      volume = Math.min(1, Math.max(0, volume));
      el.volume = volume;
    },
    mute: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.muted = true;
    },
    unmute: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.muted = false;
    },
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'useHTMLMedia() ref to <audio> element is empty at mount. ' +
            'It seem you have not rendered the audio element, which is ' +
            'returns as the first argument const [audio] = useHTMLMedia(...).'
        );
      }
      return;
    }

    dispatch({
      type: MediaActionTypes.GetDerivedState,
      volume: el.volume,
      paused: el.paused,
    });

    // Start media, if autoPlay requested.
    if (props.autoPlay && el.paused) {
      controls.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.src]);

  return [element, state, controls];
}

////////////////////////////////////////////////////////////////////////////////
function parseTimeRanges(ranges: any) {
  const result: { start: number; end: number }[] = [];

  for (let i = 0; i < ranges.length; i++) {
    result.push({
      start: ranges.start(i),
      end: ranges.end(i),
    });
  }

  return result;
}

function reducer(
  state: MediaState = initialState,
  action: MediaAction
): MediaState {
  switch (action.type) {
    case MediaActionTypes.GetDerivedState:
      return {
        ...state,
        volume: action.volume,
        muted: action.volume === 0,
        paused: action.paused,
      };
    case MediaActionTypes.Play:
      return {
        ...state,
        paused: false,
      };
    case MediaActionTypes.Pause:
      return {
        ...state,
        paused: true,
      };
    case MediaActionTypes.ChangeVolume:
      return {
        ...state,
        muted: action.volume === 0,
        volume: action.volume,
      };
    case MediaActionTypes.ChangeDuration:
      return {
        ...state,
        duration: action.duration,
        buffered: parseTimeRanges(action.buffered),
      };
    case MediaActionTypes.ChangeTime:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case MediaActionTypes.Progress:
      return {
        ...state,
        buffered: parseTimeRanges(action.buffered),
      };
    default:
      return state;
  }
}

export function useAudio(
  ref: React.MutableRefObject<HTMLAudioElement | null>,
  elOrProps: HTMLAudioProps | React.ReactElement<HTMLAudioProps>
) {
  return useHTMLMedia('audio', ref, elOrProps);
}

export function useVideo(
  ref: React.MutableRefObject<HTMLVideoElement | null>,
  elOrProps: HTMLVideoProps | React.ReactElement<HTMLVideoProps>
) {
  return useHTMLMedia('video', ref, elOrProps);
}
