import React, { Component } from "react";
import { SessionContainer } from "../styles";
import { RegisterText, RegisterLink, LoginButton } from "./SigninStyles";
import { Title, FormField, Input } from "../../ui";

export default class SignIn extends Component {
  props: {
    login: ({ email: string, password: string }) => any
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginClickHandler = () =>
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });

  render() {
    return (
      <SessionContainer>
        <Title center>Sign in</Title>
        <FormField>
          <Input
            placeholder="Enter email"
            name="email"
            onChange={this.changeHandler}
          />
        </FormField>
        <FormField>
          <Input
            placeholder="Enter password"
            name="password"
            type="password"
            onChange={this.changeHandler}
          />
        </FormField>
        <FormField>
          <LoginButton primary onClick={this.loginClickHandler}>
            Login
          </LoginButton>
        </FormField>
        <RegisterText>
          <span>Not a member? </span>
          {" "}
          <RegisterLink to="/register">Register</RegisterLink>
        </RegisterText>
      </SessionContainer>
    );
  }
}
