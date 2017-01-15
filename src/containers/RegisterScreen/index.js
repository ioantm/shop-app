import { connect } from 'react-redux';
import Register from '../../components/Register';
import { registerRequest } from '../../store/session/actions';

const mapDispatchToProps = dispatch => ({
  register: userData => dispatch(registerRequest(userData)),
});

export default connect(null, mapDispatchToProps)(Register);
