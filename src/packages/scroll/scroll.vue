<template>
  <div class="cqc-scroll">
    <div 
      class="cqc-scroll-content"
      ref="scrollContent" 
      :style="contentStyle"
     >
      <slot />
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
export default {
  name: "CqcScroll",
  props: {
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        const types = ["horizontal", "vertical"];
        if (!types.includes(val)) {
          throw new Error(`<cqc-scroll>的direction值只能为:${types.join(",")}`);
        }
        return true;
      },
    },
    prevent: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    let scrollContent = ref(null);
    let scrollWidth = 0;
    let scrollHeight = 0;
    let translateX = ref(0);
    let animationFn = ref("cubic-bezier(0.165, 0.84, 0.44, 1)");
    let duration = ref("0.8s");
    let canMove = false;
    let start = {
      cx: 0,
      tx: 0,
      t: 0,
    };

    const flag = props.direction === "horizontal" ? true : false;

    const contentStyle = computed(() => {
      let transform = flag
        ? `translate3D(${translateX.value}px, 0, 0)`
        : `translate3D(0, ${translateX.value}px, 0)`;
      return {
        "display": flag ? 'inline-block' : 'block',
        transform,
        "transition-timing-function": animationFn.value,
        "transition-duration": duration.value,
      };
    });

    const touchstart = (e) => {
      canMove = true;
      if (flag) {
        start.cx = e.touches ? e.touches[0].clientX : e.clientX;
      } else {
        start.cx = e.touches ? e.touches[0].clientY : e.clientY;
      }
      start.tx = translateX.value;
      start.t = Date.now();
    };

    const touchmove = (e) => {
      if (!canMove) return;
      if (props.prevent) e.preventDefault()
      let clientX = 0;
      if (flag) {
        clientX = e.touches ? e.touches[0].clientX : e.clientX;
      } else {
        clientX = e.touches ? e.touches[0].clientY : e.clientY;
      }
      let diff = clientX - start.cx;
      if (
        (start.tx === 0 && diff > 0) ||
        (start.tx <= -scrollWidth && diff < 0)
      ) {
        translateX.value = start.tx + diff * 0.5;
      } else {
        translateX.value = start.tx + diff * 2;
      }
    };

    const touchend = (e) => {
      canMove = false;
      scrollWidth = flag ? scrollWidth : scrollHeight;
      if (translateX.value > 0 || translateX.value < -scrollWidth) {
        animationFn.value = "cubic-bezier(0.165, 0.84, 0.44, 1)";
        translateX.value = translateX.value > 0 ? 0 : -scrollWidth;
        duration.value = "0.8s";
      } else {
        let clienX = 0;
        if (flag) {
          clienX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        } else {
          clienX = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        }
        let diffTime = Date.now() - start.t;
        if (diffTime < 300 && Math.abs(clienX - start.cx) > 30) {
          animationFn.value = "cubic-bezier(0.23, 1, 0.32, 1);";
          duration.value = "2.5s";
        }
      }
      scrollContent.addEventListener("transitionend", () => {
        duration.value = "0s";
      });
    };
    const eventMap = {
      touchstart,
      touchmove,
      touchend,
      mousedown: touchstart,
      mousemove: touchmove,
      mouseup: touchend,
    };
    const touchEvents = () => {
      Object.entries(eventMap).forEach(([key, event]) => {
        scrollContent.addEventListener(key, event);
      });
      window.addEventListener("mouseup", touchend);
    };

    const init = () => {
      scrollContent = scrollContent.value;
      scrollWidth =
        scrollContent.offsetWidth - scrollContent.parentNode.clientWidth;
      scrollHeight =
        scrollContent.offsetHeight - scrollContent.parentNode.clientHeight;
      touchEvents();
    };
    onMounted(() => {
      nextTick(() => {
        init();
      });
    });
    onBeforeUnmount(() => {
      Object.entries(eventMap).forEach(([key, event]) => {
        scrollContent.removeEventListener(key, event);
      });
      window.removeEventListener("mouseup", touchend);
    });

    return {
      contentStyle,
      scrollContent,
    };
  },
};
</script>