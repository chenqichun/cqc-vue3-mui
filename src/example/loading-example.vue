<template>
  <div>
    <goback />
    <button @click="open">打开loading</button>
  </div>
</template>

<script>
import { Loading } from 'cqc-vue3-mui'
export default {
  name: 'App',
  setup() {
    const open = () => {
      Loading.open({text: 'loading...'})
      setTimeout(() => {
        Loading.close()
      }, 3000);
    }
    return {
      open
    }
  }
}
</script>

