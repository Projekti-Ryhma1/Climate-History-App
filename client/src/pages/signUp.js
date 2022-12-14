import React, { useState } from "react";
import './login_signup.css'; // Shared .css file for the login and signup functions
import axios from 'axios';
import bcrypt from 'bcryptjs'; // For crypting the password
import Button from "react-bootstrap/Button";

const URL = process.env.REACT_APP_API_ADDRESS + "/signup"; // Adress for the sign up in .env file (local and production)

export default function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Shows message if server throws an error

  async function SendUserData(e) {
    e.preventDefault(); //Prevents refreshing page when button is clicked
    axios
      .post(URL, {
        username: username,
        password: password,
        email: email,
        selectedPreference: "1",
      })
      .then((resp) => { // Response from the server
        if (resp.data.serverStatus === 2) { // Response was success
          alert("User created successfully");
          console.log("User created successfully");
          window.location = "/login";
        } else {
          setErrorMessage("Unknown error");
        }
      })
      .catch((error) => { // All the errors from the server
        const respData = error.response.data.message;
        console.log(respData);
        setErrorMessage(respData); // Sets string form error message
      });
  }

  async function createPassword(psw) {
    if (psw.length > 0) { // Checks if password is not empty
      setPassword(bcrypt.hashSync(psw, 10)); // Creates crypted password and sets it to the react state
    }
  }

  // Return value for the parent of the function
  return (
    <form>
      <h2 className="user_headline">Create User</h2>
      <div>
        <label className="user_label">Username:</label>
        <input id="userName" className="user_input" type="text" maxLength={20} required onChange={e => setUserName(e.target.value)} />
      </div>
      <div>
        <label className="user_label">Password:</label>
        <input id="userPassword" className="user_input" type="password" maxLength={20} required onChange={e => createPassword(e.target.value)} />
      </div>
      <div>
        <label className="user_label">Email:</label>
        <input id="userEmail" className="user_input" type="text" maxLength={20} required onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <Button className="user_button" onClick={SendUserData}
          disabled={username.length === 0 || password.length === 0 || email.length === 0}>Create</Button>
      </div>
      <div>
        <p className="user_errormsg">{errorMessage}</p>
      </div>
    </form>
  );
}
