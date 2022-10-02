import React, { useEffect, useState } from "react";
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "../firebase";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (user) navigate("/home");
      }, [user]);

    

    const navigate = useNavigate();

    /*const querySignUp = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            body: {username: userName,
            email: email,
            password: password},
            response: JSON.stringify({ post: this.state.post })
          });
          const body = await response.text();
          
          this.setState({ responseToPost: body });
          console.log(body);
        };*/

    return (
        <div>
            <Navbar />
            <body class="body">
            <div class="main-login">  	
                <input type="checkbox" id="chk" aria-hidden="true"/>

                    <div class="signup">
                        <form>
                            <label for="chk" aria-hidden="true">Sign Up</label>
                            <input type="text" name="txt" placeholder="Name" required=""  onChange={(e) => setName(e.target.value)}/>
                            <input type="text" name="txt" placeholder="Email" required="" onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" name="pswd" placeholder="Password" required="" onChange={(e) => setPassword(e.target.value)}/>
                            <button onClick={() => registerWithEmailAndPassword(name, email, password)}>Sign Up</button>
                            <button onClick={signInWithGoogle}>Sign Up With Google</button>
                        </form>
                    </div>

                    <div class="login">
                        <form>
                            <label for="chk" aria-hidden="true">Login</label>
                            <input type="text" name="txt" placeholder="Email" required=""  onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" name="pswd" placeholder="Password" required=""  onChange={(e) => setPassword(e.target.value)}/>
                            <button onClick={() => logInWithEmailAndPassword(email, password)}>Log In</button>
                            <button onClick={signInWithGoogle}>Log In With Google</button>
                        </form>
                    </div>
            </div>
            </body>
            <Footer/>
        </div>
      </body>
      <Footer />
    </div>
  );
}
