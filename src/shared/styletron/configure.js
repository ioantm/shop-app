// @flow
import React from 'react';
import Styletron from 'styletron-client';
import {StyletronProvider} from 'styletron-react';

function styletronConfig() {
  if (styletronConfig.styletron) {
    return styletronConfig.styletron;
  }

  const styleSheet = document.createElement('style');
  document.head.appendChild(styleSheet);
  return styletronConfig.styletron = new Styletron([styleSheet]);
}

type PropsType = {
  children: Children
};

const WithStyletron = ({ children }: PropsType) => (
  <StyletronProvider styletron={styletronConfig()}>
    {children}
  </StyletronProvider>
);

export default WithStyletron;
