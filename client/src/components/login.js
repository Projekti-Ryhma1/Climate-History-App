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
  
  async function SendLoginData() {
    axios.post(URL,{
      username: username,
      password: password
      
    }).then(resp => {
      console.log("maito");
      console.log(resp); //Test -> shows user data from the database
      alert(resp.data);
      
  }).catch(error=> {
    alert(error);
    console.log(error);
  })
  }

    return (
      <form>
        <h2>Login</h2>
        <div class="name">
          <label>User name:</label>
              <input type="text" id="userName" maxLength={20} required onChange={e=> setUserName(e.target.value)}/>
          </div>
          <div class="password">
          <label>Password:</label>
            <input type="password" id="userPassword" maxLength={20} required onChange={e=> setPassword(e.target.value)}/>
          </div>
        <div>
        <button id="loginButton" onClick={SendLoginData}>Login</button>
        </div>
      </form>
    );
  };