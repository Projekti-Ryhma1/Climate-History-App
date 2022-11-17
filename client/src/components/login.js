import React, { useState } from "react";
import './login.css';
import axios from 'axios';
// dotenv = require('dotenv'); //WIP
//const jwt = require('jsonwebtoken'); //WIP
//dotenv.config(); //WIP

const URL = 'http://localhost:3001/user/login';

export default function Login() {
  const [username, setUserName] = useState(0);
  const [password, setPassword] = useState(0);
  
  async function SendLoginData(e) {
    e.preventDefault(); //Prevents refreshing page when button is clicked
    axios.post(URL, {
      username: username,
      password: password
      
    }).then(resp => {
        console.log(resp); //Test -> shows user data from the database
        alert(resp.data);
      
      //window.location.reload(); //Refreshes the page
  }).catch(error=> {
    const respData = error.response.data;
    alert(respData);
    console.log(error);
    //window.location.reload(); //Refreshes the page
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
        <button id="loginButton" onClick={SendLoginData}>Login</button>
        </div>
      </form>
    );
  };