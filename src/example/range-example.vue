<template>
  <goback />
  <div style="padding-top:100px"></div>
  <div style="width: 90vw;margin: 20px auto">
    <cqc-range></cqc-range>
  </div>
  <br>
  <div style="width: 90vw;margin: 20px auto">
    <cqc-range :current="40" color="red" bgColor="blue"></cqc-range>
  </div>
  <br>
  <div style="width: 90vw;margin: 20px auto">
    <cqc-range @change="handleChange">
      <template v-slot:startText>
        开始
      </template>
      <template v-slot:endText>
        结束
      </template>
    </cqc-range>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      handleChange(e, r) {
        console.log(e, r)
      }
    }
  }
}
</script>
