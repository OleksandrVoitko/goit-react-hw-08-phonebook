import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.header`
  padding: 0px 40px;
`;

export const Link = styled(NavLink)`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;

  display: inline-block;
  padding: 12px;

  color: #2a363b;

  &.active {
    color: #2196f3;
  }
`;