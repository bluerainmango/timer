var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");

var totalSeconds = 0;
var secondsElapsed = 0; // passed sec
var interval; // remaining sec
var mode; // working, resting

// render
function init(){
  // clear existing intervals
  // tototalSeconds =  min from user
  
}
function startTimer() {
  // Write code to start the timer here
  
  // if timer finished, alert(break or work)
}
function renderMin(){
}
function renderSec(){
}

function stop(){
  
}
function pause(){

}

function changeStatus(){
  // mode change
  // reset timer(init) 
}
playButton.addEventListener("click", startTimer);
