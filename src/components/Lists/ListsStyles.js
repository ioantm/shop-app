import React from  'react';
import { styled } from 'styletron-react';
import { Link } from 'react-router-dom';
import { BodyText } from '../../ui';

export const CustomLink = styled(Link, {
  textDecoration: 'none',
  flex: 1
});

export const LinkToList = ({ children, ...rest }) => (
  <CustomLink {...rest}>
    <BodyText>
      { children }
    </BodyText>
  </CustomLink>
)

