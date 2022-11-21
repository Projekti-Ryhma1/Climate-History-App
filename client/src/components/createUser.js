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
        }).then((resp) => {
          console.log(resp.data);
          if(resp.data.serverStatus===2) {
          alert("User created successfully!");
          console.log("User created successfully!");
          console.log(resp.data);
          }
          else {
          if(resp.data.sqlMessage.includes('users.PRIMARY')){
            alert("Username is already taken!");
            console.log("Username is already taken!");         
          }
          else {
            alert("Email is already in taken!");
            console.log("Email is already taken!");
          }
        }
        
      })
      .catch(error => {
          const respData = error.response.data;
          console.log(respData);
          if (respData.includes('users.PRIMARY')) {
            console.log("Username is already taken!");
            alert("Username is already taken!");
          }
          else if (respData.includes('users.email')) {
            console.log("Email is already taken!");
            alert("Email is already in taken!");
          }
          else{
            console.log(error);
            alert(error);          
          }
      })
      
      };

    return (
        <form>
          <h2>Create User</h2>
          <div className="name">
            <label>User name:</label>
                <input type="text" id="userName" maxLength={20} required onChange={e=> setUserName(e.target.value)}/>
            </div>
            <div className="password">
            <label>Password:</label>
              <input type="password" id="userPassword" maxLength={20} required onChange={e=> setPassword(bcrypt.hashSync(e.target.value, 10))}/>
            </div>
            <div className="email">
            <label>Email:</label>
                <input type="text" id="userEmail" maxLength={20} required onChange={e=> setEmail(e.target.value)}/>
            </div>
          <div>
          <button id="loginButton" onClick={SendUserData}>Create</button>
          </div>
        </form>
      );
}
