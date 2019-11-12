var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");

var data = {
  totalSeconds : 0,
  secondsElapsed : 0,
  interval :0,
  status : 'work',
  isPaused : false,
  timer : null,
  minuitesInput: workMinutesInput,
  message : "Time to get back to work!"
}

function init(){

  data.interval = 0;
  data.secondsElapsed = 0; 
  data.totalSeconds = parseInt(data.minuitesInput.value, 10) * 60;
  console.log(data.minuitesInput.value)
  console.log(data.totalSeconds);
  
  renderMin(data.minuitesInput.value);
  renderSec(0);

  if(data.timer){ clearInterval(data.timer); }
}

function startTimer() {
  console.log('timer started!')
  data.totalSeconds = parseInt(data.minuitesInput.value, 10) * 60;

  // If timer was called already, clear it to prevent from calling multiple intervals. 
  if(data.timer){ clearInterval(data.timer); }

  data.timer = setInterval(function(){
    
    data.secondsElapsed ++;
    data.interval = data.totalSeconds - data.secondsElapsed;
    console.log(data.interval);
  
    var min =  Math.floor(data.interval / 60);
    var sec = (data.interval - min * 60);
  
    renderMin(min);
    renderSec(sec);
  
    // when timer finished, alert(break or work)
    if(data.interval === 0 ){
      alert(data.message);
      clearInterval(data.timer);
      init()
      changeStatus();
    }
    // when called, while timer is puased by the pause button.
    if(data.isPaused === true){
      data.isPaused = false;
      console.log('paused!')
    }
  }, 1000);

}

function renderMin(minuites){
  minutesDisplay.innerText = minuites;
}
function renderSec(seconds){
  secondsDisplay.innerText = seconds;
}

function stopTimer(){
  clearInterval(data.timer);
  init();
  renderMin(0);
  renderSec(0);
}
function pauseTimer(){

  if(!data.isPaused){
    clearInterval(data.timer);
    data.isPaused = true;
    console.log('paused!')
  }
  else{
    startTimer();
    data.isPaused = false;
    console.log('resumed!');
  }
  
}

function changeStatus(){

  if(data.status === 'work') {
    data.status = 'rest';
    statusSpan.innerText = 'resting';
    data.message = "Time to get back to work!";
    data.minuitesInput = restMinutesInput;
  }
  else{
    data.status = 'work';
    statusSpan.innerText = 'working';
    data.message = "Time for a break!";
    data.minuitesInput = workMinutesInput;
  }

  init()
  localStorage.setItem('status',data.status);
  localStorage.setItem('message',data.message);
  console.log(data.message, data.status)
}

function byChangedInput (){
  console.log(data.timer)
  if(data.secondsElapsed===0){
    renderMin(data.minuitesInput.value);
    console.log('while time is off')
  }
  console.log('changin input')

  // if(data.status === 'work'){
  //   data.minuitesInput = workMinutesInput;}
  // else{
  //   data.minuitesInput = restMinutesInput;
  // }

  // local storage set
  localStorage.setItem('workInput', workMinutesInput.value);
  localStorage.setItem('restInput', restMinutesInput.value);
}

playButton.addEventListener("click", startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
statusToggle.addEventListener('click', changeStatus);
[ workMinutesInput,restMinutesInput ].forEach( (el)=>{ el.addEventListener('change', byChangedInput) });

// LOCALSTORAGE
document.addEventListener('DOMContentLoaded', function(){

  if(localStorage.getItem('status')){
      data.status = localStorage.getItem('status');
      data.message = localStorage.getItem('message');

    if(data.status === 'rest'){
        statusToggle.removeAttribute('checked');
        statusSpan.innerText = 'resting';
        data.minuitesInput = restMinutesInput;
    }
  }

  if(localStorage.getItem('workInput') || localStorage.getItem('restInput')){
      // render input value
      workMinutesInput.value = localStorage.getItem('workInput');
      restMinutesInput.value = localStorage.getItem('restInput');
  }

  init();
})