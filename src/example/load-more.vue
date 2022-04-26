<template>
  <div>
    <div style="height:400px; overflow-y: auto">
    <cqc-load-more :topMethod="topMethod" :bottomMethod="bottomMethod" ref="more" :finished="finished">
      <div class="item" v-for="item in count" :key="item">{{ item }}</div>
      <div v-if="finished">五更多数据</div>
    </cqc-load-more>
  </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const more = ref(null)
    const finished = ref(false)
    const count = ref(20)
    const topMethod = () => {
      console.log('top')
      setTimeout(() => {
        finished.value = false
        count.value = 20
        more.value.onTopLoaded()
      }, 1000);
    }
    const bottomMethod = () => {
      console.log('bottom')
      setTimeout(() => {
         count.value += 20
      if (count.value >= 60) { finished.value =true}
        more.value.onBottomLoaded()
      }, 1000);
    }
    const close = () => {
      finished.value = true
    }
    return {
      topMethod,
      more,
      bottomMethod,
      close,
      finished,
      count
    }
  }
}
</script>

<style scoped>
.item {
  height:50px;
  line-height:50px;
  text-align:center;
  border: 1px solid #dbdbdb;
}
</style>