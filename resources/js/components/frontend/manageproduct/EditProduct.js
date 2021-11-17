import React, { useState, useEffect } from 'react';
import { create, retrive } from '../../service/service';
import { useHistory, useParams } from 'react-router-dom';

export default function EditProduct() {

    let { productId } = useParams();

    const history = useHistory();

    const [name, setName] = useState();
    const [details, setDetails] = useState();


    const getProduct = async () => {
        let response = await retrive(`/edit/product/${productId}`)
        console.log(response);
        setName(response.data.product.name);
        setDetails(response.data.product.detail);

    }


    const handleSubmit = async e => {
        e.preventDefault()

        const data = {
            'name': name,
            'details': details
        }
        console.log(data);
        let response = await create(`/product/update/${productId}`, { data });
        console.log(response);
        if (response.data.message == 'success') {
            history.push('/manage-product');
        }

    }

    useEffect(() => {

        getProduct();


    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 m-4">
                    <div className="pull-left">
                        <h2>Edit Product</h2>
                    </div>

                </div>
            </div>




            <form onSubmit={handleSubmit} >



                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Name:</strong>
                            <input type="text" name="name" value={name} onChange={e => { setName(e.target.value) }} className="form-control" placeholder="Name" />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Detail:</strong>
                            <textarea className="form-control" value={details} onChange={e => { setDetails(e.target.value) }}
                                name="textValue"
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>


            </form>


        </div>
    )
}
