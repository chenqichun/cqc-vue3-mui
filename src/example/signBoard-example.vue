<template>
  <cqc-sign-board 
  @getData="getData"
  t
  ></cqc-sign-board>
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