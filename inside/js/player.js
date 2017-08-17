function Player(element) {
    this.element = element;
    this.video = this.element.find('video')[0];

    this.element.on('click', '.play', this.play.bind(this));
    this.element.on('click', '.stop', this.stop.bind(this));
    this.element.on('click', '.pause', this.pause.bind(this));
    this.element.on('click', '.track', this.onProgressClick.bind(this));

    // visual UI
    this.elapsedBar = this.element.find('.elapsed');

    $(this.video).on('play pause ended timeupdate', this.render.bind(this));
    this.render();
}

Player.prototype.play = function(ev) {
    if(this.canPlay()){
        this.video.play();
    }
}

Player.prototype.stop = function(ev) {
    if(this.canStop()){
        this.video.currentTime = 0;
        this.pause(ev);
    }
}

Player.prototype.pause = function(ev) {
    if(this.canPause()){
        this.video.pause();
    }
}

Player.prototype.goto = function(secs) {
    if(this.canSeek()){
        this.video.currentTime = secs;
    }
}

Player.prototype.onProgressClick = function(ev) {
    if(this.canSeek()){
        var w = ev.target.clientWidth;
        var x = ev.offsetX;
        var t = this.percToTrackSecs(x/w);
        this.goto(t);
    }
}

Player.prototype.percToTrackSecs = function(perc) {
    return this.getDuration() * perc;
}

Player.prototype.getElapsedPerc = function() {
    return this.video.currentTime / this.video.duration * 100;
}

Player.prototype.getDuration = function() {
    return this.video.duration;
}

Player.prototype.canPlay = function() {
    return this.isPaused();
}

Player.prototype.canStop = function() {
    return !this.isStopped();
}

Player.prototype.canPause = function() {
    return this.isPlaying();
}

Player.prototype.canSeek = function() {
    return this.video.seekable.length > 0 && this.video.seekable.start(0) !== this.video.seekable.end(0);
}

Player.prototype.isSeeking = function() {
    return this.video.seaking;
}

Player.prototype.isPlaying = function() {
    return !this.video.paused;
}

Player.prototype.isStopped = function() {
    return this.video.paused && this.video.currentTime == 0;
}

Player.prototype.isPaused = function() {
    return this.video.paused;
}

Player.prototype.isEnded = function() {
    return this.video.ended;
}

Player.prototype.render = function() {
    this.element.attr('playing', this.isPlaying());
    this.element.attr('paused', this.isPaused());
    this.element.attr('stopped', this.isStopped());
    this.element.attr('ended', this.isEnded());

    this.updateProgressBar();
}

Player.prototype.updateProgressBar = function() {
    this.elapsedBar.css({'width': this.getElapsedPerc() + "%"});
}
