import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const [authState, setAuthState] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["Auth"]);
  const getauth = localStorage.getItem("Auth");
  const getUserID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const logout = () => {
    setAuthState(false);
    localStorage.clear();
    removeCookie("Auth");
    navigate("/");
  };
  useEffect(() => {
    if (getauth) {
      setAuthState(getauth);
    }
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          React Blog Project
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to={authState ? "/#" : "/sign-in"}
                onClick={logout}
              >
                {authState ? "Logout" : "Login"}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/sign-up"}>
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/user/${getUserID}`}>
                My Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={authState ? "/addPost" : ""}>
                {authState ? "Add Post" : ""}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
