import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Input, Button } from '../../ui';
import { RegisterContainer, RegisterTitle } from './RegisterStyles';
import * as actions from '../../actions';

class Register extends Component {
  inputHandler = name => e => this.setState({ [name]: e.target.value })
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
      <RegisterContainer>
        <RegisterTitle>Register</RegisterTitle>
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
          onClick={this.registerHandler}
          styles={{ alignSelf: 'center', marginTop: '20px' }}
          primary
        >
          Register
        </Button>
      </RegisterContainer>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, actions)(Register);
