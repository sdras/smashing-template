export default {
  vertexShader: `
    precision mediump float;
    precision mediump int;
    attribute vec4 color;
    varying vec2 vUv;
    varying float vFade;
    void main()	{
      vUv = uv;
      vec4 localPosition = vec4( position, 1);
      vFade = clamp((localPosition.y + 3.0) / 6.0, 0.0, 1.0);
      gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    }`
};