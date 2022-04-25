<template>
  <div>
    <button @click="click('success')">成功</button>
    <br>
    <button @click="click('error')">错误</button>
    <br>
    <button @click="click('warn')">警告</button>
    <button @click="close">手动关闭</button>
  </div>
</template>

<script>
import Toast from '@/packages/toast/index.js'
export default {
  name: 'App',
  setup() {
    let count = 0;
    let t;
    const click = (type) => {
     t = Toast({message: 'hahah',icon:type, duration: 2000, position: 'middle'})
    }
    const close = () => {
      t && t.close()
    }
    return {
      click,
      close
    }
  }
}
</script>

