import styled from 'styled-components';

export const LayoutVertical = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${({stretch}) => stretch ? 'stretch' : 'auto'};
  flex: 1;
`;

export const LayoutHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  flex: ${props => props.flex || 'none'};
  align-self: ${({stretch}) => stretch ? 'stretch' : 'auto'};
  align-items: ${({center}) => center ? 'center' : 'stretch'};
`;

export const Flex1 = styled.span`
  flex: 1;
`;
