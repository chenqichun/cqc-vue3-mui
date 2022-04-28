
import { nextTick, onBeforeUnmount, onMounted } from 'vue'

export default function drawEvents(props, canvasRef, width, height) {
  let canMove = false;
  let cavClientLeft, cavClientTop, canvas, ctx;
  const { lineWidth, strokeStyle, lineCap, lineDash, doubleLine, miniType, canvasBg } = props

  function setCanvasStyle(ctx) {
    if (canvasBg) {
      ctx.fillStyle = canvasBg
      ctx.fillRect(0, 0, width.value, height.value)
    }
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle
    ctx.lineCap = lineCap
    if (lineDash[0] > 0 || lineDash[1] > 0) {
      ctx.setLineDash(lineDash)
    }
  }
  function draw(ctx, x, y) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  function drawStart(ctx, x, y) {
    doubleLine && ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
  function drawEnd(ctx) {
    canMove = false
    if (doubleLine) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = parseInt(lineWidth / 3)
      ctx.stroke()
      ctx.restore()
    }
  }
  function clear() {
    ctx.clearRect(0, 0, width.value, height.value)
  }
  function preview() {
    const baseImg = canvasRef.value.toDataURL(miniType);
  }
  function getData() {
    return canvasRef.value.toDataURL(miniType);
  }

  const touchstart = (e) => {
    canMove = true;
    cavClientLeft = canvas.getBoundingClientRect().left
    cavClientTop = canvas.getBoundingClientRect().top
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    drawStart(ctx, clientX - cavClientLeft, clientY - cavClientTop)
  }

  const touchmove = e => {
    if (!canMove) return;
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    draw(ctx, clientX - cavClientLeft, clientY - cavClientTop)
  }

  const touchend = () => {
    drawEnd(ctx)
  }

  const eventMap = {
    touchstart,
    touchmove,
    touchend,
    mousedown: touchstart,
    mousemove: touchmove,
    mouseup: touchend,
  };

  function init() {
    canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    setCanvasStyle(ctx)
    Object.entries(eventMap).forEach(([key, event]) => {
      canvas.addEventListener(key, event);
    });
    window.addEventListener("mouseup", touchend);
  }
  onBeforeUnmount(() => {
    Object.entries(eventMap).forEach(([key, event]) => {
      canvas.removeEventListener(key, event);
    });
    window.removeEventListener("mouseup", touchend);
  }) 

  onMounted(() => {
    nextTick(() => {
      setTimeout(() => {
        init()
      }, 200);
    })
  })

  return {
    clear,
    preview,
    getData
  }
}