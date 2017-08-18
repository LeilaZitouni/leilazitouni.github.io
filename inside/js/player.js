function initYTPlayer() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    if (player) {
        player.destroy();
    }
    player = new Player('6L4yGat8Blc');
}

function Player(videoId) {
    this.element = $('#player');
    this.ytp = new YT.Player('ytp', {
        height: '390',
        width: '640',
        videoId: videoId,
        events: {
            'onReady': this.onPlayerReady.bind(this),
            'onStateChange': this.render.bind(this)
        },
        playerVars: {
            controls: 0,
            disablekb: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            showinfo: 0,
            autoplay: 1,
            rel: 0,
            suggestedQuality: 'highres'
        }
    });

    this.element.on('click', '.play', this.play.bind(this));
    this.element.on('click', '.pause', this.pause.bind(this));
    this.element.on('click', '.track', this.onProgressClick.bind(this));

    // visual UI
    this.elapsedBar = this.element.find('.elapsed');
}

Player.prototype.onPlayerReady = function() {
    this.renderInterval = setInterval(this.render.bind(this), 1000);
}

Player.prototype.play = function(ev) {
    if (this.canPlay()) {
        this.ytp.playVideo();
    }
}

Player.prototype.stop = function(ev) {
    if (this.canStop()) {
        this.ytp.stopVideo();
    }
}

Player.prototype.destroy = function(ev) {
    this.ytp.destroy();
    clearInterval(this.renderInterval);
}

Player.prototype.pause = function(ev) {
    if (this.canPause()) {
        this.ytp.pauseVideo();
    }
}

Player.prototype.goto = function(secs) {
    if (this.canSeek()) {
        this.ytp.seekTo(secs);
    }
}

Player.prototype.onProgressClick = function(ev) {
    if (this.canSeek()) {
        var w = ev.target.clientWidth;
        var x = ev.offsetX;
        var t = this.percToTrackSecs(x / w);
        this.goto(t);
    }
}

Player.prototype.percToTrackSecs = function(perc) {
    return this.getDuration() * perc;
}

Player.prototype.getElapsed = function() {
    return this.ytp.getMediaReferenceTime();
}

Player.prototype.getElapsedPerc = function() {
    return this.getElapsed() / this.getDuration() * 100;
}

Player.prototype.getDuration = function() {
    return this.ytp.getDuration();
}

Player.prototype.canPlay = function() {
    return this.isEnded() || this.isPaused();
}

Player.prototype.canPause = function() {
    return this.isPlaying();
}

Player.prototype.canSeek = function() {
    return this.getDuration() > 0;
}

Player.prototype.isPlaying = function() {
    return this.ytp.getPlayerState() == 1;
}

Player.prototype.isPaused = function() {
    return this.ytp.getPlayerState() == 2;
}

Player.prototype.isBuffering = function() {
    return this.ytp.getPlayerState() == 3;
}

Player.prototype.isEnded = function() {
    return this.ytp.getPlayerState() == 0;
}

Player.prototype.render = function() {
    this.element.attr('playing', this.isPlaying());
    this.element.attr('paused', this.isPaused());
    this.element.attr('ended', this.isEnded());
    this.element.attr('buffering', this.isBuffering());

    this.updateProgressBar();
}

Player.prototype.updateProgressBar = function() {
    this.elapsedBar.css({
        'width': this.getElapsedPerc() + "%"
    });
}