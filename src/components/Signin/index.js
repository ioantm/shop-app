import React, { Component } from 'react';
import { SessionContainer } from '../styles';
import { RegisterText, RegisterLink, LoginButton, SigninTitle } from './SigninStyles';
import { FormField, Input } from '../../ui';

export default class SignIn extends Component {
  props: {
    login: ({ email: string, password: string }) => any
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginClickHandler = () => this.props.login({
    email: this.state.email,
    password: this.state.password
  });

  render() {
    return (
      <SessionContainer>
        <SigninTitle center>Sign in to Shopping List</SigninTitle>
        <FormField>
          <Input
            placeholder="Enter email"
            name="email"
            onChange={this.changeHandler}
          />
        </FormField>
        <FormField>
          <Input
            placeholder="Enter password"
            name="password"
            type="password"
            onChange={this.changeHandler}
          />
        </FormField>

        <LoginButton primary onClick={this.loginClickHandler}>
          Login
        </LoginButton>

        <RegisterText>
          Not a member?
          <RegisterLink to="/register">Register</RegisterLink>
        </RegisterText>
      </SessionContainer>
    );
  }
}
