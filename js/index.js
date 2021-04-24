var playbtn = document.getElementById("play");
var audio = document.createElement("audio");
var cover = document.getElementById("cover");
var songname = document.getElementById("sname");
var singern = document.getElementById("singername");
var songs = ["Perfect", "Sham", "Afterglow", "Tumjabpass"];
var songtitle = ["Perfect", "Sham", "Afterglow", "Tum Jab Pass"];
var singer = ["Ed Sheeran", "Amit Trivedi", "Taylor Swift", "Prateek Kuhaad"];
var songindex = 0;
var currentsong = songs[songindex];
var currtime = document.getElementById("start");
var endtime = document.getElementById("end");
var isplaying = false;

function songinfo(currentsong) {
  audio.src = `Music/${currentsong}.mp3`;
  cover.src = `Images/${currentsong}.jpeg`;
  songname.innerHTML = songtitle[songindex];
  singern.innerHTML = singer[songindex];
}

function plays() {
  isplaying = true;
  audio.play();
  playbtn.classList.replace("fa-play", "fa-pause");
  document.getElementById("out").classList.add("outeranimation");
}
function pauses() {
  isplaying = false;
  audio.pause();
  playbtn.classList.replace("fa-pause", "fa-play");
  document.getElementById("out").classList.remove("outeranimation");
}
function prev() {
  songindex--;
  if (songindex < 0) songindex = songs.length - 1;
  currentsong = songs[songindex];
  songinfo(currentsong);
  plays();
}
function next() {
  songindex++;
  if (songindex >= songs.length) songindex = 0;
  currentsong = songs[songindex];
  songinfo(currentsong);
  plays();
}
songinfo(currentsong);
function playpause() {
  if (isplaying) pauses();
  else plays();
}
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  document.getElementById("progress").style.width = `${progressPercent}%`;
  //update current time
  var currtime = Math.floor(currentTime);
  var remtime = Math.floor(duration) - Math.floor(currentTime);
  currtime =
    Math.floor(currtime / 60) +
    ":" +
    (currtime % 60 < 10 ? "0" + (currtime % 60) : currtime % 60);
  document.getElementById("start").innerHTML = currtime;
  //update remaining time
  remtime =
    Math.floor(remtime / 60) +
    ":" +
    (remtime % 60 < 10 ? "0" + (remtime % 60) : remtime % 60);
  document.getElementById("end").innerHTML = remtime;
}
function clickProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
audio.addEventListener("timeupdate", updateProgress);
document.getElementById("pc").addEventListener("click", clickProgress);
