import Toast from './base'
import './base'
import LoadMore from './load-more'

const plugins = [
  LoadMore
]

const install = Vue => {
  plugins.forEach(plugin => Vue.use(plugin))
}

export default install


export {
  LoadMore
}


