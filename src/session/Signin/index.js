import React, { Component, PropTypes } from 'react';
import { styled } from 'styletron-react';
import { Button } from '../../ui';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('props', this.props);
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
        <Button
          onClick={() => login({ email, password }).then(() => {

            this.props.getLists();
          })}
        >
          SignIn
        </Button>
      </div>
    )
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};


