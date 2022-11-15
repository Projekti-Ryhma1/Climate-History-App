import React, { useState } from "react";
import './login.css';
import axios from 'axios';

const URL = 'http://localhost:3001/createuser';

export default function Create_user() {
    const [username, setUserName] = useState(0);
    const [password, setPassword] = useState(0);
    const [email, setEmail] = useState(0);

    function SendUserData() {
        axios.post(URL,{
          username: username,
          password: password,
          email: email
        }).then(resp => {
          alert("User created!");
          console.log("User created!");
          console.log(resp.data);
    
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
              <input type="password" id="userPassword" maxLength={20} required onChange={e=> setPassword(e.target.value)}/>
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