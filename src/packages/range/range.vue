<template>
  <div class="cqc-range">
    <div class="cqc-range-thumb"></div>

  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'CqcRange',
  props: {
    thumbWidth: {
      type: Number,
      default: 30
    },
    height: {
      type: Number,
      default: 1
    }
  },
  setup() {
    onMounted
  }
}
</script>

<style>

</style>