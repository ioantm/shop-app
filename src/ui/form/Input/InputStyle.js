import styled from 'styled-components';

export const InputContainer = styled.div`
  border: 1px solid ${props =>
  props.focused ? props.theme.inputFocusColor : 'rgba(0,0,0,0.15)'};
  padding: 6px 24px;
  background: white;
  display: flex;
  cursor: text;
  marginBottom: 10px;
  color: #333;
`;

export const StyledInput = styled.input`
  fontFamily: ${props => props.theme.fontFamily};
  height: 36px;
  flex: 1;
  border: none;
  fontSize: 1rem;
  lineHeight: 1.5;
  backgroundColor: transparent;
  outline: none;
`;
