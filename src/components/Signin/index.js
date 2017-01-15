import React, { Component } from 'react';
import { Button, Input, Link } from '../../ui';
import { SiginContainer, loginBtn, inputStyles, RegisterText } from './SigninStyles';
import Register from '../Register';

export default class SignIn extends Component {
  props: {// eslint-disable-line
    login: ({email: string, password: string}) => any
  }

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
          onClick={() => login({ email, password })}
        >
          Login
        </Button>

        <RegisterText>Not a member? <Link to={'/register'}>Register</Link></RegisterText>
      </SiginContainer>
    );
  }
}