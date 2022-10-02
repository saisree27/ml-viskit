import React from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <body class="body">
        <div class="main-login">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div class="signup">
            <form>
              <label for="chk" aria-hidden="true">
                SIGN UP
              </label>
              <input
                type="text"
                className="input-field"
                name="txt"
                placeholder="User name"
                required=""
              />
              <input
                type="password"
                className="input-field"
                name="pswd"
                placeholder="Password"
                required=""
              />
              <button onClick={() => navigate("/home")}>Sign Up</button>
            </form>
          </div>

          <div class="login">
            <form>
              <label for="chk" aria-hidden="true">
                LOGIN
              </label>
              <input
                className="input-field"
                type="text"
                name="txt"
                placeholder="User name"
                required=""
              />
              <input
                className="input-field"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
              />
              <button onClick={() => navigate("/home")}>Login</button>
            </form>
          </div>
        </div>
      </body>
      <Footer />
    </div>
  );
}
