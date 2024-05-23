import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../app/reducers';

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
  let path = null
  const currentCityName = useSelector((state: RootState) => state.weather.name);
  const currentCityLon = useSelector((state: RootState) => state.weather.lon);
  const currentCityLat = useSelector((state: RootState) => state.weather.lat);
  if (currentCityName && currentCityLon && currentCityLat) {
    path = `/city/${currentCityName}/${currentCityLat}/${currentCityLon}`;
  }
  return (
    <Nav>
      <ul>
        <li>
          <StyledNavLink to={path ? path : "/"}>Weather today</StyledNavLink>
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



