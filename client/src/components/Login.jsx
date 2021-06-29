import React, { useState } from "react";
import "../CSS/Login.css";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast for the error
  const displayAlert = (error) => {
    toast.error(error);
  };

  const postDetails = (e) => {
    e.preventDefault();

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      displayAlert("Invalid email address");
      return;
    }

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          displayAlert(data.error);
        } else {
          alert(data.message);
          localStorage.setItem("jwt", data.token);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="login">
        <div data-aos="zoom-in" className="login__wrapper">
          <div className="login__brand">Six-Sense</div>
          {/* <div className="login__head">Sign-In</div> */}
          <form className="detailForm">
            <input
              data-aos="slide-up"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              data-aos="slide-up"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button data-aos="zoom-in" onClick={(e) => postDetails(e)}>
              Sign-In
            </button>
          </form>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <div className="login__link">Create an account?</div>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
