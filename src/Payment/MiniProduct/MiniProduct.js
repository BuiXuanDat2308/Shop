import React, { useState } from 'react'
import './MiniProduct.css'
import { useContext } from "react"
import { ItemContext } from '../../Context/ItemContext';
function MiniProduct({ id, image, name, price, quantity, handleDelete, onChangeItem }) {
  const count1 = useContext(ItemContext)
  const [quantityProduct, setQuantityProduct] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(quantity * price);
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantityProduct(newQuantity);
    const newTotalPrice = newQuantity * price;
    setTotalPrice(newTotalPrice);
    onChangeItem(id, newQuantity);
  };

  return (
    <div className="mini-product">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <div className="price-and-quantity">
          <p className="product-price">Đơn giá: ${price}</p>
          <label htmlFor="quantity">Số lượng:</label>
          <input min={1}
            max={99}
            type="number"
            value={quantityProduct}
            // defaultValue={quantity}
            onChange={handleQuantityChange}
          />
          <p className="total-price">Price: ${totalPrice}</p>
        </div>
      </div>
      <button onClick={() => { handleDelete(id); count1.countItem() }} className="delete-button" >
        Xóa
      </button>
    </div>
  )
}

export default MiniProduct