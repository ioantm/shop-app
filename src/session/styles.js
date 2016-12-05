import React from 'react';
import { css } from 'glamor';
import { base } from 'glamor/ous';
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
  <div {...css(base, vertical, signin, stretch, flex)}>
    <div {...topSpace} />
    { children }
  </div>
);

SessionContainer.propTypes = {
  children: React.PropTypes.object,
};
