import styled from 'styled-components';

export default styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.15);
  border-top: ${props => props.isFirst ? '1px solid rgba(0,0,0,0.15)' : 'none'};
  padding: 12px 24px;
  display: flex;
  flex: none;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  font-family: ${props => props.theme.fontFamily};
`
