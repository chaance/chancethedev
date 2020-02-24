import { assign, createMachine } from '@xstate/fsm';
// import { useMachine } from '@xstate/react';

// TODO: WIP

type AudioStateProps = {
  loop: boolean;
  preload: boolean;
};

export enum AudioStates {
  Idle = 'IDLE', // LOADING | ERROR
  Buffering = 'BUFFERING', // PLAY_READY | ERROR
  PlayReady = 'PLAY_READY', // PLAYING | BUFFERING | SEEKING | PAUSED | ERROR
  Playing = 'PLAYING', // PAUSED | PLAYING_COMPLETE | SEEKING | LOADING | ERROR
  Paused = 'PAUSED', // PLAYING | SEEKING | ERROR
  Seeking = 'SEEKING', // prev state (PLAYING | PLAY_READY | PAUSED)
  Error = 'ERROR',
}

export enum AudioEvents {
  Buffer = 'BUFFER', // immediately on mount, onWaiting
  BufferComplete = 'BUFFER_COMPLETE', // onCanPlay
  Complete = 'COMPLETE', // onEnded
  GetDataFromProps = 'GET_DATA_FROM_PROPS',
  HandleTimeChange = 'HANDLE_TIME_CHANGE',
  Mount = 'MOUNT', // callback after ref is set
  Pause = 'PAUSE',
  Play = 'PLAY',
  PlayFromStart = 'PLAY_FROM_START',
  Reset = 'RESET',
  SeekStart = 'SEEK_START', // set to pause
  SeekStop = 'SEEK_STOP', // set to previous state before pause
  SetCanPlay = 'SET_CAN_PLAY',
  SetError = 'SET_ERROR',
  SetTime = 'SET_TIME',
  SetVolume = 'SET_VOLUME',
  Stall = 'STALL',
  Stop = 'STOP',
  ToggleLoop = 'TOGGLE_LOOP',
  ToggleMute = 'TOGGLE_MUTE',
}

type AudioContext = {
  canPlay: boolean;
  currentTime: number;
  audio?: HTMLAudioElement;
  error?: string | null;
  previouslyPlaying: boolean;
  preload: boolean;
  previousVolume: number;
  loop: boolean;
  volume: number;
};

type AudioEvent =
  | { type: AudioEvents.GetDataFromProps; props: Partial<AudioStateProps> }
  | { type: AudioEvents.Buffer; src: string }
  | { type: AudioEvents.BufferComplete }
  | { type: AudioEvents.Complete; loop: boolean }
  | { type: AudioEvents.HandleTimeChange; time: number }
  | { type: AudioEvents.Mount; audio: HTMLAudioElement }
  | { type: AudioEvents.Pause }
  | { type: AudioEvents.Play }
  | { type: AudioEvents.PlayFromStart }
  | { type: AudioEvents.Reset }
  | { type: AudioEvents.SeekStart }
  | { type: AudioEvents.SeekStop; time: number }
  | { type: AudioEvents.SetError; error: string }
  | { type: AudioEvents.SetTime; time: number }
  | { type: AudioEvents.SetVolume; volume: number }
  | { type: AudioEvents.Stall }
  | { type: AudioEvents.Stop }
  | { type: AudioEvents.ToggleLoop }
  | { type: AudioEvents.ToggleMute };

type AudioState =
  | { value: AudioStates.Idle; context: AudioContext }
  | { value: AudioStates.Buffering; context: AudioContext }
  | { value: AudioStates.PlayReady; context: AudioContext }
  | { value: AudioStates.Playing; context: AudioContext }
  | { value: AudioStates.Paused; context: AudioContext }
  | { value: AudioStates.Seeking; context: AudioContext }
  | { value: AudioStates.Error; context: AudioContext };

export const commonNonErrorEvents = {
  [AudioEvents.SetCanPlay]: {
    actions: assign({ canPlay: true }),
  },
  [AudioEvents.Buffer]: AudioStates.Buffering,
  [AudioEvents.SetTime]: {
    actions: (
      context: AudioContext,
      event: { type: AudioEvents.SetTime; time: number }
    ) => {
      if (context.audio) {
        context.audio.currentTime = event.time;
      }
    },
  },
  [AudioEvents.HandleTimeChange]: {
    actions: (
      _: AudioContext,
      event: { type: AudioEvents.HandleTimeChange; time: number }
    ) => {
      assign({ currentTime: event.time });
    },
  },
  [AudioEvents.SetVolume]: {
    actions: (
      context: AudioContext,
      event: { type: AudioEvents.SetVolume; volume: number }
    ) => {
      const { audio, volume: previousVolume } = context;
      const { volume: newVolume } = event;
      if (audio) {
        audio.volume = Math.max(Math.min(newVolume / 100, 1), 0);
      }
      assign({ previousVolume, volume: newVolume });
    },
  },
  [AudioEvents.ToggleMute]: {
    actions: (context: AudioContext) => {
      const { audio, previousVolume, volume } = context;
      const newVolume =
        volume === 0 ? (previousVolume >= 1 ? 100 : previousVolume) : 0;
      if (audio) {
        audio.volume = Math.max(Math.min(newVolume / 100, 1), 0);
      }
      assign({
        previousVolume: volume,
        volume: newVolume,
      });
    },
  },
  [AudioEvents.ToggleLoop]: {
    actions: (context: AudioContext) => {
      assign({ loop: !context.loop });
    },
  },
};

