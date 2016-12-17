import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Input, Link } from '../../ui';
import { SiginContainer, loginBtn, inputStyles, RegisterText } from './SigninStyles';
import Register from '../Register';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeHandler = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    const { email, password } = this.state;
    const { login } = this.props;

    return (
      <SiginContainer className="root">
        <Input
          placeholder="Enter email"
          styles={inputStyles}
          onChange={this.changeHandler('email')}
        />
        <Input
          styles={inputStyles}
          placeholder="Enter password"
          type="password"
          onChange={this.changeHandler('password')}
        />
        <Button
          primary
          styles={loginBtn}
          onClick={() => login({ email, password }).then(() => {
            this.props.getLists();
          })}
        >
          Login
        </Button>

        <RegisterText>Not a member? <Link to={'/register'}>Register</Link></RegisterText>
      </SiginContainer>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};


export default connect(null, actions)(SignIn);


