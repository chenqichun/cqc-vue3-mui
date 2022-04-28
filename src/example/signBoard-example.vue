<template>
  <div>
    <goback />
    <cqc-sign-board 
  @getData="getData"
  :lineWidth="10"
  strokeStyle="red"
  ></cqc-sign-board>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      getData(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>