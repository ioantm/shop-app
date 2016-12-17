import React, { PropTypes } from 'react';
import { injectStyle } from 'styletron-utils';
import { Link } from 'react-router';
import { linkStyles } from './theme';

const StyledLink = ({ children, ...rest }, { styletron }) => {
  const classes = injectStyle(styletron, linkStyles);
  return (
    <Link
      className={classes}
      {...rest}
    >
      {children}
    </Link>
  );
};

StyledLink.contextTypes = { styletron: PropTypes.object };

StyledLink.propTypes = {
  children: PropTypes.node,
};

export default StyledLink;
