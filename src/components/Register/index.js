import React, { Component } from 'react';
import { SessionContainer } from '../styles';
import { Title, Button, Input, Link } from '../../ui';


export default class Register extends Component {
  props: {
    register: () => any,
  }

  inputHandler = name => value => this.setState({ [name]: value })
  emailHandler = this.inputHandler('email')
  passwordHandler = this.inputHandler('password')
  confirmPasswordHandler = this.inputHandler('confirmPassword')
  registerHandler = () =>
    this.props.register({
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    })

  render() {
    return (
      <SessionContainer>
        <Title center>Register</Title>
        <Input
          onChange={this.emailHandler}
          placeholder="Enter email"
        />
        <Input
          onChange={this.passwordHandler}
          placeholder="Enter password"
          type="password"
        />
        <Input
          onChange={this.confirmPasswordHandler}
          placeholder="Retype password"
          type="password"
        />
        <Button
          raised
          primary
          onClick={this.registerHandler}
          style={{ marginBottom: '20px' }}
        >
          Register
        </Button>
        <Link href="/signin">Signin</Link>
      </SessionContainer>
    );
  }
}
