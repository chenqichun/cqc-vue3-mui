export function getScrollEventTarget(element) {
  let currentNode = element;
  while(currentNode && currentNode.tagName !== 'HTML' &&
   currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
     let overflowY = window.getComputedStyle(currentNode).overflowY;
     if (overflowY === 'auto' || overflowY === 'scroll') {
       return currentNode
     }
     currentNode = currentNode.parentNode
   }
   return window
}

export function getScrollTop(element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }
  return element.scrollTop
}

export function throttle(func, delay = 50) {
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