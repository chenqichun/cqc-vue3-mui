import './base'
import Toast from './base'
import Loading from './loading'
import LoadMore from './load-more'
import infiniteScroll from './infinite-scroll'
import Range from './range'

const plugins = [
  LoadMore,
  Range
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
  Range
}


