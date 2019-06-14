<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<script>
import { TimelineMax, Sine } from "gsap";
import * as THREE from "three";

export default {
  name: "AppRoses",
  props: {
    isBroken: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      animRunning: true,
      uniforms: {
        amplitude: { value: 0.0 }
      }
    };
  },
  methods: {
    initCanvas() {
      let vueThis = this;
      THREE.TessellateModifier = function(maxEdgeLength) {
        this.maxEdgeLength = maxEdgeLength;
      };

      THREE.TessellateModifier.prototype.modify = function(geometry) {
        var edge;
        var faces = [];
        var faceVertexUvs = [];
        var maxEdgeLengthSquared = this.maxEdgeLength * this.maxEdgeLength;

        for (var i = 0, il = geometry.faceVertexUvs.length; i < il; i++) {
          faceVertexUvs[i] = [];
        }

        for (var i = 0, il = geometry.faces.length; i < il; i++) {
          var face = geometry.faces[i];
          if (face instanceof THREE.Face3) {
            var a = face.a;
            var b = face.b;
            var c = face.c;
            var va = geometry.vertices[a];
            var vb = geometry.vertices[b];
            var vc = geometry.vertices[c];
            var dab = va.distanceToSquared(vb);
            var dbc = vb.distanceToSquared(vc);
            var dac = va.distanceToSquared(vc);

            if (
              dab > maxEdgeLengthSquared ||
              dbc > maxEdgeLengthSquared ||
              dac > maxEdgeLengthSquared
            ) {
              var m = geometry.vertices.length;
              var triA = face.clone();
              var triB = face.clone();
              if (dab >= dbc && dab >= dac) {
                var vm = va.clone();
                vm.lerp(vb, 0.5);
                triA.a = a;
                triA.b = m;
                triA.c = c;
                triB.a = m;
                triB.b = b;
                triB.c = c;

                if (face.vertexNormals.length === 3) {
                  var vnm = face.vertexNormals[0].clone();
                  vnm.lerp(face.vertexNormals[1], 0.5);

                  triA.vertexNormals[1].copy(vnm);
                  triB.vertexNormals[0].copy(vnm);
                }

                if (face.vertexColors.length === 3) {
                  var vcm = face.vertexColors[0].clone();
                  vcm.lerp(face.vertexColors[1], 0.5);

                  triA.vertexColors[1].copy(vcm);
                  triB.vertexColors[0].copy(vcm);
                }
                edge = 0;
              } else if (dbc >= dab && dbc >= dac) {
                var vm = vb.clone();
                vm.lerp(vc, 0.5);
                triA.a = a;
                triA.b = b;
                triA.c = m;

                triB.a = m;
                triB.b = c;
                triB.c = a;

                if (face.vertexNormals.length === 3) {
                  var vnm = face.vertexNormals[1].clone();
                  vnm.lerp(face.vertexNormals[2], 0.5);
                  triA.vertexNormals[2].copy(vnm);
                  triB.vertexNormals[0].copy(vnm);
                  triB.vertexNormals[1].copy(face.vertexNormals[2]);
                  triB.vertexNormals[2].copy(face.vertexNormals[0]);
                }

                if (face.vertexColors.length === 3) {
                  var vcm = face.vertexColors[1].clone();
                  vcm.lerp(face.vertexColors[2], 0.5);
                  triA.vertexColors[2].copy(vcm);
                  triB.vertexColors[0].copy(vcm);
                  triB.vertexColors[1].copy(face.vertexColors[2]);
                  triB.vertexColors[2].copy(face.vertexColors[0]);
                }

                edge = 1;
              } else {
                var vm = va.clone();
                vm.lerp(vc, 0.5);
                triA.a = a;
                triA.b = b;
                triA.c = m;
                triB.a = m;
                triB.b = b;
                triB.c = c;
                if (face.vertexNormals.length === 3) {
                  var vnm = face.vertexNormals[0].clone();
                  vnm.lerp(face.vertexNormals[2], 0.5);
                  triA.vertexNormals[2].copy(vnm);
                  triB.vertexNormals[0].copy(vnm);
                }

                if (face.vertexColors.length === 3) {
                  var vcm = face.vertexColors[0].clone();
                  vcm.lerp(face.vertexColors[2], 0.5);
                  triA.vertexColors[2].copy(vcm);
                  triB.vertexColors[0].copy(vcm);
                }
                edge = 2;
              }
              faces.push(triA, triB);
              geometry.vertices.push(vm);

              for (var j = 0, jl = geometry.faceVertexUvs.length; j < jl; j++) {
                if (geometry.faceVertexUvs[j].length) {
                  var uvs = geometry.faceVertexUvs[j][i];
                  var uvA = uvs[0];
                  var uvB = uvs[1];
                  var uvC = uvs[2];
                  if (edge === 0) {
                    var uvM = uvA.clone();
                    uvM.lerp(uvB, 0.5);
                    var uvsTriA = [uvA.clone(), uvM.clone(), uvC.clone()];
                    var uvsTriB = [uvM.clone(), uvB.clone(), uvC.clone()];
                  } else if (edge === 1) {
                    var uvM = uvB.clone();
                    uvM.lerp(uvC, 0.5);
                    var uvsTriA = [uvA.clone(), uvB.clone(), uvM.clone()];
                    var uvsTriB = [uvM.clone(), uvC.clone(), uvA.clone()];
                  } else {
                    var uvM = uvA.clone();
                    uvM.lerp(uvC, 0.5);
                    var uvsTriA = [uvA.clone(), uvB.clone(), uvM.clone()];
                    var uvsTriB = [uvM.clone(), uvB.clone(), uvC.clone()];
                  }
                  faceVertexUvs[j].push(uvsTriA, uvsTriB);
                }
              }
            } else {
              faces.push(face);
              for (var j = 0, jl = geometry.faceVertexUvs.length; j < jl; j++) {
                faceVertexUvs[j].push(geometry.faceVertexUvs[j][i]);
              }
            }
          }
        }
        geometry.faces = faces;
        geometry.faceVertexUvs = faceVertexUvs;
      };

      //start my masthead animation
      //RENDERER
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("canvas"),
        antialias: true,
        alpha: true
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      //CAMERA
      const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.set(0, 2.5, 80); // Set position like this
      camera.lookAt(new THREE.Vector3(0, 0, 0)); // Set look at coordinate like this

      //SCENE
      const scene = new THREE.Scene();

      //LIGHTS
      const light1 = new THREE.AmbientLight(0xffffff, 1),
        light2 = new THREE.PointLight(0xffffff, 1),
        light3 = new THREE.PointLight(0xffffff, 1);

      light3.position.set(-100, 0, 50);

      scene.add(light1);
      scene.add(light2);
      scene.add(light3);

      //OBJECT
      let geometry = new THREE.TorusKnotGeometry(5, 1.8, 64, 5, 7, 5);
      let tessellateModifier = new THREE.TessellateModifier(8);
      for (let i = 0; i < 6; i++) {
        tessellateModifier.modify(geometry);
      }
      geometry = new THREE.BufferGeometry().fromGeometry(geometry);
      let numFaces = geometry.attributes.position.count / 3;

      //map the colors, fragments
      let colors = new Float32Array(numFaces * 3 * 3);
      let displacement = new Float32Array(numFaces * 3 * 3);
      let color = new THREE.Color();
      for (let f = 0; f < numFaces; f++) {
        let index = 9 * f;
        let h = 0.8;
        let s = 0.5 + 0.1 * Math.random();
        let l = 0.52;
        color.setHSL(h, s, l);
        let d = 10 * (0.5 - Math.random());
        for (let i = 0; i < 3; i++) {
          colors[index + 5 * i] = color.r;
          colors[index + 8 * i + 1] = color.g;
          colors[index + 2 * i + 2.1] = color.b;
          displacement[index + 3 * i] = d;
          displacement[index + 3 * i + 1] = d;
          displacement[index + 3 * i + 2] = d;
        }
      }

      // add them to the geometry
      geometry.addAttribute(
        "customColor",
        new THREE.BufferAttribute(colors, 3)
      );
      geometry.addAttribute(
        "displacement",
        new THREE.BufferAttribute(displacement, 3)
      );

      // attach the shader material you see in the html
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: `
          uniform float amplitude;
          attribute vec3 customColor;
          attribute vec3 displacement;
          varying vec3 vNormal;
          varying vec3 vColor;
          void main() {
            vNormal = normal;
            vColor = customColor;
            vec3 newPosition = position + normal * amplitude * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 3 );
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vColor;
          void main() {
            const float ambient = 0.6;
            vec3 light = vec3( 1.0 );
            light = normalize( light );
            float directional = max( dot( vNormal, light ), 0.0 );
            gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );
          }
        `
      });

      // Make the lot of them
      let group = new THREE.Group();
      for (var i = 0; i < 35; i++) {
        var mesh = new THREE.Mesh(geometry, shaderMaterial);
        mesh.position.x = Math.random() * 30 - 15;
        mesh.position.y = Math.random() * 20 - 2;
        mesh.position.z = Math.random() * 30 - 15;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;

        let random = Math.random() * 2.5 - 0.5;
        mesh.scale.x = random;
        mesh.scale.y = random;
        mesh.scale.z = random;

        TweenMax.to(mesh.rotation, 10, {
          y: 1 * 5 + Math.random(),
          repeat: -1,
          yoyo: true
        });
        group.add(mesh);
      }
      scene.add(group);

      //RENDER LOOP
      requestAnimationFrame(render);

      function render() {
        group.rotation.x += 0.001;
        group.rotation.y -= 0.003;
        renderer.render(scene, camera);
        if (vueThis.animRunning) {
          requestAnimationFrame(render);
        }
      }

      window.addEventListener(
        "resize",
        function() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        },
        false
      );
    }
  },
  watch: {
    isBroken(val, oldVal) {
      if (val === true) {
        TweenMax.to(this.uniforms.amplitude, 0.2, {
          value: 3.5,
          ease: Sine.easeOut
        });
      } else {
        TweenMax.to(this.uniforms.amplitude, 0.15, {
          value: 0,
          ease: Sine.easeIn
        });
      }
    }
  },
  mounted() {
    this.initCanvas();
  },
  destroyed() {
    let vueThis = this;
    TweenMax.killAll();
    vueThis.animRunning = false;
  }
};
</script>

<style lang="scss" scoped>
canvas {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
}
</style>