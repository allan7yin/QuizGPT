import React from 'react';
import '../Styles/NavBar.css'

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
          <a className='NavLink' href="https://github.com/allan7yin/QuizGenerationAppGPT" target="_blank">Source</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
