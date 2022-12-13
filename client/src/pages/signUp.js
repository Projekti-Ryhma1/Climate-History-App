import React, { useState } from "react";
import './login_signup.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const URL = process.env.REACT_APP_API_ADDRESS + "/signup";

export default function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function SendUserData(e) {
    e.preventDefault();
    axios
      .post(URL, {
        username: username,
        password: password,
        email: email,
        selectedPreference: "1",
      })
      .then((resp) => {
        if (resp.data.serverStatus === 2) {
          alert("User created successfully");
          console.log("User created successfully");
          window.location = "/login";
        } else {
          setErrorMessage("Unknown error");
        }
      })
      .catch((error) => {
        const respData = error.response.data.message;
        console.log(respData);
        setErrorMessage(respData);
      });
  }

  async function createPassword(psw) {
    if (psw.length > 0) {
      setPassword(bcrypt.hashSync(psw, 10));
    }
  }

    return (
        <form>
          <h2 className="user_headline">Create User</h2>
          <div>
            <label className="user_label">Username:</label>
                <input className="user_input" type="text" maxLength={20} required onChange={e=> setUserName(e.target.value) }/>
            </div>
            <div>
            <label className="user_label">Password:</label>
              <input className="user_input" type="password" maxLength={20} required onChange={e=> createPassword(e.target.value) }/>
            </div>
            <div>
            <label className="user_label">Email:</label>
                <input className="user_input" type="text" maxLength={20} required onChange={ e=> setEmail(e.target.value) }/>
            </div>
          <div>
          <button className="user_button" onClick={ SendUserData }
          disabled={username.length===0||password.length===0||email.length===0}>Create</button>
          </div>
          <div>
            <p className="user_errormsg">{ errorMessage }</p>
          </div>
        </form>
      );
}
