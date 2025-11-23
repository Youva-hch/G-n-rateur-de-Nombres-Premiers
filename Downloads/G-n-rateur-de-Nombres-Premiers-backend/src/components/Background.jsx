import { useEffect } from 'react'

const Background = () => {
  useEffect(() => {
    
    if (!document.querySelector('script[src*="media-shader"]')) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/media-shader@latest/media-shader.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

        const fragmentShader = `#version 300 es
        precision highp float;
        out vec4 glFragColor;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform vec3 u_color;
        uniform float u_scale; 
        uniform float u_speed; 
        void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        float mr = min(u_resolution.x, u_resolution.y);
        vec2 uv = (st.xy * 2.0 - 1.0) * u_resolution.xy / mr;
        uv *= (1.0-u_scale) * 2.;
        float d = -u_time * 0.5 * u_speed;
        float a = 0.0;
        for (float i = 0.0; i < 8.0; ++i) {
            a += cos(i - d - a * uv.x);
            d += sin(uv.y * i + a);
        }
        d += u_time * 0.5 * u_speed;
        vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
        col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * u_color;
        glFragColor = vec4(col, 1.0);
        }`

  const uniforms = JSON.stringify({
    u_color: [0.2823529411764706, 0.9568627450980393, 0.8784313725490196],
    u_scale: 0.25,
    u_speed: 0.5
  })

  return (
    <div 
      className='absolute inset-0 w-full h-full z-[1] pointer-events-none'
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <media-shader
        width="100%"
        height="100%"
        fragment-shader={fragmentShader}
        uniforms={uniforms}
        style={{ display: 'block' }}
      />
    </div>
  )
}

export default Background