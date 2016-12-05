// @flow
import React from 'react';
import { root } from './RootStyles';

const Root = (props) => 
(
  <div {...root}>{props.children}</div>
);

Root.propTypes = {
  children: React.PropTypes.any,
};

export default Root;
