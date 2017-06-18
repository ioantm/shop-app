// @flow
import React, { Component } from 'react';
import { SessionContainer } from '../styles';
import { Title, Button, Input, Link, FormField } from '../../ui';
import * as validationErrors from '../ValidationErrors';
import FormWithError from '../FormComponents/FormError';

type RegisterFields = {
  email: string,
  password: string,
  confirmPassword: string
};

type TouchedState = {
  email: boolean,
  password: boolean,
  confirmPassword: boolean
};

type State = {
  email: string,
  password: string,
  confirmPassword: string,
  touchedFields: TouchedState
};

type Props = {
  register: ({
    email: string,
    password: string,
    confirmPassword: string
  }) => void
};

export const validate = ({
  email,
  password,
  confirmPassword,
  touchedFields
}: RegisterFields & { touchedFields: TouchedState }): {
  email: ?string,
  password: ?string,
  confirmPassword: ?string
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
  const passwordMatch = () =>
    password === confirmPassword ? '' : validationErrors.PASSWORD_NOT_MATCH;

  return {
    email:
      (isTouched('email') &&
        (validateRequired(email) || validateEmail(email))) ||
        '',
    password:
      (isTouched('password') &&
        (validateRequired(password) || min6(password))) ||
        '',
    confirmPassword:
      (isTouched('confirmPassword') &&
        (validateRequired(confirmPassword) ||
          min6(password) ||
          passwordMatch())) ||
        ''
  };
};

const WithErrorInput = FormWithError(Input);

export default class Register extends Component<void, Props, State> {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    touchedFields: {
      email: false,
      password: false,
      confirmPassword: false
    }
  };

  inputHandler = (name: string) => (event: SyntheticInputEvent) =>
    this.setState({ [name]: event.target.value });
  handleOnBlur = (name: string) =>
    this.setState({
      touchedFields: Object.assign({}, this.state.touchedFields, {
        [name]: true
      })
    });
  emailHandler = this.inputHandler('email');
  passwordHandler = this.inputHandler('password');
  confirmPasswordHandler = this.inputHandler('confirmPassword');

  registerHandler = () => {
    this.setState(
      {
        touchedFields: {
          email: true,
          password: true,
          confirmPassword: true
        }
      },
      () => {
        const errors = validate(this.state);
        const areErrors = errObj =>
          Object.keys(errObj).map(key => errors[key]).some(Boolean);

        if (!areErrors(errors)) {
          this.props.register({
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
          });
        }
      }
    );
  };

  render() {
    const errors = validate(this.state);

    return (
      <SessionContainer>
        <Title center>Register</Title>
        <FormField>
          <WithErrorInput
            key="email"
            error={errors.email}
            value={this.state.email}
            onChange={this.emailHandler}
            placeholder="Email"
            type="text"
          />
        </FormField>
        <FormField>
          <WithErrorInput
            key="password"
            error={errors.password}
            onChange={this.passwordHandler}
            value={this.state.password}
            placeholder="Enter password"
            type="password"
          />
        </FormField>
        <FormField>
          <WithErrorInput
            key="confirmPassword"
            error={errors.confirmPassword}
            onChange={this.confirmPasswordHandler}
            value={this.state.confirmPassword}
            placeholder="Retype password"
            type="password"
          />
        </FormField>
        <Button
          primary
          onClick={this.registerHandler}
          style={{ marginBottom: '20px' }}
        >
          Register
        </Button>
        <Link to="/signin">Signin</Link>
      </SessionContainer>
    );
  }
}
