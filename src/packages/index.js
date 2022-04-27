import './base'
import Toast from './toast'
import Loading from './loading'
import LoadMore from './load-more'
import infiniteScroll from './infinite-scroll'
import Range from './range'
import Switch from './switch'
import Progress from './progress'
import Scroll from './scroll'
import Slide from './slide'
import SignBoard from './sign-board'

const plugins = [
  LoadMore,
  Range,
  Switch,
  Progress,
  Scroll,
  Slide,
  SignBoard
]

const install = app => {
  plugins.forEach(plugin => app.use(plugin))
}


export default install


export {
  Toast,
  Loading,
  LoadMore,
  infiniteScroll,
  Range,
  Switch,
  Progress,
  Scroll,
  Slide,
  SignBoard
}


