<template>
  <transition name="cqc-toast">
    <div class="cqc-toast" v-show="visible" :class="customClass" :style="{padding: icon ? '14px' : '10px'}">
      <i v-if="icon" :class="['cqc-icon', 'cqc-icon-'+icon]"></i>
      <div class="cqc-toast-text" :style="{padding: icon ? '10px' : '0px'}">{{message}}</div>
    </div>
  </transition>
</template>

<script>
import { computed, reactive, ref, toRefs } from 'vue'
export default {
  name: 'CqcToast',
  setup() {
    const state = reactive({
      message: '',
      icon: '',
      className: '',
      position: 'middle'
    })
    const customClass = computed(() => {
      let classess = [];
      if (['top', 'middle', 'bottom'].includes(state.position)) {
        classess.push(`cqc-toast-${state.position}`)
      }
      if (state.className) classess.push(state.className)
      return classess
    })
    const visible = ref(false)
    return {
      customClass,
      visible,
      ...toRefs(state)
    }
  }
}
</script>