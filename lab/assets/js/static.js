var requestId;
var playing = false;
var audioCtx ;
var c = document.getElementById('canvas');
var button = document.getElementById('snowcrashbutton');
function toggleSnowCrash() {
  if(!playing) {
	  init();
	  button.value = "turn off";
  }
  else {
	  button.value = "Snow Crash";
	  stop(audioCtx);
  }

  playing = !playing;
}

function init(){
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  whitenoisegen();
  window.requestAnimationFrame(draw);
}
function whitenoisegen() {

  var bufferSize  = 256;
  var whiteNoise = audioCtx.createScriptProcessor(bufferSize, 1, 1);
  whiteNoise.onaudioprocess = function(e) {
	  var output = e.outputBuffer.getChannelData(0);
	  for (var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
	  }
  }
  var gainNode  = audioCtx.createGain();
  gainNode.gain.value = 0.008;
  whiteNoise.connect(gainNode);
  gainNode.connect(audioCtx.destination);

}

function draw() {

  var ctx = c.getContext("2d", {alpha: false});       // context without alpha channel.
  var idata = ctx.createImageData(c.width, c.height); // create image data
  var buffer32 = new Uint32Array(idata.data.buffer);  // get 32-bit view


  noise(ctx);
  requestId = requestAnimationFrame(draw)

  function noise(ctx) {
	  var len = buffer32.length - 1;
	  while(len--) buffer32[len] = Math.random() < 0.5 ? 0 : -1>>0;
	  ctx.putImageData(idata, 0, 0);
  }


}


function stop() {
  var ctx = c.getContext("2d", {alpha: 0.2});       // context without alpha channel.
  window.cancelAnimationFrame(requestId);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0, c.width, c.height);

  audioCtx.close();
}
