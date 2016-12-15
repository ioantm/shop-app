import React, { Component, PropTypes } from 'react';

export default class SignIn extends Component {
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
      <div>
        <input
          onChange={this.changeHandler('email')}
        />
        <input
          type="password"
          onChange={this.changeHandler('password')}
        />
        <button
          onClick={() => login({ email, password }).then(() => {

            this.props.getLists();
          })}
        >
          SignIn
        </button>
      </div>
    )
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};


