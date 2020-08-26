import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system'

const Sidebar = styled.div`
  ${({theme})=>`
    background-color: ${theme.interface.background};
    color: ${theme.interface.textColor};
    font-family: ${theme.fonts.sans};
  `}
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  ${space}
`
export default Sidebar;
