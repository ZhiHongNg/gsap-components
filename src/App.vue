<script setup lang="ts">
import GsapButton from "./components/GsapButton.vue";
import {ref} from "vue";
const isLoading = ref<boolean>(false)
</script>

<template>
  <div class="w-screen h-[200vh] bg-black p-5  ">
    <GsapButton round link :loading="isLoading" @click="isLoading=!isLoading">Gsap Button</GsapButton>
<!--    <GsapButton size="large">Gsap Button</GsapButton>-->
<!--    <GsapButton size="small">Gsap Button</GsapButton>-->
<!--    <GsapButton :round="false">Gsap Button</GsapButton>-->
<!--    <GsapButton :round="false">Gsap Button</GsapButton>-->
    <span class="follow"></span>
  </div>
</template>

<style scoped>

</style>
