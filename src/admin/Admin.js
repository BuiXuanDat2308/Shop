import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MiniProductAdmin from './miniProductAdmin/MiniProductAdmin';
import './Admin.css';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import { Link,useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import { confirmAlert as reactConfirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
function Admin() {
  const navigate = useNavigate();
  const [dataitem, setDataitem] = useState([]);
  const [isAddProductFormVisible, setAddProductFormVisible] = useState(false);
  const [isEditProductFormVisible, setEditProductFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    id: null,
    img: '',
    title: '',
    reviews: '',
    prevPrice: '',
    newPrice: '',
    company: '',
    color: '',
    category: '',
  });
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    const dataitem1 = localStorage.getItem('data');
    setDataitem(JSON.parse(dataitem1) || []);
  }, []);
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  const handleDelete = (id) => {
    const list = dataitem.filter((item) => item.id !== id);
    setDataitem(list);
    localStorage.setItem('data', JSON.stringify(list));
  };

  const handleAddProduct = () => {
    setAddProductFormVisible(true);
  };

  const handleEditProduct = (id) => {
    const productToEdit = dataitem.find((item) => item.id === id);
    setNewProduct({ ...productToEdit });
    setEditProductId(id);
    setEditProductFormVisible(true);
  };

  const handleCancelAddProduct = () => {
    setAddProductFormVisible(false);
    setNewProduct({
      id: null,
      img: '',
      title: '',
      reviews: '',
      prevPrice: '',
      newPrice: '',
      company: '',
      color: '',
      category: '',
    });
  };

  const handleCancelEditProduct = () => {
    setEditProductId(null);
    setEditProductFormVisible(false);
    setNewProduct({
      id: null,
      img: '',
      title: '',
      reviews: '',
      prevPrice: '',
      newPrice: '',
      company: '',
      color: '',
      category: '',
    });
  };

  const handleSaveProduct = () => {
    const newId = uuidv4();
    const newData = [...dataitem, { ...newProduct, id: newId }];
    setDataitem(newData);
    localStorage.setItem('data', JSON.stringify(newData));

    setAddProductFormVisible(false);
    setNewProduct({
      id: null,
      img: '',
      title: '',
      reviews: '',
      prevPrice: '',
      newPrice: '',
      company: '',
      color: '',
      category: '',
    });
  };

  const handleSaveEditProduct = () => {
    const editedProductIndex = dataitem.findIndex((item) => item.id === editProductId);
    const newData = [...dataitem];
    newData[editedProductIndex] = newProduct;

    setDataitem(newData);
    localStorage.setItem('data', JSON.stringify(newData));

    setEditProductId(null);
    setEditProductFormVisible(false);
    setNewProduct({
      id: null,
      img: '',
      title: '',
      reviews: '',
      prevPrice: '',
      newPrice: '',
      company: '',
      color: '',
      category: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const searchProducts = (searchTerm) => {
    return dataitem.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const handleLogout = () => {
    reactConfirmAlert({
      title: 'Xác nhận đăng xuất',
      message: 'Bạn có chắc chắn muốn đăng xuất?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            navigate('/');
            localStorage.setItem('isLogined', false)
          },
        },
        {
          label: 'Không',
          onClick: () => {
          },
        },
      ],
    });
  };
  return (
    <div>
      <div className="admin-navbar">
       <div className='icon-admin'>
       <Link>
          <IoLogOutOutline onClick={handleLogout} className="nav-icons" />
        </Link>
       </div>
        
      </div>
      <div className="admin-container">
        <div >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </div>
        {/* <h2>Product List (Admin)</h2> */}
        <div className="admin-toolbar">
          <button className="add-product-button" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>

        <AddProductForm
          isVisible={isAddProductFormVisible}
          onCancel={handleCancelAddProduct}
          onSave={handleSaveProduct}
          onInputChange={handleInputChange}
          newProduct={newProduct}
        />

        {isEditProductFormVisible && (
          <EditProductForm
            newProduct={newProduct}
            onCancelEditProduct={handleCancelEditProduct}
            onSaveEditProduct={handleSaveEditProduct}
            onInputChange={handleInputChange}
          />
        )}

        {searchProducts(searchTerm).map((item) => (
          <div className="admin-row" key={item.id}>
            <MiniProductAdmin
              id={item.id}
              price={item.newPrice}
              image={item.img}
              name={item.title}
              handleDelete={handleDelete}
              handleEdit={handleEditProduct}
            />
          </div>
        ))}
      </div>
    </div>
  );
}



export default Admin;
