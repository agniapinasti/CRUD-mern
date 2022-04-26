import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault(); //agar page tidak reload
        await axios.patch(`http://localhost:5000/products/${id}`,{
            title: title,
            price: price
        });
        navigate("/")
    }

    useEffect(() => {
        getProductById()
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setTitle(response.data.title);
        setPrice(response.data.price);
    }

  return (
    <div>
        <form onSubmit={ updateProduct }>
            <div className="field">
                <label className="label">Title</label>
                <input 
                    class="input" 
                    type="text" 
                    placeholder="Title"
                    value={title}
                    onChange={ (e) => setTitle(e.target.value) }
                />      
            </div>

            <div className="field">
                <label className="label">Price</label>
                <input 
                    class="input" 
                    type="text" 
                    placeholder="Price"
                    value={price}
                    onChange={ (e) => setPrice(e.target.value) }
                />
            </div>
            <div className="field">
                <button className="button is-primary">Update</button>
            </div>
        </form>

   
    </div>
  )
}

export default EditProduct