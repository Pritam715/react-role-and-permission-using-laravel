import React, { useState, useEffect } from 'react';
import { retrive, create, ROOT_URL } from '../../service/service';
import { Link } from "react-router-dom";

export default function ManageUser() {


    const [userlist, setUserList] = useState([]);

    const onDelete = (e) => {
        deleteUser(e.target.id);
    }


    const getUserList = async () => {
        let response = await retrive('/users/index');
        setUserList(response.data.users);


    }

    const deleteUser = async (id) => {
        let response = await retrive(`/delete/users/${id}`);
        console.log(response);
        if (response.data.message === "success") {
            getUserList();
        }

    }


    useEffect(() => {
        getUserList();

    }, [])



    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 m-4">
                    <div className="pull-left">
                        <h2>Users Management</h2>
                    </div>
                    <div className="pull-right">
                        <Link className="btn btn-success" to="/create-users"> Create New User</Link>
                    </div>
                </div>
            </div>

            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th width="280px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userlist.length > 0 ? userlist.map((users, index) => {

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.roles.map((role) =>
                                        <p key={role.id}>{role.name}</p>
                                    )}</td>

                                    <td>
                                        <button className="btn btn-primary m-1"  ><Link to={`/edit-user/${users.id}`} style={{ color: 'white' }} >Edit</Link></button>
                                        <button className="btn btn-danger m-1" onClick={e => {
                                            var r = confirm("Are you sure?");
                                            if (r == true) {
                                                return onDelete(e);
                                            }

                                        }

                                        } id={users.id}>Delete</button>
                                    </td>



                                </tr>
                            );
                        }) : <tr><td colSpan="3">No Users Available</td></tr>
                    }


                </tbody>

            </table>
        </div >









    )
}
