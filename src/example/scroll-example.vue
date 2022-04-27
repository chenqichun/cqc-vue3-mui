<template>
  <div class="wapper">
    <cqc-scroll>
      <ul>
        <li v-for="n in 20" :key="n">{{ n }}</li>
      </ul>
    </cqc-scroll>
  </div>
  <br />
  <br />
  <div class="wapper">
    <cqc-scroll>
      <ul>
        <div class="item">
          <span style="margin-left: -105px">你看不见我 -></span>
          😀 😁落魄前端 😂 🤣 😃 🙃 热天热怨天尤人天涯热望认为人iui与🙂 🤔 😄 🤨 😐 🙃 的方法😔 😕 🙃 🤑 😲 ☹️ 
        </div>
      </ul>
    </cqc-scroll>
  </div>
  <br />
  <br />
  <div style="width: 300px; height: 400px; border: 1px solid #dbdbdb">
    <cqc-scroll direction="vertical">
      <div>
        <li class="item" v-for="n in 20" :key="n">{{ n }}</li>
      </div>
    </cqc-scroll>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.wapper {
  width: 300px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #dbdbdb;
  ul {
    display: inline-block;
    white-space: nowrap;
    list-style: none;
    li {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      width: 60px;
    }
  }
}
.item {
  height: 60px;
  line-height: 60px;
  width: 100%;
  text-align: center;
}
</style>