import React from 'react';
import {Link} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/auth';

const Menu = () => (
    <div>
        <ul className="nav nav-tabs nav-bg">
            <li className="nav-item">
                <Link className=" nav-style" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className=" nav-style" to="/users">Users</Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-style" to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-style" to="/signup">Sign Up</Link>
                    </li>    
                </>
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                <Link className="nav-style" to="/" onClick={()=>signout()}>Sign Out</Link>
                    </li>
                    <li className="nav-item PENDINGSTYLING">
                        <Link className="nav-style" to={`/user/${isAuthenticated().user._id}`}>
                        {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-style" to="/post/create">Create Post</Link>
                    </li>  
                </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
    <><li className="nav-item">
        <Link to={`/admin`} className="nav-style">Admin</Link>
    </li></>)}
        </ul>
    </div>
);

export default Menu;

