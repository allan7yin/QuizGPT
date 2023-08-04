import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: 201F24;
  color: #fff;
  padding: 20px;
  justify-content: center;
  font-family: 'Overpass', sans-serif;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  padding: 0 10px;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 8px;
  border-radius: 5px;
  transition: background-color 0.3s; /* Add a transition for smooth hover effect */

  &:hover {
    background-color: #ff6347; /* Change the background color on hover */
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink href="/">Create Quiz</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">Quizes</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/services">Export</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/allan7yin/QuizGenerationAppGPT" target="_blank">Source</NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navbar;
