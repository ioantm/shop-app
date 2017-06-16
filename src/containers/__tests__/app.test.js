import renderer from 'react-test-renderer';
import React from 'react';
import App from '../App';
import configureStore from '../../store/configureStore';
import WithStyletron from '../../shared/styletron/configure';


it('render  App', () => {
  const appTree = renderer.create(
    <WithStyletron>
      <App store={configureStore()} />
    </WithStyletron>
  );
  expect(appTree).toMatchSnapshot();
});
