<template>
  <div class="goback">
    <span class="btn">返回</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.goback {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  height: 50px;
  border-bottom: 1px solid #dbdbdb;
  padding-left: 10px;
  display: flex;
  align-items: center;
  .btn {
    padding: 2px 4px;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
  }
}
</style>