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
  // vertexColors: true,
});

// color the sphere
// const audioSphearcolor1 = new THREE.Color("rgb(0,0,0)");
// const audioSphearcolor2 = new THREE.Color("rgb(255,255,255)");
// const audioSphearcolor3 = new THREE.Color("rgb(0,0,0)");
// const colors = [];

// for (let index = 0; index < geometry.attributes.position.count; index++) {
//   // colors.push(audioSphearcolor1.r,audioSphearcolor1.g,audioSphearcolor1.b);
//   // colors.push(audioSphearcolor2.r, audioSphearcolor2.g, audioSphearcolor2.b);
//   // colors.push(audioSphearcolor3.r,audioSphearcolor3.g,audioSphearcolor3.b);
// }

// geometry.setAttribute(
//   "color",
//   new THREE.BufferAttribute(new Float32Array(colors), 3)
// );

// geometry.attributes.color.needsUpdate = true;

// make the sphere
export const audioSphear = new THREE.Points(geometry, material);


// the main fdunction for the audio stuff
export const updateVertices = (dataArr: Uint8Array) => {
  const particlesArr = audioSphear.geometry.attributes.position
    .array as number[];
  const skipFrequencies = 0; // max = 1099

  for (let i = 0; i < particlesArr.length / 2; i += 3) {
    if (i + skipFrequencies < dataArray.length) {
      const factor = (dataArr[i + skipFrequencies] / 257) + 1;

      // upper part
      let indexU = Math.floor(particlesArr.length / 2) - i;
      const x_u = originalArr[indexU];
      const z_u = originalArr[indexU + 2];

      particlesArr[indexU] = x_u * factor;
      particlesArr[indexU + 2] = z_u * factor;

      // lower part
      let indexL = Math.floor(particlesArr.length / 2) + i;
      const x_l = originalArr[indexL];
      const z_l = originalArr[indexL + 2];

      particlesArr[indexL] = x_l * factor;
      particlesArr[indexL + 2] = z_l * factor;
    }
  }
  audioSphear.geometry.attributes.position.needsUpdate = true;
};
