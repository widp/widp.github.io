#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy;
    if(uv.x*u_time < uv.y * uv.y){
            gl_FragColor = vec4(1., sin(uv.x*u_time),1.,1.);
    }
    else if(log(uv.x)*u_time < uv.y * uv.y) {
         
            gl_FragColor = vec4(.5,1.,1.,1.);
    }
    else {
        gl_FragColor = vec4(uv.x/240., uv.y/180., u_time, 1.0);
    }
}
