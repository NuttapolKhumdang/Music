const player = new Audio();
const player__playpause_button = document.getElementById("mplayer-playpause_button");
const mplayer__audio_current = document.getElementById("mplayer-audio_current");
const mplayer__audio_duration = document.getElementById("mplayer-audio_duration");
const mplayer__audio_title = document.getElementById("mplayer-audio_title");

function setPlayerSrc(fid = null, autoplay = false) {
    const audio = collections.filter(e => e.id == fid)[0];
    player.src = audio.filesrc;
    mplayer__audio_title.innerHTML = audio.title;

    setTitle(audio.title);

    if (autoplay) setPlayerPlaying(true);
}

function setPlayerPlaying(playing = true) {
    playing ? player.play() : player.pause();
}

function togglePlayerPlaying() {
    player.paused ? player.play() : player.pause();
    player__playpause_button.querySelector("span").innerHTML = player.paused ? 'play_arrow' : 'pause';
}


player.addEventListener("play", e => {
    player__playpause_button.querySelector("span").innerHTML = 'pause';
});

function convertTime(time) {
    var mins = Math.floor(time / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    var secs = Math.floor(time % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    return mins + '.' + secs;
}

// ?? Update player timeline bar every 200ms
const tlmap = document.getElementById("tline-map");

setInterval(() => {
    const tlenght = player.duration;
    const tcurrent = player.currentTime;
    const percen = (tcurrent / tlenght) * 100;
    tlmap.style.width = percen + '%';

    mplayer__audio_current.innerHTML = convertTime(tcurrent);
    mplayer__audio_duration.innerHTML = convertTime(tlenght);
}, 200);