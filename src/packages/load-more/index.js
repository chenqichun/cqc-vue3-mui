import LoadMore from './load-more.vue'
import '../../styles/load-more.scss'

LoadMore.install = app => app.component(LoadMore.name, LoadMore)

export default LoadMore