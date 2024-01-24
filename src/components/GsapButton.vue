<template>
  <div>
    <button ref="gsapButtonRef" class="gsap-button">
      <span class="circle" ref="circleRef"></span>
      <span class="text">
        <slot/>
      </span>
    </button>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import {gsap} from "gsap"
import {getContrastColor} from "@/utils/color";

const props = defineProps({
  color: {
    default: 'rgb(254, 252, 232)'
  },
  borderColor: {
    default: 'rgb(254, 252, 232)'
  }
})
const animationStart = (e) => {
  gsap.to(gsapButtonRef.value, {color: getContrastColor(props.color)})
  gsap.to(circleRef.value, {left: e.clientX - e.target.offsetLeft, top: e.clientY - e.target.offsetTop, width: '100%'})
}
const animationEnd = () => {
  gsap.to(gsapButtonRef.value, {color: 'var(--main-color)'})
  gsap.to(circleRef.value, {width: 0})
}

const gsapButtonRef = ref(null)
const circleRef = ref(null)

onMounted(() => {
  document.documentElement.style.setProperty('--main-color', props.color);
  gsapButtonRef.value.addEventListener("mousemove", (e) => {
    animationStart(e)
  })
  gsapButtonRef.value.addEventListener("mouseout", (e) => {
    animationEnd()
  });
})
</script>
<style scoped>
:root {
  --main-color: 'rgb(254, 252, 232)'
}

.gsap-button {
  @apply relative inline-block py-2 px-6 text-[var(--main-color)] rounded-full outline-0 cursor-pointer box-border overflow-hidden m-0.5;
//text-transform: uppercase;
}

.gsap-button span.text {
  @apply z-40 relative
}

.gsap-button::after {
  @apply absolute border-[var(--main-color)] border-2 rounded-full left-0 top-0 w-full h-full content-[''];
}

.circle {
  @apply absolute block  w-0 rounded-full;
}

.circle:before {
  @apply bg-[var(--main-color)] absolute rounded-full aspect-square content-[''] block left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[150%] pointer-events-none;
}
</style>