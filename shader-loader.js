//https://blog.mayflower.de/4584-Playing-around-with-pixel-shaders-in-WebGL.html
function createShader (gl, sourceCode, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var info = gl.getShaderInfoLog(shader);
        throw "could not compile web gl shader. \n\n" + info;
    }

    return shader;
}
var gl,program,canvas, buffer;
document.onload=loadshader();
function loadshader() {
    var client = new XMLHttpRequest();
    client.open('GET', 'pixel-shaders/pixel-shader1.glsl');
    client.onreadystatechange = function() {
        console.log(client.responseText);
        pixelShader = client.responseText;
        init(pixelShader);
    };
    client.send();
}

function init(fragmentShaderSource){
    canvas = document.getElementById("canvas");
    gl= canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    canvas.width = 240;
    canvas.height = 180;
    gl.viewport(0,0,gl.drawingBufferWidth, gl.drawingBufferHeight);

    if(gl && gl instanceof WebGLRenderingContext) {
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1.0, -1.0,
                1.0, -1.0,
                -1.0, 1.0,
                -1.0, 1.0,
                1.0, -1.0,
                1.0, 1.0]),
            gl.STATIC_DRAW
        );

        var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
        //Use the createShader function from the example above
        var vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
        //Use the createShader function from the example above
        var fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

        program = gl.createProgram();
        // Attach pre-existing shaders
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
            var info = gl.getProgramInfoLog(program);
            throw 'Could not compile WebGL program. \n\n' + info;
        }
        gl.useProgram(program);
    render();
    }
}

function render(seconds){
    seconds *= seconds;
    window.requestAnimationFrame(render, canvas);
    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
