
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Nav = () => {
    let auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/singup");
    }
    return(
        <div>
            <img alt = "logo" className="logo" src="https://png.pngtree.com/png-vector/20210908/ourmid/pngtree-your-logo-poster-png-image_3911209.jpg" />
            { auth ? 
            
            <ul className="nav-bar">
                <li><Link to='/'>Product</Link></li>
                <li><Link to='/add-product'>Add Product</Link></li>
                {/* <li><Link to='/update-product'>Update Product</Link></li> */}
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/signup' onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
                <li>Welcome {JSON.parse(auth).name}  </li>
            </ul>

            :

            <ul className="nav-bar nav-left">
                <li><Link to='/signup'>Signup</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
        }
        </div>
    )
}

export default Nav;