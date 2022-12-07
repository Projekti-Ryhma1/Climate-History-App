import React, { useState } from "react";
import './login.css';
import axios from 'axios';

const URL = 'http://localhost:3001/login';

export default function Login(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  async function SendLoginData(e) {
    e.preventDefault(); //Prevents refreshing page when button is clicked
    
    axios.post(URL, {
      credentials: 'include',
      username: username,
      password: password
    }).then(resp => {
        const token = resp.data.token;
        props.login(token);
        alert(resp.data.message);
        window.location = "/";

  }).catch(error=> {
    const respData = error.response.data.message;
    setErrorMessage(respData);
    console.log(error);
  })
  }

    return (
      <form>
        <h2>Login</h2>
        <div className="name">
          <label>User name:</label>
              <input type="text" id="userName" maxLength={20} required onChange={e=> setUserName(e.target.value)}/>
          </div>
          <div className="password">
          <label>Password:</label>
            <input type="password" id="userPassword" maxLength={20} required onChange={e=> setPassword(e.target.value)}/>
          </div>
        <div>
        <button id="loginButton" onClick={ SendLoginData }>Login</button>
        </div>
        <div>
            <p>{ errorMessage }</p>
          </div>
      </form>
    );
  };