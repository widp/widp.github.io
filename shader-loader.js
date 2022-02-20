//remove to debug
console.log = function() {}
var gl,canvas, program,buffer;
document.onload = loadshader();
function loadshader() {
    var client = new XMLHttpRequest();

    //TODO: find a better alternative to find the list of shaders
    //pick a random shader
    let shader_list = ['pixel-shader0.glsl','pixel-shader1.glsl', 'pipes.glsl', 'mini-explosions.glsl', 'sun-math.glsl', 'curtains.glsl'];
    //let shader_list = ['better_tan.glsl'];
    let val = Math.floor(Math.random() * shader_list.length);
    console.log(shader_list[val]);
    client.open('GET', 'pixel-shaders/'+ shader_list[val]);

    client.onreadystatechange = function() {
        console.log(client.responseText);
        pixelShader = client.responseText;
        init(pixelShader);
    };
    client.send();
}
function createShader (gl, sourceCode, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
    console.log("compiling" + sourceCode);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var info = gl.getShaderInfoLog(shader);
        throw "could not compile web gl shader. \n\n" + info;
    }
    return shader;
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
        render(0);
    }
}

function render(seconds){
    window.requestAnimationFrame(render, canvas);
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var timeLocation = gl.getUniformLocation(program, "u_time");
    gl.uniform1f(timeLocation, seconds);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
