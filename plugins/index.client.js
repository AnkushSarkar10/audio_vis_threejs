import * as THREE from "three";
import Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  audioSphear,
  dataArray,
  analyser,
  updateVertices,
} from "./audioObject.client.js";
import { sky } from "./sky.client.js";


(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//cdn.jsdelivr.net/gh/Kevnz/stats.js/build/stats.min.js';document.head.appendChild(script);})()


// pass in a ref to the canvas element
export const initScene = (canvasRef) => {
  // scene init
  const scene = new THREE.Scene();
  // camera init
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    10000000
  );

  camera.position.z = 41;

  // renderer config
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
  });

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);

  // orbitcontrols
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;

  //lights
  const light = new THREE.AmbientLight(0xffffff, 1);
  light.position.set(0, 0.5, 1);
  scene.add(light);

  // code
  scene.add(audioSphear);
  scene.add(sky);
  sky.rotation.y += 1.8;

  // main game loop
  const animate = () => {
    // update the audio freq data

    if (dataArray) {
      analyser.getByteFrequencyData(dataArray);
      updateVertices(dataArray);
    }
    audioSphear.rotation.y += 0.0007;
    sky.rotation.y += 0.00009;

    // renderiong the scene and camera
    renderer.render(scene, camera);
 
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  // resize canvas on browser resize
  if (process.client) window.addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      initScene: initScene,

    }
  }
})