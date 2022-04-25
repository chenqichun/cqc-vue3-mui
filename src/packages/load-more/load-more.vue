<template>
  <div class="cqc-load-more" ref="loadMore">
    <div class="cqc-load-more-content" :class="{'isdropped': topDrag}" :style="{transform:transform}">
      <slot />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
export default {
  name: 'CqcLoadMore',
  setup() {
    const loadMore = ref(null)
    const topDrag = ref(false)
    const radio = 0.5;
    const loadingDistance = 50
    let loadNode;
    let starty;
    let transform = ref('');
    const touchstart = e => {
      starty = e.touches[0].clientY
      topDrag.value = false
    }
    const touchmove = e => {
      if (starty < loadNode.getBoundingClientRect().top || starty > loadNode.getBoundingClientRect().bottom) return;
      if (loadNode.scrollTop <= 1) {
        transform.value = `translateY(${(e.touches[0].clientY - starty)*radio}px)`
      }
    }
    const touchend = e => {
      topDrag.value = true
      nextTick(() => {
        transform.value = `translateY(${loadingDistance}px)`;
      })
      
      setTimeout(() => {
        transform.value = `translateY(0)`;
      }, 1000);
    }
    onMounted(() => {
      nextTick(() => {
        loadNode = loadMore.value;
        loadNode.addEventListener('touchstart', touchstart);
        loadNode.addEventListener('touchmove', touchmove);
        loadNode.addEventListener('touchend', touchend);
      })
    })
    return {
      loadMore,
      transform,
      topDrag
    }
  }
}
</script>

<style>

</style>