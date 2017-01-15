import React from 'react'; //eslint-disable-line
import { connect } from 'react-redux';
import SignIn from '../../components/Signin';
import { loginRequest } from '../../store/session/actions';

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(loginRequest(credentials)),
});
export default connect(null, mapDispatchToProps)(SignIn);


