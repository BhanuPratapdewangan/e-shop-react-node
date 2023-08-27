
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(false);
    const Navigate = useNavigate();

    const btnHandleLogin = async() => {
        console.log(email, password);
       
        if(!email || !password)
        {
            setError(true)
            return false 
        }

        let data = await fetch("http://localhost:4500/login", {
            method:"POST",
            body:JSON.stringify({email, password}),
            headers : {'Content-Type' : 'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        data = await data.json();
        console.log(data);

        localStorage.setItem('token', JSON.stringify(data.auth));
        localStorage.setItem('user', JSON.stringify(data.data));
        
        if(data.auth)
        {
            alert("Login Successfully...!");
            
           
            Navigate("/");
        } else
        {
            alert("Incorrect input");
        }

    }

    return(
        <div className="userLogin">
            <h2>Login</h2>
            <input type="text" placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            {error && !email && <span className="errorMsg">Email is required</span>}
            <input type="text" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && !password && <span className="errorMsg">Password is required</span>}

            <button className="btnLogin" onClick={btnHandleLogin}>Login</button>
        </div>
    )
}

export default Login;