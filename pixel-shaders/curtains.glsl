#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
void main() {
    vec2 uv = gl_FragCoord.xy;
    float val1 = 1.0/tan(uv.x*sin(u_time)*100.);
    
    float val2 = pow(sin(uv.y/20.0), 2.0) + pow(cos(uv.x/20.0),2.0) + (u_time/1000.0);
    vec2 t = vec2(val2, uv.y);
    if(val2 >= tan(rand(t)) && pow(sin(uv.y),2.0) > 0.5+sin(u_time/1000.0)) {
	vec4 a = vec4(0.0,val2,sin(rand(t)*val2/1000.0),1.0);
	vec4 b =  vec4(0.0,tan(val2),cos(val2/1000.0),1.0);

	mat4 m = mat4(tan(a),acos(b),asin(b),a);
	vec4 final_out= a * m ;
	gl_FragColor = final_out;
    }
    if (uv.y-(sin(u_time/200.0)*220.0)> sin(uv.x/5.0+(u_time/30.0))*10.0) {
	gl_FragColor = vec4(rand(vec2(uv.x,u_time)),0.0,0.0,1.0);
      }

}
