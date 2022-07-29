import * as THREE from "three";

// audio stuff
export const audioContext = new window.AudioContext();
export const audio = new Audio("assets/cityInTheSky.mp3");
const source = audioContext.createMediaElementSource(audio);
source.connect(audioContext.destination);

export const analyser = audioContext.createAnalyser();
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.smoothingTimeConstant = 0.8;
analyser.fftSize = 16384;

export const dataArray = new Uint8Array(analyser.frequencyBinCount); // this contains the audio freq data

const geometry = new THREE.SphereGeometry(15, 68, 75);
const originalArr = [...(geometry.attributes.position.array as number[])];

const texture = new THREE.TextureLoader().load(`assets/kanye.jpeg`);

const material = new THREE.PointsMaterial({
  map: texture,
  size: 0.4,
  transparent: true,
});

// make the sphere
export const audioSphear = new THREE.Points(geometry, material);

// the main fdunction for the audio stuff
export const updateVertices = (dataArr: Uint8Array) => {
  const particlesArr = audioSphear.geometry.attributes.position
    .array as number[];

  for (let i = 0; i < particlesArr.length / 2; i += 3) {
    if (i < dataArray.length) {
      const factor = (dataArr[i] / 257) + 1;

      // upper part of sphere
      let indexU = Math.floor(particlesArr.length / 2) - i;
      const x_u = originalArr[indexU];
      const z_u = originalArr[indexU + 2];

      particlesArr[indexU] = x_u * factor;
      particlesArr[indexU + 2] = z_u * factor;

      // lower part of sphere
      let indexL = Math.floor(particlesArr.length / 2) + i;
      const x_l = originalArr[indexL];
      const z_l = originalArr[indexL + 2];

      particlesArr[indexL] = x_l * factor;
      particlesArr[indexL + 2] = z_l * factor;
    }
  }
  audioSphear.geometry.attributes.position.needsUpdate = true;
};
