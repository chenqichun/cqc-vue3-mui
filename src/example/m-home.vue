<template>
  <div>
    <template v-for="route in routes" :key="route.name">
      <router-link :to="route.path" class="item" v-if="route.path != '/'">
        <span>{{ route.meta.title }}</span>
        <span class="border"></span>
      </router-link>
    </template>
    <div class="website">
      详情文档请访问:
      <a href="http://www.chenqichun.com/lib/vue3-mui-docs">
      http://www.chenqichun.com/lib/vue3-mui-docs</a>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router'
export default {
  setup() {
    return {
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
.website {
  margin: 20px;
  a {
    color: #409EFF
  }
}
a {
  text-decoration: none;
  color: #333;
}
.item {
  position: relative;
  width: 90vw;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  line-height: 50px;
  box-sizing: border-box;
  padding: 0 20px;
  display: block;
  margin: 20px auto;
  color: #333;
  .border {
    position: absolute;
    right: 10px;
    top: 50%;
    width: 6px;
    height: 6px;
    border-top: 1px solid #666;
    border-right: 1px solid #666;
    transform: translateY(-50%) rotate(45deg);
  }
}
</style>