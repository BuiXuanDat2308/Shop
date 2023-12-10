import React from 'react';
import './MiniProductAdmin.css';

const MiniProductAdmin = ({ id, image, price,handleDelete, handleEdit, name }) => {
  return (
    <div className="mini-product-admin">
      <div className="product-image-container">
        <img className="product-image" src={image} alt="Product" />
      </div>
      <div>
        <div className="product-id">ID: {id}</div>
        <div className="product-name">Name: {name}</div>
        <div className="product-price">Price: {price}</div>
      </div>
      <div className='btn-miniad'>
      <button onClick={() => handleEdit(id)} className="edit-btn">
          Chỉnh Sửa
        </button>
        <button onClick={() => handleDelete(id)} className="del-btn">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default MiniProductAdmin;
