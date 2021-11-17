import React, { useState, useEffect } from 'react'
import { retrive, create } from '../../service/service';
import { useHistory, useParams } from 'react-router-dom';

export default function EditRole() {

    let { roleId } = useParams();
    console.log(roleId);

    const history = useHistory();
    const [checkedValues, setCheckedValues] = useState([]);

    const [permissionlist, setPermissionlist] = useState([]);


    const [name, setName] = useState();
    const [permissions, setPermission] = useState([]);

    const getPermission = async () => {
        let response = await retrive('/permission/list');
        // console.log(response);
        setPermissionlist(response.data.permission);
    }


    const getRole = async () => {
        let response = await retrive(`/edit/roles/${roleId}`);
        // console.log(response);
        setName(response.data.role.name);
        setPermission(response.data.permissions);
        setCheckedValues(response.data.permissions);
    }


    // const handleChange = (e) => {
    //     setPermission(prevItems => [...prevItems, e.target.value]);
    // }
    const handleEditCheckbox = (checkedId) => {
        const newPermissions = checkedValues?.includes(checkedId)
            ? checkedValues?.filter(id => id !== checkedId)
            : [...(checkedValues ?? []), checkedId];
        setCheckedValues(newPermissions);
        setPermission(newPermissions);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const data = {
            'name': name,
            'permission': permissions,
        }
        console.log(data);

        let response = await create(`/roles/update/${roleId}`, { data });
        console.log(response);
        if (response.data.message == 'success') {
            history.push('/manage-role');
            // window.location.reload();
        }

    }

    useEffect(() => {
        getPermission();
        getRole();

    }, [])

    return (
        <div className="container">

            <div className="container">
                <div className="row">
                    <div className="col-lg-12 m-4">
                        <div className="pull-left">
                            <h2>Edit Role</h2>
                        </div>

                    </div>
                </div>





                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="form-group">
                                <strong>Name:</strong>
                                <input className="form-control" value={name || ''} onChange={e => { setName(e.target.value) }} type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="form-group">
                                <strong>Permission:</strong>
                                <br />
                                {
                                    permissionlist.map((permissionl, index) => {

                                        return (
                                            <label key={index}>
                                                <input type="checkbox" checked={checkedValues.includes(permissionl.id)} id={permissionl.id} onChange={e => handleEditCheckbox(permissionl.id)} ></input>
                                                <span className="pr-4"> <strong>{permissionl.name}</strong></span>
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

        </div >
    )
}
