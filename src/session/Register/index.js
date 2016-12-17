import React, { Component } from 'react';
import { Link } from 'react-router';
import { Input, Button } from '../../ui';
import { RegisterContainer, RegisterTitle } from './RegisterStyles';

export default function Register() {
  return (
    <RegisterContainer>
      <RegisterTitle>Register</RegisterTitle>
      <Input
        placeholder="Enter email"
      />
      <Input
        placeholder="Enter password"
        type="password"
      />

      <Button 
        styles={{ alignSelf: 'center', marginTop: '20px' }}
        primary>Register</Button>
    </RegisterContainer>
  );
}
