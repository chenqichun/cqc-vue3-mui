
import { nextTick, onMounted } from 'vue'

export default function drawEvents(props, canvasRef, width, height) {
  let flag = true;
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
    if (!flag) return false;
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  function drawStart(ctx, x, y) {
    doubleLine && ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, y)
    flag = true;
  }
  function drawEnd(ctx) {
    if (doubleLine) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = parseInt(lineWidth / 3)
      ctx.stroke()
      ctx.restore()
    }
    flag = false;
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

  function onmousedown(e) {
    cavClientLeft = canvas.getBoundingClientRect().left
    cavClientTop = canvas.getBoundingClientRect().top
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    drawStart(ctx, clientX - cavClientLeft, clientY - cavClientTop)
    canvas.onmousemove = canvas.ontouchmove = e => {
      if (!flag) return;
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let clientY = e.touches ? e.touches[0].clientY : e.clientY;
      draw(ctx, clientX - cavClientLeft, clientY - cavClientTop)
    }
    window.addEventListener('mouseup', () => {
      drawEnd(ctx)
    })
    window.addEventListener('touchend', () => {
      drawEnd(ctx)
    })
  }

  function init() {
    canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    setCanvasStyle(ctx)
    canvas.onmousedown = canvas.ontouchstart = onmousedown
  }

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