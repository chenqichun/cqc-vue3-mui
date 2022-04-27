<template>
  <div>
    <template v-for="route in routes" :key="route.name">
      <router-link :to="route.path" class="item" v-if="route.path != '/'">
        {{ route.meta.title }}
      </router-link>
    </template>
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
a {
  text-decoration: none;
  color: #333;
}
.item {
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
}
</style>