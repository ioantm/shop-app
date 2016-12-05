import React from 'react';
import { primary } from 'glamor/ous';
import { SessionContainer } from './styles';

class Register extends React.Component {
  inputHandler = prop => e => this.setState({ [prop]: e.target.value });
  registerHandler = () => this.props.register({
    email: this.state.email,
    password: this.state.password,
    confirmPassword: this.state.confirmPassword,
  });

  render() {
    return (
      <SessionContainer>
        <input
          placeholder="Enter email..." type="text"
          onChange={this.inputHandler('email')}
        />
        <input
          placeholder="Password" type="password"
          onChange={this.inputHandler('password')}
        />
        <input
          placeholder="Password confirm" type="password"
          onChange={this.inputHandler('confirmPassword')}
        />
        <button {...primary} onClick={this.registerHandler}>Register</button>
      </SessionContainer>
    );
  }
}

Register.propTypes = {
  register: React.PropTypes.func,
};

export default Register;
