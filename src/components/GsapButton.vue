<template>
  <div>
    <button @click="handleClick" ref="gsapButtonRef" class="gsap-button cursor-pointer" :class="{'loading':loading,'cursor-not-allowed':disabled}">
      <span class="circle" ref="circleRef"></span>
      <div class="text">
        <div v-if="loading" class="text-center flex items-center" ref="loadingIconRef" v-html="loadingIcon"></div>
        <span ref="slotRef" class="flex" :class="{'ml-1':loading}">
          <slot/>
        </span>
      </div>
    </button>
  </div>
</template>
<script setup lang="ts">
//todo:链接按钮（link）

import {onMounted, ref, watch} from "vue"
import {gsap} from "gsap"
import {getContrastColor} from "@/utils/color";

const emits = defineEmits(['click'])
const handleClick = () => {
  console.log(`<GsapButton  border-color="${borderColor.value}" :color="${props.color}" colorFul link :loading="isLoading" @click="isLoading=!isLoading">`)

  if (props.slotClickAnimation === 'upDown') {
    gsap.fromTo(slotRef.value, {translateY: '0%'}, {translateY: '5px', duration: 0.1, yoyo: true, repeat: 1})
  } else if (props.slotClickAnimation === 'shake') {
    let tl = gsap.timeline({repeat: 1, yoyo: true});
    tl.to(slotRef.value, {x: -1, duration: 0.1})
        .to(slotRef.value, {x: 2, duration: 0.1})
        .to(slotRef.value, {x: -4, duration: 0.1})
  } else if (props.slotClickAnimation === 'route') {
    let tl = gsap.timeline({repeat: 0, yoyo: false});
    tl.to(slotRef.value, {rotate: 180, duration: 0.25, repeat: 0})
    tl.set(slotRef.value, {rotate: 0, duration: 0.5, repeat: 0})
  } else if (props.disabled) {

  } else {
    emits('click')
  }

}
const props = defineProps({
  size: {
    type: String,
    default: 'default',
    validator: (value) => {
      // 只允许 'large', 'default', 'small' 这三个值
      return ['large', 'default', 'small'].includes(value);
    }
  },
  round: {
    type: Boolean,
    default: false,
  },
  hoverText: {
    type: String,
    default: '',
  },
  circle: {
    type: Boolean,
    default: false,
  },
  colorFul: {
    type: Boolean,
    default: false,
  },
  loadingIcon: {
    type: String,
    default: '<svg t="1706195284303" class="w-5 h-5 " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1522" data-spm-anchor-id="a313x.search_index.0.i0.7b043a81wTvWAE"  ><path d="M511.882596 287.998081h-0.361244a31.998984 31.998984 0 0 1-31.659415-31.977309v-0.361244c0-0.104761 0.115598-11.722364 0.115598-63.658399V96.000564a31.998984 31.998984 0 1 1 64.001581 0V192.001129c0 52.586273-0.111986 63.88237-0.119211 64.337537a32.002596 32.002596 0 0 1-31.977309 31.659415zM511.998194 959.99842a31.998984 31.998984 0 0 1-31.998984-31.998984v-96.379871c0-51.610915-0.111986-63.174332-0.115598-63.286318s0-0.242033 0-0.361243a31.998984 31.998984 0 0 1 63.997968-0.314283c0 0.455167 0.11921 11.711527 0.11921 64.034093v96.307622a31.998984 31.998984 0 0 1-32.002596 31.998984zM330.899406 363.021212a31.897836 31.897836 0 0 1-22.866739-9.612699c-0.075861-0.075861-8.207461-8.370021-44.931515-45.094076L195.198137 240.429485a31.998984 31.998984 0 0 1 45.256635-45.253022L308.336112 263.057803c37.182834 37.182834 45.090463 45.253022 45.41197 45.578141A31.998984 31.998984 0 0 1 330.899406 363.021212zM806.137421 838.11473a31.901448 31.901448 0 0 1-22.628318-9.374279L715.624151 760.859111c-36.724054-36.724054-45.018214-44.859267-45.097687-44.93874a31.998984 31.998984 0 0 1 44.77618-45.729864c0.32512 0.317895 8.395308 8.229136 45.578142 45.411969l67.88134 67.88134a31.998984 31.998984 0 0 1-22.624705 54.630914zM224.000113 838.11473a31.901448 31.901448 0 0 0 22.628317-9.374279l67.88134-67.88134c36.724054-36.724054 45.021826-44.859267 45.097688-44.93874a31.998984 31.998984 0 0 0-44.776181-45.729864c-0.32512 0.317895-8.395308 8.229136-45.578142 45.411969l-67.88134 67.884953a31.998984 31.998984 0 0 0 22.628318 54.627301zM255.948523 544.058589h-0.361244c-0.104761 0-11.722364-0.115598-63.658399-0.115598H95.942765a31.998984 31.998984 0 1 1 0-64.00158h95.996952c52.586273 0 63.88237 0.111986 64.337538 0.11921a31.998984 31.998984 0 0 1 31.659414 31.97731v0.361244a32.002596 32.002596 0 0 1-31.988146 31.659414zM767.939492 544.058589a32.002596 32.002596 0 0 1-31.995372-31.666639v-0.361244a31.998984 31.998984 0 0 1 31.659415-31.970085c0.455167 0 11.754876-0.11921 64.34115-0.11921h96.000564a31.998984 31.998984 0 0 1 0 64.00158H831.944685c-51.936034 0-63.553638 0.111986-63.665624 0.115598h-0.335957zM692.999446 363.0176a31.998984 31.998984 0 0 1-22.863126-54.381656c0.317895-0.32512 8.229136-8.395308 45.41197-45.578141l67.88134-67.884953A31.998984 31.998984 0 1 1 828.693489 240.429485l-67.892177 67.88134c-31.020013 31.023625-41.644196 41.759794-44.241539 44.393262l-0.697201 0.722488a31.908673 31.908673 0 0 1-22.863126 9.591025z" fill="#ffffff" p-id="1523" data-spm-anchor-id="a313x.search_index.0.i1.7b043a81wTvWAE" class="selected"></path></svg>',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  link: {
    type: Boolean,
    default: false,
  },
  color: {
    default: 'white'
  },
  borderColor: {
    required: false,
    type: String
  },
  bgColor: {
    required: false,
    type: String
  },
  borderWidth: {
    required: false,
    type: Number,
    default: 2
  },
  slotClickAnimation: {
    required: false,
    type: String,
    default: ''
  }
})
const borderColor = ref<string>('')
const gsapButtonRefTween = ref(null)
const circleRefTween = ref(null)
const slotRef = ref(null)
const animationStart = (e) => {
  if (props.colorFul) {

  } else {
    gsapButtonRefTween.value = gsap.to(gsapButtonRef.value, {color: 'var(--contrast-color)'})

  }
  circleRefTween.value = gsap.to(circleRef.value, {left: e.layerX, top: e.layerY, width: '100%'})
}
const animationEnd = () => {
  gsap.to(gsapButtonRef.value, {color: props.color})
  gsap.to(circleRef.value, {width: 0})
}

const gsapButtonRef = ref(null)
const circleRef = ref(null)
const loadingIconRef = ref(null)
const setProperty = () => {
  gsapButtonRef.value.style.setProperty('--main-color', props.color)
  gsapButtonRef.value.style.setProperty('--border-thin', props.borderWidth + 'px')
  gsapButtonRef.value.style.setProperty('--round', props.round === true ? '9999px' : '0')
  if (props.borderColor) {
    gsapButtonRef.value.style.setProperty('--border-color', props.borderColor)
  } else {
    gsapButtonRef.value.style.setProperty('--border-color', props.color)
  }
  if (props.circle) {
    gsapButtonRef.value.style.setProperty('--padding-y', '0.5rem')
    gsapButtonRef.value.style.setProperty('--padding-x', '0.5rem')
  } else {
    gsapButtonRef.value.style.setProperty('--padding-y', '0.5rem')
    gsapButtonRef.value.style.setProperty('--padding-x', '1.5rem')
  }
  if (props.bgColor) {
    gsapButtonRef.value.style.setProperty('--bg-color', props.bgColor)
  } else {
    gsapButtonRef.value.style.setProperty('--bg-color', props.color)
  }
  if (props.colorFul) {

  } else {
    gsapButtonRef.value.style.setProperty('--contrast-color', getContrastColor(props.color))
  }
}

onMounted(() => {
  gsap.set(gsapButtonRef.value, {color: props.color})

  setProperty()
  gsapButtonRef.value.addEventListener("mousemove", (e) => {
    animationStart(e)
  })
  gsapButtonRef.value.addEventListener("mouseout", (e) => {
    animationEnd()
  })
  if (props.size === 'default') {
    gsap.set(gsapButtonRef.value, {scale: 1})

  } else if (props.size === 'large') {
    gsap.set(gsapButtonRef.value, {scale: 1.5})

  } else if (props.size === 'small') {
    gsap.set(gsapButtonRef.value, {scale: 0.75})
  }
  if (props.colorFul) {
    gsap.set(gsapButtonRef.value, {background: 'linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4)'})
    gsap.set(circleRef.value, {display: 'none'})
    gsap.fromTo(gsapButtonRef.value, {backgroundSize: '400%', backgroundPosition: '0%'}, {
      backgroundPosition: '400%',
      yoyo: true,
      repeat: -1,
      duration: 40
    })
  }
  if (props.disabled) {
    gsap.set(gsapButtonRef.value, {})
  }
})
watch(() => props.loading, (newValue) => {
  if (newValue) {
    gsap.to(loadingIconRef.value, {rotate: 90, repeat: -1})

  }
})
defineExpose({
  ref: gsapButtonRef
})
</script>
<style scoped>


.gsap-button {
  @apply relative inline-block py-[var(--padding-y)] px-[var(--padding-x)]  rounded-[var(--round)] outline-0  box-border overflow-hidden m-0.5;
//text-transform: uppercase;
}
.gsap-button.loading {
 @apply cursor-default opacity-65 bg-[var(--main-color)]
}


.gsap-button div.text {
  @apply z-40 relative flex justify-center align-middle uppercase font-bold
}
.gsap-button.loading span.text {
  @apply  text-[var(--contrast-color)]
}

.gsap-button::after {
  @apply absolute border-[var(--border-color)] rounded-[var(--round)] left-0 top-0 w-full h-full content-[''];
  border-width: var(--border-thin);
}

.circle {
  @apply absolute block  w-0 rounded-[var(--round)];
}

.circle:before {
  @apply bg-[var(--bg-color)] absolute rounded-[var(--round)] aspect-square content-[''] block left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[150%] pointer-events-none;
}
</style>