import React from  'react';
import { styled } from 'styletron-react';
import { Link } from 'react-router-dom';
import { BodyText, Title, Icon } from '../../ui';

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
);

export const ItemText = styled(Title, {
  marginBottom: '0!important'
});

export const ListItem = styled('div', {
  background: 'white',
  marginBottom: '10px',
  borderRadius: '4px',
  height: '60px',
  display: 'flex',
  padding: '10px'
});

export const DeleteIcon = styled(Icon, {
});
