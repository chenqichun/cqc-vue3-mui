<template>
  <div class="cqc-load-more" ref="loadMore">
    <div class="cqc-load-more-content" :class="{'isdropped': topDropped || bottomDropped}" :style="{transform:transform}">
      <div class="cqc-load-more-top" v-if="topMethod">
        <span class="cqc-load-more-text" v-show="topStatus !== 'loading'">{{ topText }}</span>
        <i class="cqc-icon cqc-icon-loading" v-show="topStatus === 'loading'"></i>
      </div>
      <slot />
      <div class="cqc-load-more-bottom" v-if="bottomMethod">
        <i class="cqc-icon cqc-icon-loading" v-if="bottomDropped"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, computed, onBeforeUnmount, reactive, toRefs } from 'vue'
import { getScrollEventTarget, getScrollTop, throttle } from './loadUtils'
export default {
  name: 'CqcLoadMore',
  props: {
    topMethod: Function,
    bottomMethod: Function,
    finished: {
      type: Boolean,
      default: false
    },
    bottomDistance: {
      type: Number,
      default: 100
    }
  },
  setup(props) {
    const loadMore = ref(null)
    const radio = 0.5;
    let direcition; // 是上拉还是下拉
    const conditionDistance = 50; // 
    let startScrollTop = 0
    const state = reactive({
      topDropped: false,
      bottomDropped: false,
      translate: 0,
      topStatus: ''
    })

    let loadNode, scrollEventTarget;
    let starty;
    const transform = computed(() => {
      return `translate3d(0, ${state.translate}px, 0)`
    })
    const topText = computed(() => {
      switch(state.topStatus) {
        case 'pull':
          return '下拉刷新'
        case 'drop':
          return '释放更新'
        case 'loading':
          return '加载中...'
      }
    })
    // 重置上拉
    const onTopLoaded = () => {
      state.translate = 0;
      setTimeout(() => {
        state.topStatus = 'pull'
        state.topDropped = false;
      }, 200)
    }
    const onBottomLoaded = ()=> {
      state.bottomDropped = false;
    }
    const touchstart = e => {
      starty = e.touches[0].clientY
      startScrollTop = getScrollTop(scrollEventTarget)
      if (state.topStatus !== 'loading') {
        state.topStatus = 'pull'
        state.topDropped = false
      }
      if (state.bottomStatus !== 'loading') {
        state.bottomStatus = 'pull'
        state.bottomDropped = false
      }
    }
    const touchmove = e => {
      if (starty < loadNode.getBoundingClientRect().top || starty > loadNode.getBoundingClientRect().bottom) return;
      let distance = (e.touches[0].clientY - starty) * radio;
      direcition = distance > 0 ? 'down' : 'up';
      if (typeof props.topMethod === 'function' && direcition === 'down' && getScrollTop(scrollEventTarget) === 0 && state.topStatus !== 'loading') {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation()
        state.translate = distance - startScrollTop
        if (state.translate < 0) state.translate = 0;
        state.topStatus = distance > conditionDistance ? 'drop' : 'pull'
      }

    }
    const touchend = e => {
      if (direcition === 'down' && props.topMethod && getScrollTop(scrollEventTarget) === 0 && state.translate > 0) {
        state.topDropped = true
        if (state.topStatus === 'drop') {
          state.translate = 50;
          state.topStatus = 'loading'
          props.topMethod()
        } else {
          state.topStatus = 'pull'
          state.translate = 0
        }
        
      }
    }
    const scroll = throttle(e => {
      if (!props.finished && typeof props.bottomMethod === 'function'  && !state.bottomDropped ) {
        e.stopPropagation()
        if (scrollEventTarget.scrollHeight - getScrollTop(scrollEventTarget) - scrollEventTarget.clientHeight < props.bottomDistance) {
          state.bottomDropped = true
          props.bottomMethod()
        }
     }
    })
    const bindTouchEvents = () => {
        loadNode.addEventListener('touchstart', touchstart);
        loadNode.addEventListener('touchmove', touchmove);
        loadNode.addEventListener('touchend', touchend);
        scrollEventTarget.addEventListener('scroll', scroll);
    }
    const init = () => {
      loadNode = loadMore.value;
      scrollEventTarget = getScrollEventTarget(loadNode)
      bindTouchEvents()
    }
    onMounted(() => {
      nextTick(() => {
        init()
      })
    })
    onBeforeUnmount(() => {
      loadNode.removeEventListener('touchstart', touchstart);
      loadNode.removeEventListener('touchmove', touchmove);
      loadNode.removeEventListener('touchend', touchend);
      scrollEventTarget.removeEventListener('scroll', scroll);
    })
    return {
      ...toRefs(state),
      loadMore,
      transform,
      onTopLoaded,
      onBottomLoaded,
      topText,
    }
  }
}
</script>