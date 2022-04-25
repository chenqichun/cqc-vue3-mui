<template>
  <transition name="cqc-loading">
    <div class="cqc-loading" v-show="visible">
      <div class="cqc-loading-wrapper">
        <i class="cqc-icon cqc-icon-loading"></i>
        <div v-if="text" class="cqc-loading-text">{{ text }}</div>
      </div>
      <div v-if="mask" class="cqc-loading-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      text: '',
      mask: true,
      visible: false
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>