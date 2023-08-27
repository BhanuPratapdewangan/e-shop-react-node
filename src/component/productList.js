
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import {IconName} from 'react-icons/bs'

const ProductList = () => {

    const[list, setList] = useState([]);
    const params = useParams();

    useEffect(() => {
        LoadProductList();
    },[]);

    const LoadProductList = async() => {
        
        let data = await fetch("http://localhost:4500/product-list",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        data = await data.json();
        setList(data);
    }

    const btnHandleDelete = async(id) => {
        
        let data = await fetch(`http://localhost:4500/delete-product/${id}`,{

            method:"DELETE",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        data = await data.json();
        if(data)
        {
            alert("Record deleted");
            LoadProductList();
        } else
        {
            alert("Id is not correct");
        }
    }

    const handleSearchEvent = async(e) => {
        const key = e.target.value;
        if(key)
        {
            let result = await fetch(`http://localhost:4500/search-product/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result)
            {
                setList(result);
            }
        } else
        {
            LoadProductList();
        }
    }
    return(
        <div className="product-list">
            <h2>Product List</h2>
            <input type="text" className="search-input" placeholder="Search Products" onChange={handleSearchEvent} />
            <ul className="search-box">
                <li>S.No.</li>
                <li>Product Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                list.length>0 ?   list.map((item, index) => 
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => btnHandleDelete(item._id)} className="btn btn-danger"><span>Delete</span></button>
                            <Link to={'/update-product/'+item._id} className="btn btn-primary"><span></span>Update</Link>
                        </li>
                    </ul>
                    
                )
                :
                <h2 className="not-found">Data Not Found</h2>
            }
        </div>
    )
}

export default ProductList;