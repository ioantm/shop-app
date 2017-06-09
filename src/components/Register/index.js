// @flow
import React, { Component } from 'react';
import { SessionContainer } from '../styles';
import { Title, Button, Input, Link, FormField } from '../../ui';

type State = {
    email: string,
    password: string,
    confirmPassword: string
};

type Props = {
  register: ({ email: string, password: string, confirmPassword: string }) => void,
}

type ValidationPrdicate = (text: ?string) => boolean;
type ValidationItem = [ValidationPrdicate, string];

const validateEmail: ValidationPrdicate = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email || !re.test(email);
};
const validateIsEmpty: ValidationPrdicate = text => !text || text.length === 0;
const validateLength: (number => ValidationPrdicate) = minLength => text => !text || text.length < minLength;

type ValidateInputProps<T> = T & {
  validations: Array<[ValidationItem]>
}

type Validations = {
  validations: Array<[ValidationItem]>
}

const ValidatedInput = (props: ValidateInputProps<*>) => (
  <div>
    {props.children}
  </div>
);

const WithValidation = <T: *>(InputComponent: ReactClass<T>): ReactClass<T & Validations> =>
  () => (
    <InputComponent />
  );

type InjectedProps = {
  trackingID: string;
}


function withTrackingID<T: *>(BaseComponent: React.Component<T>): React.Component<T & InjectedProps> {
  return (
    class extends React.Component {
      static displayName = `withTrackingID(${BaseComponent.displayName || BaseComponent.name})`;
      render() {
        return (
          <div />
        );
      }
    }
  );
}

type TestProps = {
  test: string
};

class Test extends React.Component<void, TestProps, void> {
  render() {
    console.log('hmm', this.props.test);
    return (<div>test</div>);
  }
}

const InputWithValidation = withTrackingID(Test);

export default class Register extends Component<void, Props, State> {
  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  inputHandler = (name: string) => (event: SyntheticInputEvent) =>
    this.setState({ [name]: event.target.value });
  emailHandler = this.inputHandler('email');
  passwordHandler = this.inputHandler('password');
  confirmPasswordHandler = this.inputHandler('confirmPassword');

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
        <FormField>
          <InputWithValidation
            onChange={this.emailHandler}
            placeholder="Enter email"
          />
        </FormField>
        <FormField>
          <Input
            onChange={this.passwordHandler}
            placeholder="Enter password"
            type="password"
          />
        </FormField>
        <FormField>
          <Input
            onChange={this.confirmPasswordHandler}
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
