<script setup>
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ref } from 'vue'
gsap.registerPlugin(Flip,ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin);
</script>

<template>
  <div class="bar"></div>
</template>

<style scoped>
.bar{
  @apply w-3;
}
</style>
