import React, { useState } from "react";
import './login.css';
import axios from 'axios';
const bcrypt = require('bcryptjs');
// dotenv = require('dotenv'); //WIP
//const jwt = require('jsonwebtoken'); //WIP
//dotenv.config(); //WIP

const URL = 'http://localhost:3001/user/';

export default function Login() {
  const [username, setUserName] = useState(0);
  const [password, setPassword] = useState(0);
  
  function SendLoginData() {
    axios.get(URL+username,{
      username: username,
      password: password
      
    }).then(resp => {
      console.log("Hashed password: "+password); // Test
      console.log(resp.data[0]); //Test -> shows user data from the database
      console.log(resp.data[0].username+" -> "+username);

      if(bcrypt.compareSync(resp.data[0].password,password)) {
        alert("Password was correct! \n Username: "+resp.data[0].username+"\n Email: "+resp.data[0].email);
        console.log("Password is correct");
      }
      else {
        alert("Password was incorrect");
        console.log("Password is incorrect!");
      }

  }).catch(error=> {
    alert(error);
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
            <input type="password" id="userPassword" maxLength={20} required onChange={e=> setPassword(bcrypt.hashSync(e.target.value, 10))}/>
          </div>
        <div>
        <button id="loginButton" onClick={SendLoginData}>Login</button>
        </div>
      </form>
    );
  };