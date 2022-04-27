<template>
  <div class="cqc-slide">
    <div class="cqc-slide-content" ref="slide" :style="styles">
      <div class="cqc-slide-left" v-if="$slots.left" ref="left" :style="{'margin-left': -leftW + 'px'}">
        <slot name="left" />
      </div>
      <div class="cqc-slide-center" :style="{width: centerW + 'px'}">
        <slot />
      </div>
      <div class="cqc-slide-right" v-if="$slots.right" ref="right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
export default {
  name: 'CqcSlide',
  props: {
    prevent: {
      type: Boolean,
      default: true
    },
    rightDistance: {
      type: Number,
      default: 30
    },
    leftDistance: {
      type: Number,
      default: 30
    }
  },
  setup(props, { slots }) {
    let slide = ref(null)
    let right = ref(null)
    let left = ref(null)
    let startx = 0;
    let offsetx = ref(0)
    let oleOffsetx = 0;
    let canMove = false;
    const state = reactive({
      centerW: 0,
      leftW: 0,
      rightW: 0
    })

    const styles = computed(() => {
      return {
        "transform": `translateX(${offsetx.value}px)`,
        "transition-timing-function": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "transition-duration": '0.8s',
      }
    })

    const touchstart = (e) => {
      canMove = true;
      startx = e.touches ? e.touches[0].clientX : e.clientX;
      oleOffsetx = offsetx.value
    };

    const touchmove = (e) => {
      if (!canMove) return;
      if (props.prevent) e.preventDefault()
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let diff = clientX - startx;
      offsetx.value = oleOffsetx + diff * 2
      if (diff > 0 && offsetx.value > state.leftW) {
        offsetx.value = state.leftW
      }
      if (diff < 0 && offsetx.value < -state.rightW) {
        offsetx.value = -state.rightW
      }
    };

    const touchend = (e) => {
      canMove = false;
      if (offsetx.value > 0) {
        if (offsetx.value > props.leftDistance) {
          offsetx.value = state.leftW
        } else {
          offsetx.value = 0
        }
      } else {
        if (-offsetx.value > props.rightDistance) {
          offsetx.value = -state.rightW
        } else {
          offsetx.value = 0
        }
      }
    };
    const eventMap = {
      touchstart,
      touchmove,
      touchend,
      mousedown: touchstart,
      mousemove: touchmove,
      mouseup: touchend,
    };
    const touchEvents = () => {
      Object.entries(eventMap).forEach(([key, event]) => {
        slide.addEventListener(key, event);
      });
      window.addEventListener("mouseup", touchend);
    };

    const init = () => {
      slide = slide.value
      left = left.value
      right = right.value
      state.centerW = slide.parentNode.clientWidth
      if (slots.left) state.leftW = left.offsetWidth
      if (slots.right) state.rightW = right.offsetWidth 
      touchEvents()
    }

    onMounted(() => {
      nextTick(() => {
        init()
      })
    })
    onBeforeUnmount(() => {
      Object.entries(eventMap).forEach(([key, event]) => {
        slide.removeEventListener(key, event);
      });
      window.removeEventListener("mouseup", touchend);
    });
    return {
      ...toRefs(state),
      left,
      right,
      styles,
      slide
    }
  }
}
</script>