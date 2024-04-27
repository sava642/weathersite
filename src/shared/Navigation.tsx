import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
margin: 20px;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    margin-right: 20px;
  }

  a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }

    &.active {
      border-bottom: 2px solid #007bff;
    }
  }
`;

const Navigation: React.FC = () => {
  return (
    <Nav>
      <ul>
        <li>
          <StyledNavLink to="/">Weather today</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/about">About us</StyledNavLink>
        </li>
      </ul>
    </Nav>
  );
}

const StyledNavLink = styled(NavLink)`
  &.active {
    border-bottom: 2px solid #007bff;
  }
`;

export default Navigation;



