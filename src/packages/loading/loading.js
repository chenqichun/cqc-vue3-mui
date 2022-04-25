import { createApp, nextTick  } from "vue";
import loadingComponent from './loading.vue'

let instance;

export default {
  open(options = {}) {
    if (!instance) {
      const wrapper = document.createElement('div')
      const vm = createApp(loadingComponent)
      instance = vm.mount(wrapper)
      instance.wrapper = wrapper
    }
    if (instance.visible) return;
    instance.text = options.text || ""
    instance.mask = options.mask || true
    if (instance.wrapper) {
      document.body.appendChild(instance.wrapper)
    }
    nextTick(() => {
      instance.visible = true
    })
  },
  close() {
    if (instance) {
      instance.visible = false
    }
  }
}