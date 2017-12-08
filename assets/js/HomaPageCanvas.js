
function init(){

    window.requestAnimationFrame(draw);
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
//	ctx.textAlign = "center";
//	ctx.fillText(text , 100,100);


//	for(i = 0; i < Math.random()*10 ; i++) {

	var r = 0 , b = 0, g = 0, a = 0.5;
	    ctx.fillStyle = 'rgb('+ r +','+ g + ',' + b + ')';
	    ctx.fillRect(Math.random(),Math.random()*10000,Math.random()*10000,Math.random()*100);

//	}

	window.requestAnimationFrame(draw);
    }
    
}

init()
   



