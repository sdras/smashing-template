export default {
  fragmentShader: `
    precision mediump float;
    precision mediump int;
    uniform float time;
    uniform float blend;
    uniform sampler2D blendPattern;
    varying float vFade;
    varying vec2 vUv;


    void main()	{
      vec4 startColor = vec4(1., 0.5, 0.1, 1.0);
      vec4 endColor = vec4(0.2, 0.2, 0.2, 1.0);
      
      float dissolve = texture2D(blendPattern, vUv).r * 0.5;
      float spread = 0.4;
      
      float fadeAmount = smoothstep(
        max(0.0, vFade - spread),
        min(1.0, vFade + spread),
        blend + dissolve
      );
      
      vec4 color = mix(
        startColor, endColor,
        smoothstep(0.1,1., fadeAmount)
      );
      
      gl_FragColor = vec4(color.rgb, 1.-fadeAmount);
    }`
}