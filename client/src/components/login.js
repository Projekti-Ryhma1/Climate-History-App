import React from "react";
import './login.css';

export default function Login() {
    return (
      <form>
        <h2>Login</h2>
        <div>
          <label>User name:</label>
              <input type="text" name="user" id="user" maxLength={20} required>
          </input></div>
          <div>
          <label>Password:</label>
            <input type="text" name="password" id="password" maxLength={20} required></input>
          </div>
        <div>
        <button id="loginBtn">Login</button>
        </div>
      </form>
    );
  };