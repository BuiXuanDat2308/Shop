import React, { useContext, useEffect, useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './Payment.css'
import MiniProduct from './MiniProduct/MiniProduct';
import { ItemContext } from '../Context/ItemContext';
const Payment = () => {
    const itemContext = useContext(ItemContext);
    const [itemCart, setItemCart] = useState([]);
    useEffect(() => {
        const dataitemCart = localStorage.getItem("listProduct");
        setItemCart(JSON.parse(dataitemCart) || []);
    }, []);
    //hàm delete
    const handleDelete = (id) => {
        const list = itemCart.filter(item => { return item.id !== id; })
        setItemCart(list);
        localStorage.setItem('listProduct', JSON.stringify(list));
    }

    const onChangeItem = (id, newQuantity) => {
        // Tìm sản phẩm có id tương ứng trong itemCart
        const updatedItemCart = itemCart.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        // Cập nhật state itemCart
        setItemCart(updatedItemCart);

        // Cập nhật dữ liệu trong localStorage
        localStorage.setItem('listProduct', JSON.stringify(updatedItemCart));
    };
    //cập nhật tổng giá trị sản phẩm
    const calculateTotalPrice = () => {
        let total = 0;
        itemCart.forEach((item) => {
          total += item.quantity * item.price;
        });
        return total;
      };
    const handleCheckout = () =>{
        alert("checkout thành công");
        localStorage.removeItem('listProduct');
        setItemCart([]);
    }
    return (
        <div>
            <nav className='payment-heading'>
                <h1 className='payment-heading-text'>Shopping Cart</h1>
                <Link className='payment-heading-icon' to={'/home'} >
                    <IoHomeOutline className="nav-icons" />
                </Link>
            </nav>
            {itemCart.length > 0 ? itemCart.map((item) => {
                return <MiniProduct
                    key={item.id}
                    id={item.id}
                    image={item.img}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    handleDelete={handleDelete}
                    onChangeItem={onChangeItem}
                />
            }) : <div className="no-product-container">
            <p className="no-product-message">No product</p>
        <Link to={'/home'}>    <button className="continue-shopping-button">Continue Shopping</button></Link>
          </div>}
            {itemCart.length > 0 && <div className='total-and-checkout'>
                <div className="total-price-container">
                    <p className="total-price-text">Total Price:</p>
                    <p className="total-price-amount">${calculateTotalPrice()}</p>
                </div>
                <button onClick={() =>{handleCheckout(); itemContext.countItem()}} className="checkout-button" >
                    Check Out
                </button>
            </div>}
        </div>
    );
};

export default Payment;