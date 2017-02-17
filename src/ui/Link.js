import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default styled(Link)`
  ${({theme}) => `
    color: ${theme.primaryColor},
    font-size: 1.1875rem;
    line-height: 24px;
    font-weight: 600;
    font-family: ${theme.fontFamily};
    text-decoration: none;
    `}
`
