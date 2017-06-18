import renderer from 'react-test-renderer';
import React from 'react';
import { createBrowserHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import Register, { validate } from '../';
import WithStyletron from '../../../shared/styletron/configure';
import * as validationErrors from '../../validationErrors';

it('render register', () => {
  const registerTree = renderer.create(
    <MemoryRouter>
      <WithStyletron>
        <Register history={createBrowserHistory()} />
      </WithStyletron>
    </MemoryRouter>
  ).toJSON();
  expect(registerTree).toMatchSnapshot();
});


test('register validate all fields are required', () => {
  const fields = {
    email: '',
    password: '',
    confirmPassword: '',
    touchedFields: {
      email: true,
      password: true,
      confirmPassword: true
    }
  }
  const requiredString = 'This field is required';

  expect(validate(fields)).toEqual({
    email: requiredString,
    password: requiredString,
    confirmPassword: requiredString
  })
})

test('register validate email', () => {
  const fields = {
    email: 'ioan',
    password: 'password',
    confirmPassword: 'password',
    touchedFields: {
      email: true,
      password: true,
      confirmPassword: true
    }
  }


  expect(validate(fields)).toMatchObject({
    email: validationErrors.INVALID_EMAIL
  })
})

test('register validate password length', () => {
  const fields = {
    email: 'ioan',
    password: 'pass',
    confirmPassword: 'pass',
    touchedFields: {
      email: true,
      password: true,
      confirmPassword: true
    }
  }


  expect(validate(fields)).toMatchObject({
    password: validationErrors.MIN_6_CHARACTERS
  })
})

test('if a field is not touched should not be validated', () => {
  const fields = {
    email: '',
    password: '',
    confirmPassword: '',
    touchedFields: {
      email: false,
      password: false,
      confirmPassword: false
    }
  }

  expect(validate(fields)).toMatchObject({
    email: '',
    password: '',
    confirmPassword: ''
  })
})

test('password should match confirm password', () => {
  const fields = {
    email: '',
    password: 'password',
    confirmPassword: 'password1',
    touchedFields: {
      email: false,
      password: true,
      confirmPassword: true
    }
  }

  expect(validate(fields)).toMatchObject({
    email: '',
    password: '',
    confirmPassword: validationErrors.PASSWORD_NOT_MATCH
  })
})
