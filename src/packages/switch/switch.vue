<template>
  <div class="cqc-switch" :style="switchStyle">
    <div
      class="cqc-switch-thumb"
      :style="thumbStyle"
      @click="handleChange"
    ></div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
export default {
  name: "CqcSwitch",
  props: {
    thumbWidth: {
      type: Number,
      default: 30,
    },
    width: {
      type: Number,
      default: 50,
    },
    activeColor: {
      type: String,
      default: "#04BE02",
    },
    bgColor: {
      type: String,
      default: "#fff",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    
  },
  setup(props) {
    const checked = ref(props.checked);
    const diff = props.width - props.thumbWidth
    const switchStyle = reactive({
      borderRadius: props.thumbWidth+1 + "px",
      height: props.thumbWidth+1 + "px",
      width: props.width+1 + "px",
      background: props.bgColor,
    });
    const thumbStyle = reactive({
      height: props.thumbWidth + "px",
      width: props.thumbWidth + "px",
      transform: `translateX(${props.checked ? diff : 1}px)`
    });
    const handleChange = () => {
      checked.value = !checked.value;
      switchStyle.background = checked.value ? props.activeColor : props.bgColor
      thumbStyle.transform =`translateX(${checked.value ? diff : 1}px)`
    };
    return {
      switchStyle,
      thumbStyle,
      handleChange,
    };
  },
};
</script>

<style>
</style>