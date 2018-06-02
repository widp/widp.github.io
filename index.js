canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


window.setInterval(function(){
    ctx.clearRect(0,0, canvas.width, canvas.height -Math.random() * 100);
    ctx.fillStyle = "rgba(100,5,5,0.5)";
    ctx.fillRect(100 * Math.random(),0, canvas.width - Math.random()*100, canvas.height);
} , 100);

