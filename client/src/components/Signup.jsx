import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [type, setType] = useState("text");
  const history = useHistory();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast for the error
  const displayAlert = (error) => {
    toast.error(error);
  };

  const postDetails = (e) => {
    e.preventDefault();

    //regex for email
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      displayAlert("Invalid email address");
      return;
    }

    //sending req to server here using fetch api
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        dob,
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
          history.push("/login");
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="login">
        <div className="login__wrapper">
          <div className="login__brand">Six-Sense</div>
          {/* <div className="login__head">Sign-up</div> */}
          <form className="detailForm">
            <input
              autoComplete="new"
              data-aos="slide-up"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              data-aos="slide-up"
              type={type}
              placeholder="Date of birth"
              onFocus={() => setType("date")}
              onBlur={() => setType("text")}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <input
              autoComplete="new"
              data-aos="slide-up"
              type="email"
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
              Sign-up
            </button>
          </form>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="login__link">Already have an account?</div>
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

export default Signup;
