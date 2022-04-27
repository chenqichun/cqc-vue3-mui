import SignBoard from './sign-board.jsx';
import '../../styles/sign-board.scss';

SignBoard.install = app => app.component(SignBoard.name, SignBoard)

export default SignBoard