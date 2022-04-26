<template>
  <div>
    <!-- <To /> -->
    <!-- <Lo /> -->
    <!-- <LM /> -->
    <!-- <IS /> -->
    <!-- <RA /> -->
    <Sw />
  </div>
</template>

<script>
import To from '@/example/toast-example.vue'
import Lo from '@/example/loading-example.vue'
import LM from '@/example/load-more.vue'
import IS from '@/example/infinite-scroll-example.vue'
import RA from '@/example/range-example.vue'
import Sw from '@/example/switch-example.vue'
export default {
  name: 'App',
  components: {
    To,
    Lo,
    LM,
    IS,
    RA,
    Sw
  },
  setup() {

  }
}
</script>
<style>

</style>

