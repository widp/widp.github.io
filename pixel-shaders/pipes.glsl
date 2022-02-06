#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
     float delta = 0.03;
    vec2 uv = gl_FragCoord.xy;
    float val1= cos(uv.x/10.0)*sin(u_time/100.0);
    float val2= cos(uv.y/10.0)*sin(u_time/100.0);
    gl_FragColor = vec4(val1,val2 ,0.0,1.0);
}
