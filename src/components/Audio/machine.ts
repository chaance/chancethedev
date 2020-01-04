import { assign, createMachine } from '@xstate/fsm';
// import { useMachine } from '@xstate/react';

// TODO: WIP

type AudioStateProps = {
  autoPlay: boolean;
  loop: boolean;
  preload: boolean;
};

export enum AudioStates {
  Idle = 'IDLE', // LOADING | ERROR
  Buffering = 'BUFFERING', // PLAY_READY | ERROR
  CheckingReadyToPlay = 'CHECKING_READY_TO_PLAY',
  PlayReady = 'PLAY_READY', // PLAYING | BUFFERING | SEEKING | PAUSED | ERROR
  Playing = 'PLAYING', // PAUSED | PLAYING_COMPLETE | SEEKING | LOADING | ERROR
  Paused = 'PAUSED', // PLAYING | SEEKING | ERROR
  PlayingComplete = 'PLAYING_COMPLETE', // PLAY_READY | PLAYING (check for loop)
  Seeking = 'SEEKING', // prev state (PLAYING | PLAY_READY | PAUSED)
  Error = 'ERROR',
}

export enum AudioEvents {
  Buffer = 'BUFFER', // immediately on mount, onWaiting
  BufferComplete = 'BUFFER_COMPLETE', // onCanPlay
  Complete = 'COMPLETE', // onEnded
  GetStateFromProps = 'GET_STATE_FROM_PROPS',
  Mount = 'MOUNT', // callback after ref is set
  Pause = 'PAUSE',
  Play = 'PLAY',
  PlayFromStart = 'PLAY_FROM_START',
  Reset = 'RESET',
  SeekStart = 'SEEK_START', // set to pause
  SeekStop = 'SEEK_STOP', // set to previous state before pause
  SetError = 'SET_ERROR',
  SetTime = 'SET_TIME',
  SetTimeToStart = 'SET_TIME_TO_START',
  SetVolume = 'SET_VOLUME',
  Stall = 'STALL',
  Stop = 'STOP',
  ToggleLoop = 'TOGGLE_LOOP',
  ToggleMute = 'TOGGLE_MUTE',
}

type AudioContext = {
  currentTime: number;
  audio?: HTMLAudioElement;
  error?: string | null;
  previousState: AudioStates;
  autoPlay: boolean;
  preload: boolean;
  previousVolume: number;
  loop: boolean;
  volume: number;
};

type AudioEvent = { previousState: AudioStates } & (
  | { type: AudioEvents.GetStateFromProps; props: Partial<AudioStateProps> }
  | { type: AudioEvents.Buffer; src: string }
  | { type: AudioEvents.BufferComplete }
  | { type: AudioEvents.Complete; loop: boolean }
  | { type: AudioEvents.Mount; audio: HTMLAudioElement }
  | { type: AudioEvents.Pause }
  | { type: AudioEvents.Play }
  | { type: AudioEvents.PlayFromStart }
  | { type: AudioEvents.Reset }
  | { type: AudioEvents.SeekStart }
  | { type: AudioEvents.SeekStop }
  | { type: AudioEvents.SetError; error: string }
  | { type: AudioEvents.SetTime; time: number }
  | { type: AudioEvents.SetTimeToStart }
  | { type: AudioEvents.SetVolume; volume: number }
  | { type: AudioEvents.Stall }
  | { type: AudioEvents.Stop }
  | { type: AudioEvents.ToggleLoop }
  | { type: AudioEvents.ToggleMute }
);

type AudioState =
  | { value: AudioStates.Idle; context: AudioContext }
  | { value: AudioStates.Buffering; context: AudioContext }
  | { value: AudioStates.Buffering; context: AudioContext }
  | { value: AudioStates.PlayReady; context: AudioContext }
  | { value: AudioStates.Playing; context: AudioContext }
  | { value: AudioStates.Paused; context: AudioContext }
  | { value: AudioStates.PlayingComplete; context: AudioContext }
  | { value: AudioStates.Seeking; context: AudioContext }
  | { value: AudioStates.Error; context: AudioContext };

