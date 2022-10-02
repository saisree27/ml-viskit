import React, { useState } from "react";
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [body, setBody] = useState("")



    

    const navigate = useNavigate();

    const querySignUp = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            body: {username: userName,
            email: email,
            password: password},
            body: JSON.stringify({ post: this.state.post })
          });
          const body = await response.text();
          
          this.setState({ responseToPost: body });
          console.log(body);
        };

    return (
        <div>
            <Navbar />
            <body class="body">
            <div class="main-login">  	
                <input type="checkbox" id="chk" aria-hidden="true"/>

                    <div class="signup">
                        <form>
                            <label for="chk" aria-hidden="true">Sign Up</label>
                            <input type="text" name="txt" placeholder="Email" required="" onChange={(e) => setEmail(e.target.value)}/>
                            <input type="text" name="txt" placeholder="User name" required="" onChange={(e) => setUserName(e.target.value)}/>
                            <input type="password" name="pswd" placeholder="Password" required="" onChange={(e) => setPassword(e.target.value)}/>
                            <button onClick={() => querySignUp()}>Sign Up</button>
                        </form>
                    </div>

                    <div class="login">
                        <form>
                            <label for="chk" aria-hidden="true">Login</label>
                            <input type="text" name="txt" placeholder="User name" required=""  onChange={(e) => setUserName(e.target.value)}/>
                            <input type="password" name="pswd" placeholder="Password" required=""  onChange={(e) => setPassword(e.target.value)}/>
                            <button onClick={() => navigate('/home')}>Login</button>
                        </form>
                    </div>
            </div>
            </body>
            <Footer/>
        </div>
    )
}