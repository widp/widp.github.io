#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy;
    vec2 center = vec2(1.,1.);
    uv.x = uv.x - 240.0/2.0;
    uv.y = uv.y - 180.0/2.0;
    uv.x = uv.x;
    uv.y = uv.y;
    float d =length(uv);
    if(d < sin( u_time*10000.0)*100.0){
        gl_FragColor = vec4(.1, 0.,1.,1.);
    }
}
