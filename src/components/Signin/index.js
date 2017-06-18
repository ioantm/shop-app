// @flow
import React, { Component } from 'react';
import { SessionContainer } from '../styles';
import { RegisterText, RegisterLink, LoginButton, SigninTitle } from './SigninStyles';
import { FormField, Input } from '../../ui';
import * as validationErrors from '../ValidationErrors';
import FormWithError from '../FormComponents/FormError';

type SigninFields = {
  email: string,
  password: string
};

type TouchedState = {
  email: boolean,
  password: boolean
};

type State = {
  email: string,
  password: string,
  touchedFields: {
    email: boolean,
    password: boolean
  }
};

type Props = {
  login: ({
    email: string,
    password: string
  }) => void
};

export const validate = ({
  email,
  password,
  touchedFields
}: SigninFields & { touchedFields: TouchedState }): {
  email: ?string,
  password: ?string
} => {
  const validateRequired = (field: string) =>
    field ? '' : validationErrors.REQUIRED;
  const validateEmail = (emailStr: string) => {
    if (
      !emailStr.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      return validationErrors.INVALID_EMAIL;
    }
    return null;
  };

  const minChars = len => str =>
    str.length < len ? validationErrors.MIN_6_CHARACTERS : '';
  const min6 = minChars(6);
  const isTouched = field => touchedFields[field];

  return {
    email:
      (isTouched('email') &&
        (validateRequired(email) || validateEmail(email))) ||
        '',
    password:
      (isTouched('password') &&
        (validateRequired(password) || min6(password))) ||
        ''
  };
};

const WithErrorInput = FormWithError(Input);

export default class SignIn extends Component<void, Props, State> {
  state = {
    email: '',
    password: '',
    touchedFields: {
      email: false,
      password: false
    }
  };

  changeHandler = (e: SyntheticInputEvent) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginClickHandler = () => {
    this.setState(
      {
        touchedFields: {
          email: true,
          password: true
        }
      },
      () => {
        const errors = validate(this.state);
        const areErrors = errObj =>
          Object.keys(errObj)
            .map(key => errors[key])
            .some(Boolean);

        if (!areErrors(errors)) {
          this.props.login({
            email: this.state.email,
            password: this.state.password
          });
        }
      }
    );
  };

  render() {
    const errors = validate(this.state);

    return (
      <SessionContainer>
        <SigninTitle center>Sign in to Shopping List</SigninTitle>
        <FormField>
          <WithErrorInput
            error={errors.email}
            placeholder="Enter email"
            name="email"
            onChange={this.changeHandler}
          />
        </FormField>
        <FormField>
          <WithErrorInput
            error={errors.password}
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
