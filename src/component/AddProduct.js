
import React, { useState } from "react";

const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

    const user = localStorage.getItem('user');

    const btnHandleAdd = async() => {
        
        console.log(name, price, category, company);
        let result = await fetch("http://localhost:4500/add-product", {
        method:"POST",
        body:JSON.stringify({name, price, category, company, user}),
        headers:{'Content-Type' : 'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })

        result = await result.json();
        if(result)
        {
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
            alert("Product Add Successfully...!");
        } else 
        {
            alert("Some Error");
        }

    }

    return(
        <div className="update-input">
            <h2>Add Product</h2>
            <input type="text" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input type="number" placeholder="Enter Product Price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <input type="text" placeholder="Enter Product Category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
            <input type="text" placeholder="Enter Product Company" value={company} onChange={(e) => setCompany(e.target.value)}></input>

            <button className="btnAddProduct" onClick={btnHandleAdd}>Add Product</button>
        </div>
    )
}

export default AddProduct;