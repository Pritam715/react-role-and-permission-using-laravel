import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { hasRole, isAllowed, isAuthenticated } from '../config/auth';
import useUser from '../customHooks/useUser';


export default function Header() {

    const { user, setUser } = useUser();
    // console.log(user.name);


    const history = useHistory();

    const logout = () => {

        localStorage.removeItem("user-info");
        localStorage.removeItem("token");
        history.push("/");
        window.location.reload();
    }

    // useEffect(() => {
    //     let comments = JSON.parse(localStorage.getItem('user-info'));
    //     console.log(comments);

    // }, []);

    return (


        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNavDropdown">



                    {isAuthenticated ?
                        <ul className="navbar-nav ml-auto" >
                            <li className="nav-item ">
                                <Link to="/" className="nav-link">Home </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/manage-users" className="nav-link">Manage User </Link>
                            </li>
                            {hasRole(user, ['Admin']) &&
                                <li className="nav-item ">
                                    <Link to="/manage-role" className="nav-link">Manage Role </Link>
                                </li>
                            }

                            <li className="nav-item ">
                                <Link to="/manage-product" className="nav-link">Manage Product </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user.name}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" onClick={logout} href="#">LogOut</a>

                                </div>
                            </li>
                        </ul>
                        :

                        <ul className="navbar-nav ml-auto" >
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" >Login</Link>
                            </li>
                        </ul>


                    }


                </div>
            </nav>
        </div >


    )
}
