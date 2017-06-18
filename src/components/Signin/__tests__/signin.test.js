import React from 'react'
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import WithStyletron from '../../../shared/styletron/configure';
import Signin, { validate } from '../';
import * as validationErrors from '../../ValidationErrors'

test('render signin', () => {
  const signinTree = renderer.create(
    <MemoryRouter>
      <WithStyletron>
        <Signin />
      </WithStyletron>
    </MemoryRouter>
  )

  expect(signinTree).toMatchSnapshot()
})

test('validate check for required fields', () => {
  const errors = validate({
    email: '',
    password: '',
    touchedFields: {
      email: true,
      password: true
    }
  })

  expect(errors).toEqual({
    email: validationErrors.REQUIRED,
    password: validationErrors.REQUIRED
  })
})


test('validate return error for incorrect email', () => {
  const errors = validate({
    email: 'ioan',
    password: '',
    touchedFields: {
      email: true,
      password: true
    }
  })

  expect(errors).toEqual({
    email: validationErrors.INVALID_EMAIL,
    password: validationErrors.REQUIRED
  })
})
