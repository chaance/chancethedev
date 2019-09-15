// handling multiple audio on the page helpers
let _playedAudios = [];

function each(arr, cb) {
  if (arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] && cb(arr[i], i, arr)) {
        break;
      }
    }
  }
}

export function stopAllOther(playing) {
  each(_playedAudios, audioTrack => {
    if (audioTrack.playing && audioTrack.playing !== playing) {
      audioTrack.stop();
    }
  });
}

export function addToPlayedStore(audioTrack) {
  let isPresent = false;

  each(_playedAudios, _audioTrack => {
    if (_audioTrack.playing === audioTrack.playing) {
      isPresent = true;
      return true;
    }
  });

  if (!isPresent) {
    _playedAudios.push(audioTrack);
  }
}

export function resetPlayedStore() {
  each(_playedAudios, audioTrack => {
    audioTrack.stop();
  });

  _playedAudios = [];
}
