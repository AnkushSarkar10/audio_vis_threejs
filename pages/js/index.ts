import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { audioSphear, dataArray, analyser, updateVertices } from "./audioObject";
import { sky } from "./sky";

// pass in a ref to the canvas element
export const initScene = (canvasRef: { value: HTMLCanvasElement }) => {
  // scene init
  const scene = new THREE.Scene();
  // camera init
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    10000000
  );

  camera.position.z = 45;

  // renderer config
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
  });

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);

  // orbitcontrols
  const controls = new OrbitControls(camera, renderer.domElement);

  //lights
  const light = new THREE.AmbientLight(0xffffff, 1);
  light.position.set(0, 0.5, 1);
  scene.add(light);

  // helpers
  const axesHelper = new THREE.AxesHelper(500);
  // scene.add(axesHelper);

  // code
  scene.add(audioSphear);
  scene.add(sky);
  sky.rotation.y += 1.8;

  // main game loop
  const animate = (time:number) => {
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

  window.addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });
};
