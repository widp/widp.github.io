
function init(){

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // create Oscillator node
    var oscillator = audioCtx.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = 440; // value in hertz
    oscillator.connect(audioCtx.destination);
    whitenoisegen(audioCtx);


    window.requestAnimationFrame(draw);
    
}
function whitenoisegen(audioContext) {
//    var bufferSize = 4096;
    var bufferSize  = 256;
    var whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);

    whiteNoise.onaudioprocess = function(e) {
	var output = e.outputBuffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
	}
    }

    var gainNode  = audioContext.createGain();
    gainNode.gain.value = 0.008;
    whiteNoise.connect(gainNode);
    gainNode.connect(audioContext.destination);
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


	window.requestAnimationFrame(draw);
    }
    
}

init()
   



