import Progress from './progress.jsx'
import '../../styles/progress.scss'

Progress.install = app => app.component(Progress.name, Progress)
export default Progress
