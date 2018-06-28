#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
     float delta = 0.03;
    vec2 uv = gl_FragCoord.xy;
    uv = uv / ( u_resolution/2.0 );
    uv.y = uv.y - 1.;
    float val = sin(uv.x*sin(u_time)*100.);
     if(uv.y <= val +delta && uv.y >= val -delta){
        gl_FragColor = vec4(1., 0.,0.,1.);
     }
}
