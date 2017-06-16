import renderer from 'react-test-renderer';
import React from 'react';
import { createBrowserHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import Register from '../';
import WithStyletron from '../../../shared/styletron/configure';

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
