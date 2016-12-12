import React, { Component } from 'react';
import { style } from 'glamor';
import { button, primary } from 'glamor/ous';

export default class SignIn extends Component
  changeHandler = name => (e) => {
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input 
          onChange={changeHandler('email')}>
        </input>
        <input
          type="password"
          onChange={changeHandler('password')}>
        </input>
        <button>SignIn</button>
      </div>
    )
  }
}