export const commonEvents = {
  // React to any prop changes, a la getDerivedStateFromProps
  [AudioEvents.GetDataFromProps]: {
    actions: assign(
      (
        context: AudioContext,
        event: {
          type: AudioEvents.GetDataFromProps;
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
  // Should fire any time a ref is attached to a new DOM node
  [AudioEvents.Mount]: {
    target: AudioStates.Idle,
    actions: assign(
      (
        context: AudioContext,
        event: { type: AudioEvents.Mount; audio: HTMLAudioElement }
      ): AudioContext => {
        return {
          ...context,
          canPlay: false,
          previouslyPlaying: false,
          audio: event.audio,
        };
      }
    ),
  },
  [AudioEvents.Reset]: {
    target: AudioStates.Idle,
    actions: assign({ previouslyPlaying: false }),
  },
  [AudioEvents.SetError]: {
    target: AudioStates.Error,
    actions: assign(
      (
        context: AudioContext,
        event: { type: AudioEvents.SetError; error: string }
      ): AudioContext => {
        return {
          ...context,
          previouslyPlaying: false,
          error: event.error,
        };
      }
    ),
  },
};

export const playerMachine = createMachine<
  AudioContext,
  AudioEvent,
  AudioState
>({
  id: 'player',
  initial: AudioStates.Idle,
  context: {
    canPlay: false,
    currentTime: 0,
    error: null,
    loop: false,
    preload: false,
    previouslyPlaying: false,
    volume: 100,
    previousVolume: 100,
  },
  states: {
    [AudioStates.Idle]: {
      on: {
        ...commonEvents,
        [AudioEvents.Buffer]: AudioStates.Buffering,
        [AudioEvents.Play]: [
          {
            target: AudioStates.Playing,
            cond: context => context.canPlay,
          },
          {
            target: AudioStates.Buffering,
            actions: assign({ previouslyPlaying: true }),
          },
        ],
      },
      entry: context => {
        if (context.audio) {
          context.audio.pause();
          context.audio.currentTime = 0;
        }
      },
    },
    [AudioStates.Buffering]: {
      on: {
        ...commonEvents,
        [AudioEvents.BufferComplete]: [
          {
            target: AudioStates.Playing,
            cond: context => context.previouslyPlaying,
            actions: assign({ canPlay: true }),
          },
          {
            target: AudioStates.PlayReady,
            actions: assign({ canPlay: true }),
          },
        ],
      },
      entry: assign({ canPlay: false }),
    },
    [AudioStates.PlayReady]: {
      on: {
        ...commonEvents,
        ...commonNonErrorEvents,
        [AudioEvents.Play]: AudioStates.Playing,
        [AudioEvents.SeekStart]: AudioStates.Seeking,
      },
    },
    [AudioStates.Playing]: {
      on: {
        ...commonEvents,
        ...commonNonErrorEvents,
        [AudioEvents.Pause]: AudioStates.Paused,
        [AudioEvents.SeekStart]: AudioStates.Seeking,
        [AudioEvents.Complete]: [
          {
            target: AudioStates.Playing,
            cond: context => context.loop,
            actions: context => {
              if (context.audio) {
                context.audio.currentTime = 0;
              }
            },
          },
          {
            target: AudioStates.Idle,
            actions: [
              context => {
                if (context.audio) {
                  context.audio.pause();
                  context.audio.currentTime = 0;
                }
              },
              assign({ previouslyPlaying: false }),
            ],
          },
        ],
      },
      entry: context => {
        context.audio && context.audio.play();
      },
      exit: assign({ previouslyPlaying: true }),
    },
    [AudioStates.Paused]: {
      on: {
        ...commonEvents,
        ...commonNonErrorEvents,
        [AudioEvents.Play]: AudioStates.Playing,
        [AudioEvents.SeekStart]: AudioStates.Seeking,
      },
      entry: context => {
        context.audio && context.audio.pause();
      },
      exit: assign({ previouslyPlaying: false }),
    },
    [AudioStates.Seeking]: {
      on: {
        ...commonEvents,
        ...commonNonErrorEvents,
        [AudioEvents.SeekStop]: [
          {
            target: AudioStates.Playing,
            cond: context => context.previouslyPlaying && context.canPlay,
          },
          {
            target: AudioStates.Buffering,
            cond: context => context.previouslyPlaying && !context.canPlay,
          },
          { target: AudioStates.Paused },
        ],
      },
      entry: context => {
        context.audio && context.audio.pause();
      },
      exit: (context, event) => {
        if (context.audio && event.type === AudioEvents.SeekStop) {
          context.audio.currentTime = event.time;
        }
      },
    },
    [AudioStates.Error]: {
      on: {
        ...commonEvents,
      },
      entry: assign({ previouslyPlaying: false }),
    },
  },
});
