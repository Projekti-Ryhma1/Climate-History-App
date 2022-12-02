import React, { useState } from "react";
import './signUp.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const URL = 'http://localhost:3001/signup';

export default function SignUp() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    async function SendUserData(e) {
      e.preventDefault();
        axios.post(URL, {
          username: username,
          password: password,
          email: email
        }).then((resp) => {
          if(resp.data.serverStatus===2) {
          alert("User created successfully");
          console.log("User created successfully");
          window.location = "/login";
          }
          else {
            setErrorMessage("Unknown error");
          }
      })
      .catch(error => {
          const respData = error.response.data.message;
          console.log(respData);
          setErrorMessage(respData);
      })
      
      };

    return (
        <form>
          <h2>Create User</h2>
          <div className="name">
            <label>User name:</label>
                <input type="text" id="userName" maxLength={20} required onChange={e=> setUserName(e.target.value) }/>
            </div>
            <div className="password">
            <label>Password:</label>
              <input type="password" id="userPassword" maxLength={20} required onChange={ e=> setPassword(bcrypt.hashSync(e.target.value, 10)) }/>
            </div>
            <div className="email">
            <label>Email:</label>
                <input type="text" id="userEmail" maxLength={20} required onChange={ e=> setEmail(e.target.value) }/>
            </div>
          <div>
          <button id="loginButton" onClick={ SendUserData }>Create</button>
          </div>
          <div>
            <p>{ errorMessage }</p>
          </div>
        </form>
      );
}
