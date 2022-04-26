
const attributes = {
  delay: {
    default: 100
  },
  immediate: {
    default: true
  },
  disabled: {
    default: false
  },
  distance: {
    default: 10
  }
}

const scoped = 'infinite-scroll'

var getScrollOptions = function (el, vm) {
  return Object.entries(attributes).reduce((map, [key, option]) => {
    let defaultValue = option.default;
    let value = el.getAttribute(`infinite-scroll-${key}`);
    if (value) {
      value = vm[value] !== undefined ? vm[value] : value
    } else {
      value = defaultValue
    }
    map[key] = ['delay','distance'].includes(key) ? +value : value
    return map
  }, {})
}

var getScrollContainer = function (element) {
  let currentNode = element;
  while (document.documentElement !== currentNode) {
    let overflowY = window.getComputedStyle(currentNode).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

var scrollEvent = function (cb) {
  const { container, el, vm, options, observer } = this[scoped]
  let {disabled} = getScrollOptions(el, vm);
  if (disabled) return;
  if (container.scrollHeight - container.scrollTop - container.clientHeight < options.distance) {
    cb()
  } else {
    if (observer) {
      observer.disconnect()
      this[scoped].observer = null
    }
  }
}



function throttle(func, delay = 50) {
   let timer = null;
  return function (...args) {
    if (timer === null) {
      func.apply(this, args)
      timer = 0
      return;
    }
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = 0;
    }, delay);
  }
}

export default {
  name: 'infinite-scroll',
  mounted(el, bingding, vnode) {
    const cb = bingding.value;
    const vm = bingding.instance;
    const container = getScrollContainer(el)

    if (container !== window) {
      let options = getScrollOptions(el, vm)
      const onscorll = throttle(scrollEvent.bind(el, cb), options.delay)
      container.addEventListener('scroll', onscorll)
      el[scoped] = {
        onscorll,
        container,
        options,
        el,
        vm
      }

      if (options.immediate) {
        const observer = el[scoped].observer = new MutationObserver(onscorll)
        observer.observe(container, {
          childList: true,
          subtree: true
        })
        onscorll()
      }
    }
  },
  unmounted(el) {
    const {
      container,
      onscorll
    } = el[scoped]
    container.removeEventListener('scroll', onscorll)
    el[scoped] = null
  }
}