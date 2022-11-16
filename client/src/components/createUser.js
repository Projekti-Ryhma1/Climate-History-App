import React, { useState } from "react";
import './login.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const URL = 'http://localhost:3001/user/create';

export default function Create_user() {
    const [username, setUserName] = useState(0);
    const [password, setPassword] = useState(0);
    const [email, setEmail] = useState(0);

    async function SendUserData() {
        axios.post(URL, {
          username: username,
          password: password,
          email: email
        }).then(resp => {
          alert("User created!");
          console.log("User created!");
    
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      })
      };


    return (
        <form>
          <h2>Create User</h2>
          <div class="name">
            <label>User name:</label>
                <input type="text" id="userName" maxLength={20} required onChange={e=> setUserName(e.target.value)}/>
            </div>
            <div class="password">
            <label>Password:</label>
              <input type="password" id="userPassword" maxLength={20} required onChange={e=> setPassword(bcrypt.hashSync(e.target.value, 10))}/>
            </div>
            <div class="email">
            <label>Email:</label>
                <input type="text" id="userEmail" maxLength={20} required onChange={e=> setEmail(e.target.value)}/>
            </div>
          <div>
          <button id="loginButton" onClick={SendUserData}>Create</button>
          </div>
        </form>
      );
}