import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv * 2.0 - 1.0) * uResolution.xy / mr;
  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float timeShift = uTime * uSpeed * 0.25;
  float d = -timeShift;
  float a = 0.0;

  for (float i = 0.0; i < 7.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }

  d += timeShift;

  // Delicate shimmer variation
  vec3 wave = vec3(
    0.75 + 0.05 * cos(uv.x * d),
    0.70 + 0.04 * sin(a + d),
    0.68 + 0.03 * cos(d - a)
  );

  // Warm sand-beige foundation with elegant sage overlay
  vec3 baseTone = vec3(0.93, 0.88, 0.80); // Soft warm beige
  vec3 blended = mix(baseTone, wave, 0.3);
  vec3 col = mix(blended, uColor, 0.35); // uColor could be muted sage

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Iridescence({
  color = [0.68, 0.75, 0.70], // muted sage green
  speed = 0.4,
  amplitude = 0.04,
  mouseReact = true,
  ...rest
}) {
  const ctnDom = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;

    // Transparent background to avoid white clipping on pages with their own backgrounds
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    let program;

    function resize() {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }

    window.addEventListener("resize", resize);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId;

    function update(t) {
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }

    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      program.uniforms.uMouse.value[0] = x;
      program.uniforms.uMouse.value[1] = y;
    }

    if (mouseReact) {
      ctn.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      // Cancel animation frame
      if (animateId) {
        cancelAnimationFrame(animateId);
        animateId = null;
      }
      
      // Remove event listeners
      window.removeEventListener("resize", resize);
      if (mouseReact && ctn) {
        ctn.removeEventListener("mousemove", handleMouseMove);
      }
      
      // Clean up canvas
      if (ctn && gl.canvas && ctn.contains(gl.canvas)) {
        ctn.removeChild(gl.canvas);
      }
      
      // Release WebGL context
      try {
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) {
          loseContext.loseContext();
        }
      } catch (e) {
        // Ignore cleanup errors
      }
      
      // Clear references
      program = null;
    };
  }, [color, speed, amplitude, mouseReact]);

  return <div ref={ctnDom} className="iridescence-container" {...rest} />;
}
