const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Shiv Tandav",
    name: "Instrumental",
    source:
      "mp3/Shiv Tandav Instrumental.mp3",
  },
  {
    title: "Ganpati Bappa",
    name: "Maurya",
    source:
      "mp3/Tum Shivansh Tum Parvati Nandan.mp3",
  },
  {
    title: "Kartikey",
    name: "O Mere Raj Dulare",
    source:
      "mp3/Kartikey O Mere Raj Dulare.mp3",
  },
  {
    title: "Umapati Mahadev",
    name: "Shiv ki Shakti",
    source:
      "mp3/Shankar Shiv Bhole Umapati Mahadev.mp3",
  },
  {
    title: "Om Tat Purushaya Vidmahe",
    name: "Rudram",
    source:
      "mp3/Om Tat Purushaya Vidmahe.mp3",
  },

  {
    title: "Om Namah Shivaya",
    name: "Mantram",
    source:
      "mp3/Om Namah Shivaya.mp3",
  },
  {
    title: "Shiv Chalisa",
    name: "Chalisa",
    source:
      "mp3/Shiv Chalisa - Gopal Mohan Bhardwaj.mp3",
  },
   {
    title: "Karpura Gauram",
    name: "Mantram",
    source:
      "mp3/Karpura Gauram.mp3",
  },
   {
    title: "Shiva Tandava",
    name: "Stotram",
    source:
      "mp3/Shiva Tandava Stotram.mp3",
  },
   {
    title: "Jai Shiv Omakara",
    name: "Arthi",
    source:
      "mp3/Lord Shiva Aarti.mp3",
  },
];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); 
  playSong(); 
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo(); 
  playPause(); 
});