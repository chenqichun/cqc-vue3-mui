<template>
  <div style="width: 300px;margin: 50px 0 0 20px">
    <cqc-range></cqc-range>
  </div>
  <br>
  <div style="width: 300px;margin: 50px 0 0 20px">
    <cqc-range>
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

}
</script>

<style>

</style>