export const commonNonErrorEvents = {
  [AudioEvents.SetTime]: {
    actions: (
      _: AudioContext,
      event: { type: AudioEvents.SetTime; time: number }
    ) => {
      assign({ currentTime: event.time });
    },
  },
  [AudioEvents.SetTimeToStart]: {
    actions: assign({ currentTime: 0 }),
  },
  [AudioEvents.SetVolume]: {
    actions: (
      context: AudioContext,
      event: { type: AudioEvents.SetVolume; volume: number }
    ) => {
      assign({ previousVolume: context.volume, volume: event.volume });
    },
  },
  [AudioEvents.ToggleMute]: {
    actions: (context: AudioContext) => {
      const { previousVolume, volume } = context;
      assign({
        previousVolume: volume,
        volume: volume === 0 ? (previousVolume >= 1 ? 100 : previousVolume) : 0,
      });
    },
  },
  [AudioEvents.ToggleLoop]: {
    actions: (context: AudioContext) => {
      const { loop: previousLoop } = context;
      assign({ loop: !previousLoop });
    },
  },
};

export const commonEvents = {
  [AudioEvents.GetStateFromProps]: {
    actions: assign(
      (
        context: AudioContext,
        event: {
          type: AudioEvents.GetStateFromProps;
          props: Partial<AudioStateProps>;
        }
      ): AudioContext => {
        return {
          ...context,
          ...event.props,
        };
      }
    ),
  },
  [AudioEvents.Mount]: {
    target: AudioStates.CheckingReadyToPlay,
    actions: assign({
      audio: (
        _: AudioContext,
        event: { type: AudioEvents.Mount; audio: HTMLAudioElement }
      ): HTMLAudioElement => event.audio,
    }),
  },
  [AudioEvents.Reset]: AudioStates.Idle,
  [AudioEvents.SetError]: AudioStates.Error,
};

export const playerMachine = createMachine<
  AudioContext,
  AudioEvent,
  AudioState
>({
  id: 'player',
  initial: AudioStates.Idle,
  context: {
    currentTime: 0,
    autoPlay: false,
    error: null,
    loop: false,
    preload: false,
    previousState: AudioStates.Idle,
    volume: 100,
    previousVolume: 100,
  },
  states: {
    [AudioStates.Idle]: {
      on: {
        ...commonEvents,
        [AudioEvents.SetTimeToStart]: {
          target: AudioStates.Idle,
        },
      },
      entry: ['resetProgress'],
    },
    [AudioStates.CheckingReadyToPlay]: {
      on: {
        ...commonEvents,
        [AudioEvents.Pause]: AudioStates.Paused,
        [AudioEvents.Play]: AudioStates.Playing,
        [AudioEvents.Buffer]: AudioStates.Buffering,
      },
      entry: ['checkReadyToPlay'],
    },
    [AudioStates.Buffering]: {
      on: {
        ...commonEvents,
        [AudioEvents.Pause]: AudioStates.Paused,
        [AudioEvents.BufferComplete]: AudioStates.PlayReady,
      },
    },
    [AudioStates.PlayReady]: {
      on: {
        ...commonEvents,
        [AudioEvents.Play]: AudioStates.Playing,
        [AudioEvents.Pause]: AudioStates.Paused,
        [AudioEvents.SeekStart]: AudioStates.Seeking,
      },
      entry: ['playMaybe'],
    },
    [AudioStates.Playing]: {
      on: {
        ...commonEvents,
        [AudioEvents.Pause]: AudioStates.Paused,
        [AudioEvents.SeekStart]: AudioStates.Seeking,
        [AudioEvents.Complete]: AudioStates.PlayingComplete,
      },
    },
    [AudioStates.Paused]: {
      on: {
        ...commonEvents,
        [AudioEvents.Play]: AudioStates.Playing,
        [AudioEvents.SeekStart]: AudioStates.Seeking,
      },
    },
    [AudioStates.PlayingComplete]: {
      on: {
        ...commonEvents,
        [AudioEvents.Play]: AudioStates.Playing,
        // TODO: PLAY_READY | PLAYING (check for loop)
      },
      entry: ['checkLoop'],
    },
    [AudioStates.Seeking]: {
      on: {
        ...commonEvents,
        // TODO: prev state (PLAYING | PLAY_READY | PAUSED)
        [AudioEvents.SeekStop]: AudioStates.CheckingReadyToPlay,
      },
    },
    [AudioStates.Error]: {
      on: {
        ...commonEvents,
      },
    },
    // inactive: { on: { TOGGLE: 'active' } },
    // active: { on: { TOGGLE: 'inactive' } },
  },
});

/*
// Set previousState on every state change
let [state, _send] = useMachine(playerMachine);
let send = useCallback((...args: [string, Omit<AudioEvent, 'previousState'>] | [Omit<AudioEvent, 'previousState'>]) => {
  let previousState = state;
  if (typeof args[0] === 'string') {
    let [event, rest = {}] = args;
    _send(event, { ...rest, previousState });
  } else {
    _send({ ...args[0], previousState });
  }
}, [state, _send]);
*/
