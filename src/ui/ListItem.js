import { styled } from 'styletron-react';
import { listItemTheme } from './theme';

export default styled('div', ({ isFirst, ...rest }) => 
  Object.assign({}, listItemTheme, !isFirst && { borderTop: 'none', rest }),
);
