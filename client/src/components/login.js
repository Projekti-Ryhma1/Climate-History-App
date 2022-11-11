import React, { useState } from "react";
import './login.css';
import axios from 'axios';

const URL = 'http://localhost:3001/user/';

export default function Login() {
  const [username, setUserName] = useState(0);
  const [password, setPassword] = useState(0);

  
  function SendLoginData(){ //TEST

    axios.get(URL+username,{
      username: username,
      password: password
    }).then(resp => {
      console.log(resp.data[0]); //Test -> shows if user is found in database

      if(resp.data[0].password===password) { // Password is correct -> Do stuff
        console.log("Password is correct!");
      }

    });

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