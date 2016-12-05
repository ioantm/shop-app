import { connect } from 'react-redux';
import Register from './Register';
import { register } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  register: userData => dispatch(register(userData)),
});

export default connect(null, mapDispatchToProps)(Register);
