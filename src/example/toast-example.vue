<template>
  <div>
    <button @click="click('success', '成功')">成功</button>
    <button @click="click('error', '错误')">错误</button>
    <button @click="click('warn', '警告')">警告</button>
    <button @click="click('', 'hello cqc', 'top')">位置上</button>
    <button @click="click('', 'hello cqc', 'middle')">位置中</button>
    <button @click="click('', 'hello cqc', 'bottom')">位置下</button>
    <button @click="close">手动关闭</button>
  </div>
</template>

<script>
import {Toast} from 'cqc-vue3-mui'
export default {
  name: 'App',
  setup() {
    let count = 0;
    let t;
    const click = (type, text, position) => {
     t = Toast({message: text,icon:type, duration: 2000, position:position || 'middle'})
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


