
import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";

const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();

    useEffect(() => {
        getProductDetails();
    },[]);

    const getProductDetails = async() => {

        let data = await fetch(`http://localhost:4500/get-product/${params.id}`,{
            headers : {
            authorization : `bearer${JSON.parse(localStorage.getItem('token'))}`
        }
        });

        data = await data.json();
        console.log(data)
        // setName(data.name);
        // setPrice(data.price);
        // setCategory(data.category);
        // setCompany(data.company);
    }

    const btnHandleUpdate = async() => {
        
        let data = await fetch(`http://localhost:4500/update-product/${params.id}`, {

            method:"PUT",
            body:JSON.stringify({name, price, category, company}),
            headers:{'Content-Type' : 'Application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        data = await data.json();
        if(data)
        {
            alert("Product Updated");
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
            console.log(data);
        } else
        {
            alert("Data not updated");
        }
    }
    return(
        <div className="update-input">
            <h2>Update Product</h2>
            <input type="text" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input type="number" placeholder="Enter Product Price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <input type="text" placeholder="Enter Product Category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
            <input type="text" placeholder="Enter Product Company" value={company} onChange={(e) => setCompany(e.target.value)}></input>

            <button className="btnUpdateProduct" onClick={btnHandleUpdate}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;