<template>
  <div class="goback" @click="handle">返回</div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromPath = from.path;
    });
  },
  data() {
    return {
      fromPath: "",
    };
  },
  methods: {
    handle() {
      if (this.fromPath) {
        this.$router.go(-1);
      } else {
        this.$router.replace("/");
      }
    },
  },
};
</script>

<style lang="scss">
.goback {
  position: fixed;
  top: 10px;
  left: 10px;
  background: #fff;
  padding: 10px;
  display: inline-block;
  display: flex;
  align-items: center;
  z-index: 99;

  border-radius: 4px;
  border: 1px solid #dbdbdb;
}
</style>