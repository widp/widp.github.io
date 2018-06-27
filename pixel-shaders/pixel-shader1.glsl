#ifdef GL_ES
precision mediump float;
#endif

void main() {
    vec2 uv = gl_FragCoord.xy;
    gl_FragColor = vec4(uv.x /240., uv.y/180., 1.0 , 1.0);
}
