import React, { useState } from "react";
import './login_signup.css'; // Shared .css file for the login and signup functions
import axios from 'axios';
import Button from "react-bootstrap/Button";

const URL = process.env.REACT_APP_API_ADDRESS + "/login"; // Adress for the login in .env file (local and production)

export default function Login(props) { // Props contain the token given from the server (Used in App.js)
  const [username, setUserName] = useState(""); // Sets the react state for username
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Shows message if server throws an error

  async function SendLoginData(e) { // Sends login data to server via API
    e.preventDefault(); //Prevents refreshing page when button is clicked

    axios
      .post(URL, {
        credentials: "include",
        username: username,
        password: password,
      })
      .then((resp) => { // Response data from the server
        const token = resp.data.token;
        props.login(token);
        alert(resp.data.message);
        window.location = "/";
      })
      .catch((error) => { // All the errors from the server
        const respData = error.response.data.message; // Unique string of the response data
        setErrorMessage(respData); // Sets string form error message
        console.log(error);
      });
  }

  // Return value for the parent of the function
  return (
    <form>
      <h2 className="user_headline">Login</h2>
      <div>
        <label className="user_label">Username:</label>
        <input id="userName" className="user_input" type="text" maxLength={20} required onChange={e => setUserName(e.target.value)} />
      </div>
      <div>
        <label className="user_label">Password:</label>
        <input id="userPassword" className="user_input" type="password" maxLength={20} required onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <Button className="user_button" onClick={SendLoginData} disabled={username.length === 0 || password.length === 0}>Login</Button>
      </div>
      <div>
        <p className="user_errormsg">{errorMessage}</p>
      </div>
    </form>
  );
};
