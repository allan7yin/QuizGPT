import { FC } from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBarDarkMode.css";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar: FC = () => {
  return (
    <nav className="NavContainer">
      <ul className="NavList">
        <li className="NavItem">
          <Link className="NavLink" to="/">
            Create Quiz
          </Link>
        </li>
        <li className="NavItem">
          <Link className="NavLink" to="/about">
            Quizzes
          </Link>
        </li>
        <li className="NavItem">
          <Link className="NavLink" to="/services">
            Export
          </Link>
        </li>
        <li className="NavItem">
          <a
            className="NavLink"
            href="https://github.com/allan7yin/QuizGenerationAppGPT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="Icon" /> Source
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
