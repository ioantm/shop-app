import React from 'react';
import { styled } from 'styletron-react';
import { Title } from '../../ui';

export const ListContainer = styled('div', {
  display: 'flex',
  flex: '1',
  overflow: 'auto',
  flexDirection: 'column'
});

export const ItemText = styled('p',{
// flex: 1;
});

export const ListTitle = styled(Title, {});

export const StyledCheckbox = styled(props => <input type="checkbox" {...props} />, {
  // margin-right: 10px;
});
