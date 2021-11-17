import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { retrive, create } from '../../service/service';

export default function EditUser() {

    let { usersId } = useParams();


    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [role, setRole] = useState();
    const [rolelist, setRoleList] = useState([]);

    const history = useHistory();

    const getRoles = async () => {
        let response = await retrive('/role-list');
        setRoleList(response.data.roles);
    }

    const getUser = async () => {
        let response = await retrive(`/edit/user/${usersId}`);
        console.log(response);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
        setRole(response.data.user_role);
    }


    const handleSubmit = async e => {
        e.preventDefault();

        if (password != confirmPassword) {

            return alert("Password Doesnot Match");
        }
        else {
            const data = {
                'name': name,
                'email': email,
                'password': password,
                'role': role,
            }

            console.log(data);
            let response = await create(`/user/update/${usersId}`, { data });
            console.log(response);
            if (response.data.message == 'success') {
                history.push('/manage-users');
                // window.location.reload();
            }

        }






    }

    useEffect(() => {
        getUser();
        getRoles();
    }, [])
    return (
        <div className="container">

            <div className="row">
                <div className="col-lg-12 m-4">
                    <div className="pull-left">
                        <h2>Edit User</h2>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center p-4">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Register</div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>


                                <div className="form-group row">
                                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                    <div className="col-md-6">
                                        <input id="name" type="text" value={name || ''} className="form-control " onChange={e => {
                                            setName(e.target.value);

                                        }} required autoComplete="name" autoFocus />


                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email" value={email || ''} className="form-control" onChange={e => {
                                            setEmail(e.target.value);

                                        }} required autoComplete="email" />

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="role" className="col-md-4 col-form-label text-md-right">Role</label>

                                    <div className="col-md-6">
                                        <select className="form-control" onChange={e => {
                                            setRole(e.target.options[e.target.selectedIndex].value)
                                        }}>
                                            <option value="0">Select Role</option>
                                            {
                                                rolelist.length > 0 ? rolelist.map((roles, index) => {

                                                    return (
                                                        <option key={index} value={roles.id}>{roles.name}</option>
                                                    );


                                                }) :
                                                    <option >No Any Roles Available</option>
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" value={password || ''} className="form-control" onChange={e => {
                                            setPassword(e.target.value);

                                        }} name="password" autoComplete="new-password" />


                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                    <div className="col-md-6">
                                        <input id="password-confirm" value={password || ''} onChange={e => {
                                            setConfirmPassword(e.target.value);

                                        }} type="password" className="form-control" name="password_confirmation" autoComplete="new-password" />
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
