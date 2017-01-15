import { styled } from 'styletron-react';

export const LayoutVertical = styled('div', ({ stretch, flex, ...rest }) => Object.assign({
  display: 'flex',
  flexDirection: 'column',
}, Boolean(stretch) && {
  alignSelf: 'stretch',
}, flex && {
  flex: 1,
}, rest));

export const LayoutHorizontal = styled('div', ({ stretch, center, flex }) => Object.assign({
  display: 'flex',
  flexDirection: 'row',
}, Boolean(stretch) && {
  alignSelf: 'stretch',
}, center && {
  alignItems: 'center',
}, flex && {
  flex,
}));

export const Flex1 = styled('span', {
  flex: '1',
});
