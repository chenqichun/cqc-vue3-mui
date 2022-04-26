<template>
  <div 
    class="cqc-range" 
    :style="{height: thumbWidth + 'px'}"
  >
      <div class="cqc-range-text">
        <slot name="startText" v-if="$slots.startText" />
        <span v-else>0</span>
      </div>
      <div class="cqc-range-wrapper" ref="range">
        <div class="cqc-range-way" :style="wayStyle"></div>
        <div class="cqc-range-progress" :style="progressStyle"></div>
        <div class="cqc-range-thumb" :style="{...thumbStyle, transform: transform}"></div>
      </div>
      <div class="cqc-range-text">
        <slot name="endText" v-if="$slots.endText" />
        <span v-else>{{ percentage }}\100</span>
      </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref } from 'vue'
export default {
  name: 'CqcRange',
  props: {
    thumbWidth: {
      type: Number,
      default: 30
    },
    thumbColor: {
      type: String,
      default: '#fff'
    },
    height: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '#26a2ff'
    },
    bgColor: {
      type: String,
      default: '#a9acb1'
    },
    current: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    let range = ref(null)
    let rangeWidth = 1;
    let touchStartx = 0;
    let oleOffsetX = 0;
    let offsetX = ref(0);
    let canMove = true;
    const transform = computed(() => {
      return `translate3D(${offsetX.value}px, -50%, 0)`
    })
    const thumbStyle = computed(()=> {
      return {
        width: props.thumbWidth + 'px',
        height: props.thumbWidth + 'px',
        background: props.thumbColor
      }
    })
    const wayStyle = computed(() => {
      return {
        right: 0,
        background: props.bgColor,
        height: props.height + 'px'
      }
    })
    const progressStyle = computed(() => {
      return {
        background: props.color,
        width: offsetX.value + 'px',
        height: props.height + 'px'
      }
    })
    const percentage = computed(() => {
      return parseInt(offsetX.value / rangeWidth * 100)
    })
    const touchstart = e => {
      touchStartx = e.touches[0].clientX;
      let x = e.touches[0].clientX - range.getBoundingClientRect().left;
      x = x - props.thumbWidth / 2
      offsetX.value = x > rangeWidth ? rangeWidth : (x < 0 ? 0 : x)
      oleOffsetX = offsetX.value
      canMove = true
    }
    const touchmove = e => {
      if (!canMove) return
      let newOffsetX = e.touches[0].clientX - touchStartx + oleOffsetX;
      offsetX.value = newOffsetX > rangeWidth ? rangeWidth : (newOffsetX < 0 ? 0 : newOffsetX)
    }
    const touchend = e => {
      canMove = false
    }
    const touchEvents = () => {
      range.addEventListener('touchstart', touchstart)
      range.addEventListener('touchmove', touchmove)
      window.addEventListener('touchend', touchend)
    }

    const init = () => {
      range = range.value
      rangeWidth = range.clientWidth - props.thumbWidth
      touchEvents()
    }

    onMounted(() => {
      nextTick(() => {
        init()
      })
    })
    return {
      wayStyle,
      thumbStyle,
      transform,
      range,
      offsetX,
      progressStyle,
      percentage
    }
  }
}
</script>

<style>

</style>