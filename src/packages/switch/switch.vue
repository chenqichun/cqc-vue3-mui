<template>
  <div :class="['cqc-switch', { isDisabled: disabled }]" :style="switchStyle">
    <div
      class="cqc-switch-thumb"
      :style="thumbStyle"
      @click="handleChange"
    ></div>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
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
    trueValue: {
      type: [Number, String, Boolean],
      default: true
    },
    falseValue: {
      type: [Number, String, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false,
    }
    
  },
  setup(props, { emit }) {
    const checked = ref(props.checked);
    const diff = props.width - props.thumbWidth
    const switchStyle = reactive({
      borderRadius: props.thumbWidth+1 + "px",
      height: props.thumbWidth+1 + "px",
      width: props.width+1 + "px",
      background:  checked.value ? props.activeColor : props.bgColor,
    });
    const thumbStyle = reactive({
      height: props.thumbWidth + "px",
      width: props.thumbWidth + "px",
      transform: `translateX(${props.checked ? diff : 1}px)`
    });
    const handleChange = () => {
      if (props.disabled) return
      checked.value = !checked.value;
      switchStyle.background = checked.value ? props.activeColor : props.bgColor
      thumbStyle.transform =`translateX(${checked.value ? diff : 1}px)`
      emit('change', checked.value ? props.trueValue : props.falseValue)
    };
    watch(() => props.checked, val => {
      if (props.disabled) return
      checked.value = val;
      switchStyle.background = checked.value ? props.activeColor : props.bgColor
      thumbStyle.transform =`translateX(${checked.value ? diff : 1}px)`
    })
    return {
      switchStyle,
      thumbStyle,
      handleChange,
    };
  },
};
</script>