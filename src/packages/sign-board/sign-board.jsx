import { nextTick, onMounted, reactive, ref } from 'vue'
import props from './props';
import drawEvents from './drawEvent'

export default {
  name: 'CqcSignBoard',
  props,
  setup(props, { emit }) {
    const canvasRef = ref(null)
    let canvasW = ref(0)
    let canvasH = ref(0)
    let signBoard = ref(null)
    let control = ref(null)

    const {
      clear,
      getData
    } = drawEvents(props, canvasRef, canvasW, canvasH)
    const handleConfirm = () => {
      emit('getData', getData())
    }
    const style = reactive({
      width: props.width,
      height: props.height
    })
    
    onMounted(() => {
      nextTick(() => {
        canvasW.value = signBoard.value.clientWidth - 20;
        canvasH.value = signBoard.value.clientHeight - control.value.offsetHeight - 20;
      })
    })
    return () => (
      <div class="cqc-sign-board" style={style} ref={signBoard}>
        <canvas
          ref={canvasRef}
          width={canvasW.value}
          height={canvasH.value}
          class="cqc-sign-board-canvas"
        ></canvas>
        <div class="cqc-sign-board-control" ref={control}>
          <button onclick={clear}>清空</button>
          <span style='padding:4px'></span>
          <button class="primary" onclick={handleConfirm}>确定</button>
        </div>
      </div>
    )
  }
}