import React from "react";
import '../css/login.css';
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }

export default function Login() {
    return (
        <body>
            <div class="main">  	
                <input type="checkbox" id="chk" aria-hidden="true"/>

                    <div class="signup">
                        <form>
                            <label for="chk" aria-hidden="true">Sign up</label>
                            <input type="text" name="txt" placeholder="User name" required=""/>
                            <input type="password" name="pswd" placeholder="Password" required=""/>
                            <button component={Link} to="/Landing">Sign up</button>
                        </form>
                    </div>

                    <div class="login">
                        <form>
                            <label for="chk" aria-hidden="true">Login</label>
                            <input type="email" name="email" placeholder="Email" required=""/>
                            <input type="password" name="pswd" placeholder="Password" required=""/>
                            <button component={Link} to="/Landing">Login</button>
                        </form>
                    </div>
            </div>
        </body>
    )
}