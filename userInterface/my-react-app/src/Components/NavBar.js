import React from 'react';
import '../Styles/NavBar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
  return (
    <nav className='NavContainer'>
      <ul className='NavList'>
        <li className='NavItem'>
          <a className='NavLink' href="/">Create Quiz</a>
        </li>
        <li className='NavItem'>
          <a className='NavLink' href="/about">Quizes</a>
        </li>
        <li className='NavItem'>
          <a className='NavLink' href="/services">Export</a>
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
