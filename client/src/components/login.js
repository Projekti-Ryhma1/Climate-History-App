import React, { useState } from "react";
import './login.css';

export default function Login() {
  const [username, setUserName] = useState(0);
  const [password, setPassword] = useState(0);
  
  function sendLoginData(){
    console.log("Username: "+username+" Password: "+password); //Testing
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
            <input type="text" id="userPassword" maxLength={20} required onChange={e=> setPassword(e.target.value)}/>
          </div>
        <div>
        <button id="loginButton" onClick={sendLoginData}>Login</button>
        </div>
      </form>
    );
  };