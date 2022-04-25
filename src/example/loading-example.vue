<template>
  <div>
    <button @click="open">打开loading</button>
    <br>
    <button @click="close">手动关闭</button>
  </div>
</template>

<script>
import loading from '@/packages/loading/index.js'
export default {
  name: 'App',
  setup() {
    const open = () => {
      loading.open({text: 'loading...'})
      setTimeout(() => {
        loading.close()
      }, 3000);
    }
    const close = () => {
      loading.close()
    }
    return {
      open,
      close
    }
  }
}
</script>

