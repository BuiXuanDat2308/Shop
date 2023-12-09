import React  from 'react'
import './MiniProductAdmin.css'
const MiniProductAdmin = ({ id, image, price }) => {
    return (
      <div className="mini-product-admin">
        <p>ID: {id}</p>
        <img src={image} alt={`Product ${id}`} />
        <p>Price: ${price}</p>
      </div>
    );
  };

export default MiniProductAdmin