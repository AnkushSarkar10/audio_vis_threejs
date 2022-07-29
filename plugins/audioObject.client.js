// import * as THREE from "three";
import { SphereGeometry, TextureLoader, PointsMaterial, Points } from "three";

// audio stuff

let audioContext, audio, analyser, dataArray, audioSphear, updateVertices;

if (process.client) {
  audioContext = new window.AudioContext();

  audio = new Audio("/cityInTheSky.mp3");
  const source = audioContext.createMediaElementSource(audio);
  source.connect(audioContext.destination);

  analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 16384;

  dataArray = new Uint8Array(analyser.frequencyBinCount); // this contains the audio freq data

  const geometry = new SphereGeometry(15, 68, 75);
  const originalArr = [...geometry.attributes.position.array];

  const texture = new TextureLoader().load(`/kanye.jpeg`);

  const material = new PointsMaterial({
    map: texture,
    size: 0.4,
    transparent: true,
  });

  // make the sphere
  audioSphear = new Points(geometry, material);

  // the main fdunction for the audio stuff
  updateVertices = (dataArr) => {
    const particlesArr = audioSphear.geometry.attributes.position.array;

    for (let i = 0; i < particlesArr.length / 2; i += 3) {
      if (i < dataArray.length) {
        const factor = dataArr[i] / 257 + 1;

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
}

export {
  audioContext,
  audio,
  analyser,
  dataArray,
  audioSphear,
  updateVertices,
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      audio: audio,
      audioContext: audioContext,
    },
  };
});
