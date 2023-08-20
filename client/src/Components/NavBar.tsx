import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";

import { useAuth0 } from "@auth0/auth0-react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Navbar: FC = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const saveAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:8080/api/v1",
            scope: "read:current_user",
          },
        });

        localStorage.setItem("token", accessToken);
      } catch (error) {
        console.error("An error occured", error);
      }
    };

    saveAccessToken();
  }, [getAccessTokenSilently]);

  return (
    <nav className="NavContainer">
      <ul className="NavList">
        <li className="NavItem">
          <Link className="NavbarAppName" to="/">
            QuizGPT
          </Link>
        </li>
        <li className="NavItem">
          <Link className="NavLink" to="/quizzes">
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

        <li className="NavItem NavListRight">
          {isAuthenticated ? (
            <div className="NavButton">
              <LogoutButton />
            </div>
          ) : (
            <div className="NavButton">
              <LoginButton message="Log In" />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
