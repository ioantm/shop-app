// @flow

import React from 'react';
import { vertical, stretch, flex } from '../styles/layout';

export const signin = css({
  width: '30%',
  minWidth: '250px',
  maxWidth: '350px',
});

export const topSpace = css({
  height: '50px',
});

export const SessionContainer = ({ children }) => (
  <div>
    { children }
  </div>
);

SessionContainer.propTypes = {
  children: React.PropTypes.any,
};
