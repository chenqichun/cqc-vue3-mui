<template>
  <div style="margin: 50px">
    <goback />
    <div style="padding-top:50px"></div>
    <cqc-switch :checked="true" />
    <br>
    <cqc-switch :checked="true" :disabled="true" />
    <br>
    <cqc-switch @change="change1" :checked="checked" />
    <br>
    <cqc-switch :trueValue="1" :falseValue="0" @change="change2" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const change1 = e => {
      console.log('change1', e)
    }
    const change2 = e => {
      console.log('change2', e)
    }
    const checked = ref(false)
    setTimeout(() => {
      checked.value = true
    }, 1000);
    return {
      change1,
      change2,
      checked
    }
  }
}
</script>

<style>

</style>