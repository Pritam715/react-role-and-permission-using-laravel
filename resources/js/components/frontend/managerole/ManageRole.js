import React, { useState, useEffect } from 'react';
import { retrive, create, ROOT_URL } from '../../service/service';
import { Link } from "react-router-dom";


export default function ManageRole() {


    const [rolelist, setRoleList] = useState([]);

    const onDelete = (e) => {
        deleteRole(e.target.id);
    }


    const getRoleList = async () => {
        let response = await retrive('/roles/index');
        console.log(response);
        setRoleList(response.data.roles);


    }

    const deleteRole = async (id) => {
        let response = await retrive(`/delete/roles/${id}`);
        console.log(response);
        if (response.data.message === "success") {
            getRoleList();
        }

    }


    useEffect(() => {
        getRoleList();

    }, [])
    return (
        <div className="container">

            <div className="row">
                <div className="col-lg-12 m-4">
                    <div className="pull-left">
                        <h2>Role Management</h2>
                    </div>
                    <div className="pull-right">

                        <Link className="btn btn-success" to="/create-roles"> Create New Role</Link>

                    </div>
                </div>
            </div>



            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th width="280px">Action</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        rolelist.length > 0 ? rolelist.map((role, index) => {

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{role.name}</td>


                                    <td>
                                        <button className="btn btn-primary m-1"  ><Link to={`/edit-role/${role.id}`} style={{ color: 'white' }} >Edit</Link></button>
                                        <button className="btn btn-danger m-1" onClick={e => {
                                            var r = confirm("Are you sure?");
                                            if (r == true) {
                                                return onDelete(e);
                                            }

                                        }

                                        } id={role.id}>Delete</button>
                                    </td>



                                </tr>
                            );
                        }) : <tr><td colSpan="3">No Roles Available</td></tr>
                    }


                </tbody>


            </table>


        </div>
    )
}
