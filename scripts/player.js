let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art');
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playpauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let seekSlider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector(".volume_slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

let playList = document.querySelector('.play-list');

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

let currTrack = document.createElement('audio');

let trackList = [
    {
        name: 'eyeful',
        artist: 'evelyn',
        image: '../assets/images/covers/eyeful.png',
        path: '../assets/audio/eyeful.mp3'
    },
    {
        name: 'breathy',
        artist: 'evelyn',
        image: '../assets/images/covers/cat_square.png',
        path: '../assets/audio/breathy.mp3'
    },
    {
        name: 'idk',
        artist: 'evelyn',
        image: '',
        path: '../assets/audio/idk.mp3'
    }
]

function resetValues() {
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
    playList.innerHTML = '';
}

function loadTrack(trackIndex) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // load playlist in
    for (song in trackList) {
        // colour currently playing song
        if (song == trackIndex) {
            playList.innerHTML += 
            "<div class='playlist-track nowplaying' id='track" + song + "' onclick='loadTrack(" + song + ")'>" +
            "<div class='playlist-track-item songName' id='track" + song + "'>" + trackList[song].name + "</div>" +
            "<div class='playlist-track-item songArtist' id='track" + song + "'>" + trackList[song].artist + "</div>";
        } else {
            playList.innerHTML += 
            "<div class='playlist-track' id='track" + song + "' onclick='loadTrack(" + song + ")'>" +
            "<div class='playlist-track-item songName' id='track" + song + "'>" + trackList[song].name + "</div>" +
            "<div class='playlist-track-item songArtist' id='track" + song + "'>" + trackList[song].artist + "</div>";
        }
    }

  

    // Load a new track
    currTrack.src = trackList[trackIndex].path;
    currTrack.load();

    // Update details of the track
    trackArt.style.backgroundImage = 
        "url(" + trackList[trackIndex].image + ")";
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    nowPlaying.textContent = 
        "PLAYING " + (trackIndex + 1) + " OF " + trackList.length;

    // Set an interval of 500 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 100);
    
    pauseTrack();

    // Move to the next track if the current finishes playing
    // using the 'ended' event
    currTrack.addEventListener("ended", nextTrack);
    seekSlider.addEventListener('input', function(seekEvent) {
        seekTo(this.value);
    });
    volumeSlider.addEventListener('input', function(volumeEvent) {
        setVolume(this.value);
    });
}

function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
  
  function playTrack() {
    // Play the loaded track
    currTrack.play();
    isPlaying = true;
  
    // Replace icon with the pause icon
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
  
  function pauseTrack() {
    // Pause the loaded track
    currTrack.pause();
    isPlaying = false;
  
    // Replace icon with the play icon
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
  
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (trackIndex < trackList.length - 1)
      trackIndex += 1;
    else trackIndex = 0;
  
    // Load and play the new track
    loadTrack(trackIndex);
    playTrack();
  }
  
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (trackIndex > 0)
      trackIndex -= 1;
    else trackIndex = trackList.length - 1;
    
    // Load and play the new track
    loadTrack(trackIndex);
    playTrack();
  }

  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider 
    // and get the relative duration to the track
    seekto = currTrack.duration * (seekSlider.value / 100);
  
    // Set the current track position to the calculated seek position
    currTrack.currentTime = seekto;
  }
  
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    currTrack.volume = volumeSlider.value / 100;
  }
  
  function seekUpdate() {
    let seekPosition = 0;
  
    // Check if the current track duration is a legible number
    if (!isNaN(currTrack.duration)) {
      seekPosition = currTrack.currentTime * (100 / currTrack.duration);
      seekSlider.value = seekPosition;
  
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(currTrack.currentTime / 60);
      let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(currTrack.duration / 60);
      let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
  
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
      // Display the updated duration
      currTime.textContent = currentMinutes + ":" + currentSeconds;
      totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

loadTrack(trackIndex);