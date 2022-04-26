<template>
  <div style="height:400px; overflow-y: auto; border:1px solid #dbdbdb">
    <div 
      v-infinite-scroll="load" 
      infinite-scroll-disabled="disabled"
      infinite-scroll-delay="delay"
      infinite-scroll-distance="30"
    >
      <div class="item" v-for="item in count" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { infiniteScroll } from '@/packages/index'
export default {
  directives: {
    infiniteScroll
  },
  setup() {
    const count = ref(0)
    const load = () => {
      console.log('load')
        count.value += 5
     }
    const disabled = ref(false)
    const delay = 100
    const immediate = ref(true)
    return {
      count,
      load,
      disabled,
      delay,
      immediate
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