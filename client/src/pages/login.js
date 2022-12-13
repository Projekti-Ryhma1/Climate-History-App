import React, { useState } from "react";
import './login_signup.css';
import axios from 'axios';

const URL = process.env.REACT_APP_API_ADDRESS + "/login";

export default function Login(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function SendLoginData(e) {
    e.preventDefault(); //Prevents refreshing page when button is clicked

    axios
      .post(URL, {
        credentials: "include",
        username: username,
        password: password,
      })
      .then((resp) => {
        const token = resp.data.token;
        props.login(token);
        alert(resp.data.message);
        window.location = "/";
      })
      .catch((error) => {
        const respData = error.response.data.message;
        setErrorMessage(respData);
        console.log(error);
      });
  }

    return (
      <form>
        <h2 className="user_headline">Login</h2>
        <div>
          <label className="user_label">Username:</label>
              <input className="user_input" type="text" maxLength={20} required onChange={e=> setUserName(e.target.value)}/>
          </div>
          <div>
          <label className="user_label">Password:</label>
            <input className="user_input" type="password" maxLength={20} required onChange={e=> setPassword(e.target.value)}/>
          </div>
        <div>
        <button className="user_button" onClick={ SendLoginData } disabled={username.length===0||password.length===0}>Login</button>
        </div>
        <div>
            <p className="user_errormsg">{ errorMessage }</p>
          </div>
      </form>
    );
  };
