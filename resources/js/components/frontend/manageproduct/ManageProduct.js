import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { retrive, create, ROOT_URL } from '../../service/service';

export default function ManageProduct() {


    const [productlist, setProductList] = useState([]);

    const onDelete = (e) => {
        deleteProduct(e.target.id);
    }


    const getProductList = async () => {
        let response = await retrive('/product/index');
        console.log(response);
        setProductList(response.data.products);


    }

    const deleteProduct = async (id) => {
        let response = await retrive(`/delete/product/${id}`);
        console.log(response);
        if (response.data.message === "success") {
            getProductList();
        }

    }


    useEffect(() => {
        getProductList();

    }, [])




    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 m-4">
                    <div className="pull-left">
                        <h2>Products</h2>
                    </div>
                    <div className="pull-right">

                        <Link className="btn btn-success" to="/create-products"> Create New Product</Link>

                    </div>
                </div>
            </div>


            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Details</th>
                        <th width="280px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productlist.length > 0 ? productlist.map((product, index) => {

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.detail}</td>


                                    <td>
                                        <button className="btn btn-primary m-1"  ><Link to={`/edit-product/${product.id}`} style={{ color: 'white' }} >Edit</Link></button>
                                        <button className="btn btn-danger m-1" onClick={e => {
                                            var r = confirm("Are you sure?");
                                            if (r == true) {
                                                return onDelete(e);
                                            }

                                        }

                                        } id={product.id}>Delete</button>
                                    </td>



                                </tr>
                            );
                        }) : <tr><td colSpan="3">No Users Available</td></tr>
                    }


                </tbody>

            </table>



        </div>
    )
}
