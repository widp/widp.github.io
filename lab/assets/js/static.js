var requestId;
var playing = false;
var audioCtx ;

function toggleSnowCrash() {
    if(!playing)
	init();
    else {
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
    var canvas = document.getElementById('canvas');
    
    if (canvas.getContext) {
	
	var ctx = canvas.getContext('2d');
	
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;


	ctx.clearRect(0,0,3000,3000);
	ctx.save();
	ctx.font = '12px serif';
	var text = document.getElementById('maintext').textContent;
	ctx.textBaseline  = "top";


	var r = 0 , b = 0, g = 0, a = 0.5;
	ctx.fillStyle = 'rgb('+ r +','+ g + ',' + b + ')';
	ctx.fillRect(Math.random(),Math.random()*10000,Math.random()*10000,Math.random()*100);


	 requestId = window.requestAnimationFrame(draw);
	
    }
    
}


function stop() {
    window.cancelAnimationFrame(requestId);
    audioCtx.close();
}

