<script setup lang='ts'>
const { $initScene } = useNuxtApp();
const { $audioContext } = useNuxtApp();
const { $audio } = useNuxtApp();


// set the title and tab icon
useHead({
    title: 'yeezy',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/kanye.jpeg' }],
})

// declaring refs for the html elements for vue to interact with it
const canvasRef = ref(null);
const playing = ref(false);
const volume = ref(60);

// when the play btn is clicked
const play = () => {
    if ($audioContext.state === 'suspended') {
        $audioContext.resume();
    }
    if (playing.value === false) {
        $audio.play();
        $audio.volume = (volume.value / 100);
        playing.value = true;
    } else if (playing.value === true) {
        $audio.pause();
        playing.value = false;
    }
}

onMounted(() => {
    $initScene(canvasRef); // initialise the scene
    // watch for volume change
    watch(volume, (newvolume) => {
        $audio.volume = (newvolume / 100);
    });

    $audio.addEventListener('ended', function _next() {
        playing.value = false;
    });
});

</script>

<template>
    <transition>
        <canvas class="z-0 transform-gpu" ref="canvasRef"></canvas>
    </transition>
    <button
        class="absolute bottom-14 px-6 pt-2 pb-3 text-5xl uppercase left-1/2 -translate-x-1/2 border-solid border-2 text-white shadow-xl active:shadow-inner"
        @click="play()">{{ !playing ? 'Play' : 'Pause'
        }}</button>
    <div class="absolute bottom-14 right-0 -mr-20 flex flex-col-reverse scale-105">
        <font-awesome-icon icon="fa-solid fa-volume-high" class="pt-28 text-primary" />
        <input type="range" min="0" max="100" v-model="volume"
            class="scale-50 rotate-270 range range-sm w-96 range-primary bg-black bg-opacity-20 !outline !outline-1 !outline-gray-900" />
    </div>
    <a class="ghub" href="https://github.com/AnkushSarkar10/audio_vis_threejs" target="_blank"><font-awesome-icon icon="fa-brands fa-github" class="absolute bottom-10 left-10 hover:cursor-pointer"/></a>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

html,
body {
    margin: 0;
    font-family: 'Exo 2', 'Space Mono';
    overflow: hidden;
}
.fa-github {
    transform: scale(4);
}
</style>