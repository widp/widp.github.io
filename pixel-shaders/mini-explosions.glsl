#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
     float delta = 0.03;
    vec2 uv = gl_FragCoord.xy;
    float val1 = 1.0/tan(uv.x*sin(u_time)*100.);
    
    float val2 = pow(sin(uv.y/20.0), 2.0) + pow(cos(uv.x/20.0),2.0) + (u_time/1000.0);
    gl_FragColor = vec4(sin(u_time/1000.0),sin(val2),sin(val2/1000.0),1.0);
}
