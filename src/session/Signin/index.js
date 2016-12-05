import React from 'react';
import { Link } from 'react-router';
import { primary } from 'glamor/ous';
import { SessionContainer } from '../styles';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  loginHandler = () => {
    const { login } = this.props;
    
    login({
      email: this.state.email,
      password: this.state.password,
    });
  }

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <SessionContainer>
        <input
          placeholder="Enter email..." type="text"
          onChange={this.emailChangeHandler}
        />
        <input
          placeholder="Password" type="password"
          onChange={this.passwordChangeHandler}
        />
        <button {...primary} onClick={this.loginHandler}>SignIn</button>
        <p>or <Link to="/register">Register</Link></p>
      </SessionContainer>
    );
  }
}

SignIn.propTypes = {
  login: React.PropTypes.func.isRequired,
};
