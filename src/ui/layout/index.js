import { styled } from 'styletron-react';

const layoutDefaults = {
  alignSelf: 'auto',
  justifyContent: 'flex-start',
  flex: '0 1 auto',
  alignItems: 'stretch'
};

export const LayoutVertical = styled('div', ({
  alignSelf,
  flex,
  justifyContent
} = layoutDefaults) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf,
  flex,
  justifyContent
}));

export const LayoutHorizontal = styled('div', ({
  alignSelf,
  flex,
  justifyContent,
  alignItems
} = layoutDefaults) => ({
  display: 'flex',
  flexDirection: 'row',
  flex,
  justifyContent,
  alignItems,
  alignSelf
}));

export const Flex1 = styled('span', { flex: 1});
