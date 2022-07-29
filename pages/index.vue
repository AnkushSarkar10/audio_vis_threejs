<script setup lang='ts'>
import { initScene } from "./js/index"
import { audioContext, audio } from "./js/audioObject"

const canvasRef = ref(null);
const playing = ref(false);
const volume = ref(60);


const play = () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (playing.value === false) {
        audio.play();
        audio.volume = (volume.value / 100);
        playing.value = true;
    } else if (playing.value === true) {
        audio.pause();
        playing.value = false;
    }
}

onMounted(() => {
    initScene(canvasRef);
    watch(volume, (newvolume) => {
        console.log(newvolume);
        audio.volume = (newvolume / 100);
    });
});


</script>

<template>
    <canvas class="z-0" ref="canvasRef"></canvas>
    <button class="absolute bottom-16 text-5xl uppercase left-1/2 -translate-x-1/2 text-white" @click="play()">{{ !playing ? 'Play' : 'Pause'
    }}</button>
    <div class="absolute bottom-20 right-10">
        <input type="range" min="0" max="100" v-model="volume" class="range range-sm w-96" />
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

html,
body {
    margin: 0;
    font-family: 'Exo 2', 'Space Mono';
    overflow: hidden;
}

input {
    transform: rotate(270deg) scale(0.6);
    color: aqua !important;
}
</style>