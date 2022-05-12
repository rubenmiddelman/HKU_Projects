var d = new Date();
var d2 = new Date();
var startTime = d.getTime();
let lick = [293.66, 329.63, 349.23, 392.00, 329.63, 261.63, 293.66, 293.66];
let lickNote = ['D4', 'E4', 'F4', 'G4', 'E4', 'C4', 'D4', 'D4'];
let BPM = 120;
let quarterNote = 60 / BPM;
var loopTime = 0
var time;
var n = 0;
let monoSynth;
let velocity = 1;
let dur = 1/4;
let nTime = 0;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe';
let pitch;
let audioContext;
let mic;
var freq = 0;
var dif = 100;
var offset;
var r = 0;

function setup() {
  //sets up the mic device and the synth that plays the lick
  createCanvas(windowWidth, windowHeight);
  background(255);
  console.log('ml5 version:', ml5.version);
  console.log(quarterNote)
  monoSynth = new p5.MonoSynth();
  button = createButton('play lick');
  button.position(19, 19);
  button.mousePressed(PlayLick);
  button = createButton('retry');
  button.position(80, 19);
  button.mousePressed(Retry);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(Listening)

}
//resets function that resets list
function Retry(){
  r = 0;
  i = 0;
}
// makes sure the pitch detection works
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
      console.log("no pitch")
    }
    getPitch();
  })
}
//also makes sure the pitch detection works
function modelLoaded() {
  console.log("Model Loaded!");
}


// draws wich note should be played
function draw() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rect(100, 100, 55, 55);
  textSize(32);
  text(lickNote[r], 120, 140);
    console.log(dif);
    dif = freq - lick[r];
    offset = 122 + dif;
    if(offset > 60 && offset < 195){
    line(offset, 70 ,offset , 180)
  } else if (offset < 60) {
    line(100, 70 ,100 , 180)
  } else if(offset > 195){
    line(155, 70 ,155, 180)
  }
    if(dif > 5 || dif < -5){
      createCanvas(windowWidth, windowHeight);
      background(255);
      fill(255, 0, 0);
      rect(100, 100, 55, 55);
      textSize(32);
      fill(0)
      text(lickNote[r], 120, 140);
    } else{
      createCanvas(windowWidth, windowHeight);
      background(255);
      fill(0, 255, 0);
      rect(100, 100, 55, 55);
      textSize(32);
      fill(0)
      text(lickNote[r], 120, 140);
      r ++;
    }
}
//plays the lick
function PlayLick(){
  userStartAudio();
  var i = 0;
  var len = lick.length;
  for (; i < len; ) {
   d2 = new Date();
   loopTime = d2.getTime();
   time = loopTime - startTime;
   if(time >= quarterNote * 1000){
     console.log(lick[n]);
     monoSynth.play(lickNote[n], velocity, nTime, dur);
     startTime = loopTime;
     n++
     i++
     if(n == 8){
       n = 0;
     }
   }
 }
}
