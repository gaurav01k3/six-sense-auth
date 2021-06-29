import React from "react";
import { useHistory } from "react-router-dom";
import "../CSS/Header.css";
import homeImage from "../image/home.jpg";

const Header = () => {
  const history = useHistory();
  const deleteJwt = () => {
    localStorage.clear("jwt");
    history.push("/login");
  };

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand">Six Sense</a>
          <form className="d-flex ">
            <button
              onClick={() => deleteJwt()}
              className="btn btn-outline-danger mx-2"
              type="submit"
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
      <div className="home">
        <div className="home__wrapper">
          <div data-aos="slide-right" className="home__img">
            <img src={homeImage} alt="" />
          </div>
          <div data-aos="slide-left" className="home__text">
            <h1>WELCOME HOME</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
