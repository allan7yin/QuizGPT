import React from 'react';
import '../Styles/NavBarDarkMode.css'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ darkMode, onToggleDarkMode }) => {
  return (
    <nav className='NavContainer'>
      <ul className='NavList'>
        <li className='NavItem'>
          <Link className='NavLink' to="/">Create Quiz</Link>
        </li>
        <li className='NavItem'>
          <Link className='NavLink' to="/about">Quizes</Link>
        </li>
        <li className='NavItem'>
          <Link className='NavLink' to="/services">Export</Link>
        </li>
        <li className='NavItem'>
          <a className='NavLink' href="https://github.com/allan7yin/QuizGenerationAppGPT" target="_blank">
          <FontAwesomeIcon icon={faGithub} className="Icon" /> Source
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
