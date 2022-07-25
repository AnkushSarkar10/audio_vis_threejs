import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders"

// audio stuff
export const audioContext = new window.AudioContext();
export const audio = new Audio("assets/allMine.mp3");
const source = audioContext.createMediaElementSource(audio);
source.connect(audioContext.destination);

export const analyser = audioContext.createAnalyser();
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 1024;

export const dataArray = new Uint8Array(analyser.frequencyBinCount); // this contains the audio freq data

const audioSphearcolor = new THREE.Color("rgb(255, 0, 0)");

const geometry = new THREE.SphereGeometry(15, 32, 16); // radius, widthSegments, heightSegments

export const uniforms = {
  u_time: {
    type: "f",
    value: 1.0,
  },
  u_amplitude: {
    type: "f",
    value: 3.0,
  },
  u_data_arr: {
    type: "float[64]",
    value: dataArray,
  },
};

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader(),
  fragmentShader: fragmentShader(),
  wireframe: false,
});

export const audioSphear = new THREE.Mesh(geometry, material);
