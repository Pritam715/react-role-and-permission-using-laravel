import React, { useState, useEffect } from 'react';
import { retrive, create } from '../../service/service';
import { useHistory } from 'react-router-dom';

export default function CreateRole() {

    const history = useHistory();
    const [permissionlist, setPermissionlist] = useState([]);

    const [name, setName] = useState();
    const [permissions, setPermission] = useState([]);

    const getPermission = async () => {
        let response = await retrive('/permission/list');
        console.log(response);
        setPermissionlist(response.data.permission);
    }
    const handleChange = (e) => {
        setPermission(prevItems => [...prevItems, e.target.value]);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const data = {
            'name': name,
            'permissions': permissions,
        }
        console.log(data);
        let response = await create('/roles/store', { data });
        console.log(response);
        if (response.data.message == 'success') {
            history.push('/manage-role');
            // window.location.reload();
        }

    }
    useEffect(() => {
        getPermission();
    }, [])


    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 m-4">
                    <div className="pull-left">
                        <h2>Create New Role</h2>
                    </div>

                </div>
            </div>





            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Name:</strong>
                            <input className="form-control" onChange={e => { setName(e.target.value) }} type="text" />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Permission:</strong>
                            <br />
                            {
                                permissionlist.map((permission, index) => {
                                    return (
                                        <label key={index}>
                                            <input type="checkbox" value={permission.id} id={permission.id} onChange={handleChange} ></input>
                                            <span className="pr-4"> <strong>{permission.name}</strong></span>
                                        </label>

                                    );

                                })
                            }



                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>

        </div >
    )
}
