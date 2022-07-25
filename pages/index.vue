<script setup lang='ts'>
import { initScene } from "./js/index"
import { audioContext, audio } from "./js/audioObject"

const canvasRef = ref(null);
const playing = ref(false);


const play = () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (playing.value === false) {
        audio.play();
        playing.value = true;
    } else if (playing.value === true) {
        audio.pause();
        playing.value = false;
    }
}

onMounted(() => {
    initScene(canvasRef);

});


</script>

<template>
    <canvas class="z-0" ref="canvasRef"></canvas>
    <button class="absolute bottom-7 left-12 text-3xl text-white" @click="play()">Play/Pause</button>
    <div class="absolute bottom-16 left-12 text-sm text-white">
        {{ }}
    </div>
    <!-- <audio class=" absolute bottom-7 right-4" id="myAudio" ref="myAudio" src="assets/allMine.mp3" controls loop></audio> -->
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

html,
body {
    margin: 0;
    font-family: 'Exo 2', 'Space Mono';
    overflow: hidden;
}
</style>