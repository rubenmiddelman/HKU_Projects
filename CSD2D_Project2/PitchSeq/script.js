const GRID_ROWS = 16;
const GRID_COLS = 12;
let BPM = 120;
let quarterNote = 60 / BPM;
var d = new Date();
var d2 = new Date();
var time;
var startTime = d.getTime();
var loopTime = 0
let monoSynth;
let velocity = 1;
let dur = 1/4;
let nTime = 0;
var noteNum = [];
var noteFreq = [];
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe';
let pitch;
let audioContext;
let mic;
var freq = 0;
var dif = 100;
var offset;
var r = 0;
let note;
var n = 0;
const row_ar = [];

let img;

//sets up all devices
function setup() {
  userStartAudio();
  monoSynth = new p5.MonoSynth();
  button = createButton('play');
  button.position(90, 360);
  button.mousePressed(PlayLick);
  button = createButton('Retry');
  button.position(140, 360);
  button.mousePressed(Retry);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(Listening)
}

//makes sure pitch detec is working
function Listening(){
  console.log("listening");
  pitch = ml5.pitchDetection(
   model_url,
   audioContext,
   mic.stream,
   modelLoaded
 )
    getPitch()
}
//gets the pitch
function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      freq = frequency;
    } else {
    }
    getPitch();
  })
}
//makes sure the pitch detec is working
function modelLoaded() {
  console.log("Model Loaded!");
}

//draws the grid
$(document).ready(function() {
  $("#grids").html();
  $("#grids").css({
    "grid-template-columns": "repeat(" + GRID_COLS + ",20px)"
  });

  for (var i = 1; i <= GRID_ROWS; i++) {
    row_ar.push(0);
    for (var j = 1; j <= GRID_COLS; j++) {
      $("#grids").append(
        '<div class="grid" data-row="' + i + '" data-column="' + j + '"></div>'
      );
    }
  }

  $("#grids .grid").bind("click", function() {
    var column = parseInt($(this).attr("data-column"));
    var row = parseInt($(this).attr("data-row"));
    if (row_ar[row - 1] != 0) {
      $('#grids .grid[data-row="' + row + '"]').html("");
      $('#grids .grid[data-row="' + row + '"]').removeClass("active");
    }
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      row_ar[row - 1] = column;
      $(this).html(column);
    } else {
      row_ar[row - 1] = 0;
      $(this).html("");
    }
  });
});
// draw function that draws the note that should be sang.
function draw() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textSize(32);
  fill(255);
  rect(90, 90, 40, 40)
  fill(0)
  text(note, 90, 90)
  text("make a cool lick and try to sing it", 0, 40)
  for(i in noteNum){
    if(i == 'C1'){
      console.log(";")
      n++;
      continue
    }else{

      clear()
      dif = freq - noteFreq[r];
      y = dif + 115;
      if(dif < -55){
        y = 70
      }
      if(dif > 55){
        y = 150
      }
      createCanvas(windowWidth, windowHeight);
      background(255);
      textSize(32);
      fill(0);
      text("make a cool lick and try to sing it", 0, 40)
      fill(255);
      rect(90, 90, 40, 40)
      fill(0)
      if(noteNum[n] == 'C1'){
        n++
      }
      text(noteNum[n], 100, 100)
      fill(255)
      rect(70, 150, 90, 40)
      line(y, 120 , y, 250)
      if(dif< -5  || dif >5){
        fill(255, 0, 0);
        rect(90, 90, 40, 40)
        fill(0)
        text(noteNum[n], 100, 100)
        dif = freq - noteFreq;
      }else{
        fill(0, 255, 0);
        rect(90, 90, 40, 40)
        fill(0)
        text(noteNum[n], 100, 100)
        sleep(2000).then(() => {
          fill(0, 255, 0);
          rect(90, 90, 40, 40)
          fill(0)
          text(noteNum[n], 100, 100)
      })
      n++;
      r++;
        if(n > 16){
          clear()
          text("great Job", 0, 40)
        }
        continue
      }
    }
  }
}
//clears list
function Clear(){
  noteFreq = [];
  noteNum = [];
}
//turnes row numbers in to freq and note names and then plays them
function PlayLick(){
  Clear();
  for(i in row_ar){
    if(row_ar[i] == 1){
      noteNum.push('C4')
      noteFreq.push('261.63')
    }
    if(row_ar[i] == 2){
      noteNum.push('Db4')
      noteFreq.push('277.18')
    }
    if(row_ar[i] == 3){
      noteNum.push('D4')
      noteFreq.push('293.66')
    }
    if(row_ar[i] == 4){
      noteNum.push('Eb4')
      noteFreq.push('311.13')
    }
    if(row_ar[i] == 5){
      noteNum.push('E4')
      noteFreq.push('329.63')
    }
    if(row_ar[i] == 6){
      noteNum.push('F4')
      noteFreq.push('349.23')
    }
    if(row_ar[i] == 7){
      noteNum.push('Gb4')
      noteFreq.push('369.99')
    }
    if(row_ar[i] == 8){
      noteNum.push('G4')
      noteFreq.push('392.00')
    }
    if(row_ar[i] == 9){
      noteNum.push('Ab5')
      noteFreq.push('415.30')
    }
    if(row_ar[i] == 10){
      noteNum.push('A5')
      noteFreq.push('440.00')
    }
    if(row_ar[i] == 11){
      noteNum.push('Bb5')
      noteFreq.push('466.16')
    }
    if(row_ar[i] == 12){
      noteNum.push('B5')
      noteFreq.push('493.88')
    }
    if(row_ar[i] == 0){
      noteNum.push('C1')
    }
  }
  console.log(noteNum)
  var i = 0;
  var y = 0;
  var len = noteNum.length
  for (; i < len; ) {
   d2 = new Date();
   loopTime = d2.getTime();
   time = loopTime - startTime;
   if(time >= quarterNote * 1000){
     createCanvas(windowWidth, windowHeight);
     background(255);
     rect(90, 90, 40, 40)
     console.log(noteNum[i])
     note = noteNum[i];
     monoSynth.play(noteNum[i], velocity, nTime, dur);
     startTime = loopTime;
     i ++
     y= y+50;
   }else {
      loopTime = d2.getTime();
   }
 }
}
function Retry(){
  r = 0;
  n = 0;
}
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
