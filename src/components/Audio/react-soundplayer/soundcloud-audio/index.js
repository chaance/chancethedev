function SoundCloud() {
  if (!(this instanceof SoundCloud)) {
    return new SoundCloud();
  }

  this._events = {};
  this.playing = false;
  this.duration = 0;

  this.audio = document.createElement('audio');
}

SoundCloud.prototype.on = function(e, fn) {
  this._events[e] = fn;
  this.audio.addEventListener(e, fn, false);
};

SoundCloud.prototype.off = function(e, fn) {
  this._events[e] = null;
  this.audio.removeEventListener(e, fn);
};

SoundCloud.prototype.unbindAll = function() {
  for (const ev in this._events) {
    const fn = this._events[ev];
    if (fn) {
      this.off(ev, fn);
    }
  }
};

SoundCloud.prototype.preload = function(streamUrl, preloadType) {
  this._track = { streamUrl };

  if (preloadType) {
    this.audio.preload = preloadType;
  }

  this.audio.src = streamUrl;
};

SoundCloud.prototype.play = function(options) {
  options = options || {};
  let src;

  if (options.streamUrl) {
    src = options.streamUrl;
  } else if (this._track) {
    src = this._track.streamUrl;
  }

  if (!src) {
    throw new Error(
      'There are no tracks to play. Use `streamUrl` option or the `load` method.'
    );
  }

  if (src !== this.audio.src) {
    this.audio.src = src;
  }

  this.playing = src;

  return this.audio.play();
};

SoundCloud.prototype.pause = function() {
  this.audio.pause();
  this.playing = false;
};

SoundCloud.prototype.stop = function() {
  this.audio.pause();
  this.audio.currentTime = 0;
  this.playing = false;
};

SoundCloud.prototype.seek = function(e) {
  if (!this.audio.readyState) {
    return false;
  }

  const percent =
    e.offsetX / e.target.offsetWidth ||
    (e.layerX - e.target.offsetLeft) / e.target.offsetWidth;

  this.audio.currentTime = percent * (this.audio.duration || 0);
};

SoundCloud.prototype.cleanData = function() {
  this._track = void 0;
};

SoundCloud.prototype.setVolume = function(volumePercentage) {
  if (!this.audio.readyState) {
    return;
  }

  this.audio.volume = volumePercentage;
};

SoundCloud.prototype.setTime = function(seconds) {
  if (!this.audio.readyState) {
    return;
  }

  this.audio.currentTime = seconds;
};

export default SoundCloud;
