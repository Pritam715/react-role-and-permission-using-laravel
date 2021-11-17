import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { BASE_URL, retrive, create } from '../service/service';



async function loginUser(credentials) {
    return axios.post(`${BASE_URL}/login`, credentials)
        .then(response => response)
        .catch(error => alert("Something went wrong!"))
}


export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();

        // console.log(email);
        // console.log(password);

        let response = await loginUser({ email, password });
        console.log(response);
        if (response.data.user) {

            localStorage.setItem("user-info", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            history.push("/");
            window.location.reload();


        } else {
            return alert('Credentials doesnot match!');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/");
            window.location.reload();
            // <Redirect to="/" />
            // window.localStorage.removeItem("user-info");
            // window.localStorage.removeItem("token");
        }
        else {
            history.push("/login");
        }

    }, [])





    return (
        <div>
            <div className="container">
                <div className="row justify-content-center p-4">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit} >


                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email" onChange={e => setEmail(e.target.value)} required autoComplete="email" autoFocus />

                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control " name="password" onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />

                                        </div>
                                    </div>

                                    <div className="form-group row">

                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>


                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
