<script setup lang='ts'>
const props = defineProps({
  volume: Number
})
// const value = ref(10);

</script>

<template>
    <input type="range" min="0" max="100" v-model="props.volume" class="range range-sm w-1/3" />
</template>

<style scoped>
input {
    transform: rotate(270deg) scale(0.6);
}
</style>