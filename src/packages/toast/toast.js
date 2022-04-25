import { createApp, nextTick } from 'vue'
import ToastComponent from './toast.vue'

let currentInstance;

let getInstance = () => {
  let vm;
  if (currentInstance) return currentInstance;
  const wrapper = document.createElement('div')
  vm = createApp(ToastComponent)
  currentInstance = vm.mount(wrapper)
  currentInstance.unmount = vm.unmount.bind(vm)
  currentInstance.wrapper = wrapper;
  return currentInstance
}

let destory = function() {
  document.body.removeChild(this.wrapper)
  this.unmount()
  currentInstance = null;
}


let close = function() {
  this.visible = false;
  this.$el.addEventListener('transitionend', () => {
    this.closed = true;
    this._destory()
  })
}

const Toast = (options = {}) => {
  const instance = getInstance();
  instance.closed = false;
  instance._destory = destory.bind(instance)
  instance.close = close.bind(instance)
  clearTimeout(instance.timer)

  instance.message = typeof options === 'object' ? options.message : options
  instance.position = options.position || 'middle'
  instance.icon = options.icon || ''
  instance.className = options.className || ''
  const duration = options.duration || 2500

  document.body.appendChild(instance.wrapper)

  nextTick(() => {
    instance.visible = true;
    instance.timer = setTimeout(() => {
      if (instance.closed) return
      instance.close()
    }, duration);
  })

  return instance
}




export default Toast