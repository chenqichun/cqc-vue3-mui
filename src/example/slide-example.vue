<template>
  <div style="margin: 1 0px">
    <h3>左边</h3>
    <div class="slide-item">
      <cqc-slide>
        <template v-slot:left>
          <div class="left-wrap">
            <span></span>
          </div>
        </template>
        <div class="text">宝宝不开心</div>
      </cqc-slide>
    </div>
    
    <br>
    <h3>右边</h3>
    <div class="slide-item">
      <cqc-slide>
        <div class="text">宝宝不开心</div>
        <template v-slot:right>
          <div class="btn-wrap">
            <div class="btn btn1"> 确定</div>
            <div class="btn btn2"> 删除</div>
          </div>
        </template>
      </cqc-slide>
    </div>

    <br>
    <h3>全部</h3>
    <div class="slide-item">
      <cqc-slide>
        <template v-slot:left>
          <div class="left-wrap">
            <span></span>
          </div>
        </template>
        <div class="text">宝宝不开心</div>
        <template v-slot:right>
          <div class="btn-wrap">
            <div class="btn btn1"> 确定</div>
            <div class="btn btn2"> 删除</div>
          </div>
        </template>
      </cqc-slide>
    </div>
    <br>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.slide-item {
  width: 300px;
  height: 50px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin-bottom: 10px;
  .text {
    line-height: 50px;
    text-align: center;
  }
  .left-wrap {
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #dbdbdb;
    span {
      width: 12px;
      height: 12px;
      border-radius: 100%;
      border: 1px solid #dbdbdb;
      background: green;
    }
  }
  .btn-wrap {
    display: inline-flex;
    white-space: nowrap;
    height: 50px;
    .btn {
      height: 50px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn1 {
      background: #409EFF;
    }
    .btn2 {
      background: #dd6161;
    }
  }
}
</style>