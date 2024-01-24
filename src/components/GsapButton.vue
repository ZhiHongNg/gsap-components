<script setup>
import {onMounted, ref} from "vue";
import {gsap} from "gsap";
const animationStart = (e)=>{
  console.clear()
  const rippleBtn = document.getElementById("ripple");
  let x = e.clientX - e.target.offsetLeft;
  let y = e.clientY - e.target.offsetTop;
  console.log('prevScreenX,Y','('+prevScreenX.value+','+prevScreenY.value+')')
  console.log('screenX,Y','('+e.screenX+','+e.screenY+')')
  console.log('x abs',prevScreenX.value-e.screenX)
  console.log('Y abs',prevScreenY.value-e.screenY)
  prevScreenX.value = e.screenX
  prevScreenY.value = e.screenY
  gsap.to(rippleBtn, {color: 'black'})
  gsap.to('.btn--ripple .roundedbg', {left: x, top: y,width:'100%'})
}
const animationEnd = (e)=>{
  const rippleBtn = document.getElementById("ripple");
  gsap.to(rippleBtn, {color: 'rgb(254, 252, 232)'})
  gsap.to('.btn--ripple .roundedbg', {width:0})
}
const prevScreenX = ref()
const prevScreenY = ref()
onMounted((e) => {
  let cleartimeout;
  const rippleBtn = document.getElementById("ripple");

  rippleBtn.addEventListener("mousemove", function (e) {
    animationStart(e)
  })
  rippleBtn.addEventListener("mouseout", function (e) {
    animationEnd(e)
  });
})
</script>

<template>
  <div>
    <button class="btn btn--ripple" id="ripple">
      <span class="roundedbg"></span>
      <span class="text">get GSAP</span>

    </button>
    <!--    <div class="follow"></div>-->
  </div>
</template>

<style scoped>
body > * {
  flex-basis: 200px;
}

.btn {
  @apply relative inline-block py-3 px-9 text-yellow-50 rounded-full;
//margin: 10px; font-size: 1.4rem; letter-spacing: 2px;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
  box-sizing: border-box;

}

.btn--ripple {
  @apply bg-black   text-yellow-50 overflow-hidden
}

.btn--ripple span.text {
  @apply z-40 relative
}
.btn::after {
  @apply  absolute border-yellow-50 border-2 rounded-full left-0 top-0 w-full h-full;
  content: '';
}

.btn--ripple .roundedbg {
  @apply absolute   block w-full w-0;
  border-radius: 100px;

}

.btn--ripple .roundedbg:before {
  @apply bg-yellow-50 rounded-full ;
  aspect-ratio: 1/1;
  content: "";
  display: block;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: translate(-50%, -50%);
  width: 150%;
  border-style: none;

}

.follow {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  display: block;
  transform: translate(-50%, -50%);
}
</style>