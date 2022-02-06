#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
   vec2 uv = gl_FragCoord.xy;
   vec4 final_out = vec4(pow(uv.y,2.0) / pow(uv.x,2.0), 0.0,0.0, 1.0);

   if(sin(uv.y*uv.x+u_time/100.0) < 0.5) 
	gl_FragColor = final_out;

}
