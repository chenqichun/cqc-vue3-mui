import Slide from './slide'
import '../../styles/slide.scss'

Slide.install = app => app.component(Slide.name, Slide)

export default Slide