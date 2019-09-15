// NOTE: This HOC is a hack that I'm in the process of phasing out.
//       I do not use soundcloud but the react-soundplayer component works
//       with a direct audio src and fit my needs for the most part.
//       If you stumble upon this and decide to clone it, beware that I
//       expect some unpredictable weirdness.

import React, { Component } from 'react';
import SoundCloudAudio from '../soundcloud-audio';
import hoistStatics from 'hoist-non-react-statics';
import {
  stopAllOther,
  addToPlayedStore,
  resetPlayedStore,
} from '../utils/audioStore.js';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withSoundCloudAudio(WrappedComponent) {
  class WithSoundCloudAudio extends Component {
    constructor(props, context) {
      super(props, context);

      if (!props.clientId && !props.audioTrack && !props.streamUrl) {
        /* console.warn(
          `You need to get a clientId from SoundCloud,
          pass in an instance of SoundCloudAudio
          or use streamUrl with audio source instead
          https://github.com/soundblogs/react-soundplayer#examples`
        ); */
      }

      // Don't create a SoundCloudAudio instance
      // if there is no `window`
      if ('undefined' !== typeof window) {
        if (props.audioTrack) {
          this.audioTrack = props.audioTrack;
        } else {
          this.audioTrack = new SoundCloudAudio(props.clientId);
        }
      }

      this.state = {
        duration: 0,
        currentTime: 0,
        seeking: false,
        playing: false,
        playReady: true,
        volume: 1,
        isMuted: false,
      };
    }

    componentDidMount() {
      this.mounted = true;

      this.requestAudio();
      this.listenAudioEvents();
    }

    componentWillUnmount() {
      this.mounted = false;

      resetPlayedStore();
      this.audioTrack.unbindAll();
    }

    requestAudio() {
      const { audioTrack } = this;
      const { resolveUrl, streamUrl, preloadType, onReady } = this.props;

      if (streamUrl) {
        audioTrack.preload(streamUrl, preloadType);
      } else if (resolveUrl) {
        audioTrack.resolve(resolveUrl, data => {
          if (!this.mounted) {
            return;
          }

          this.setState(
            {
              [data.tracks ? 'playlist' : 'track']: data,
            },
            () => onReady && onReady()
          );
        });
      }
    }

    listenAudioEvents() {
      const { audioTrack } = this;

      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
      audioTrack.on('playing', this.onAudioStarted.bind(this));
      audioTrack.on('timeupdate', this.getCurrentTime.bind(this));
      audioTrack.on('loadedmetadata', this.getDuration.bind(this));
      audioTrack.on('seeking', this.onSeekingTrack.bind(this));
      audioTrack.on('seeked', this.onSeekedTrack.bind(this));
      audioTrack.on('pause', this.onAudioPaused.bind(this));
      audioTrack.on('ended', this.onAudioEnded.bind(this));
      audioTrack.on('volumechange', this.onVolumeChange.bind(this));
    }

    onSeekingTrack() {
      this.setState({ seeking: true });
    }

    onSeekedTrack() {
      this.setState({ seeking: false });
    }

    onAudioStarted() {
      const { audioTrack } = this;
      const { onStartTrack } = this.props;
      this.setState({ playing: true });
      stopAllOther(audioTrack.playing);
      addToPlayedStore(audioTrack);
      onStartTrack && onStartTrack(audioTrack, audioTrack.playing);
    }

    onAudioPaused() {
      const { onPauseTrack } = this.props;
      this.setState({ playing: false });
      onPauseTrack && onPauseTrack(this.audioTrack);
    }

    onAudioEnded() {
      const { onStopTrack } = this.props;
      this.setState({ playing: false });
      onStopTrack && onStopTrack(this.audioTrack);
    }

    onVolumeChange() {
      this.setState({
        volume: this.audioTrack.audio.volume,
        isMuted: this.audioTrack.audio.muted,
      });
    }

    getCurrentTime() {
      this.setState({
        currentTime: this.audioTrack.audio.currentTime,
      });
    }

    getDuration() {
      this.setState({
        duration: this.audioTrack.audio.duration,
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          audioTrack={this.audioTrack}
          {...this.state}
        />
      );
    }
  }

  WithSoundCloudAudio.displayName = `withSoundCloudAudio(${getDisplayName(
    WrappedComponent
  )})`;
  WithSoundCloudAudio.WrappedComponent = WrappedComponent;

  return hoistStatics(WithSoundCloudAudio, WrappedComponent);
}
