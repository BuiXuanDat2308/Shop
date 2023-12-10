import React from 'react';

const EditProductForm = ({
  newProduct,
  onCancelEditProduct,
  onSaveEditProduct,
  onInputChange,
}) => {
  return (
    <div className="add-product-form">
      <h3>Edit Product</h3>
      <label>Image URL:</label>
      <input
        type="text"
        name="img"
        value={newProduct.img}
        onChange={onInputChange}
        placeholder="Enter image URL"
      />
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={newProduct.title}
        onChange={onInputChange}
        placeholder="Enter title"
      />
      <label>Reviews:</label>
      <input
        type="text"
        name="reviews"
        value={newProduct.reviews}
        onChange={onInputChange}
        placeholder="Enter reviews"
      />
      <label>Previous Price:</label>
      <input
        type="text"
        name="prevPrice"
        value={newProduct.prevPrice}
        onChange={onInputChange}
        placeholder="Enter previous price"
      />
      <label>New Price:</label>
      <input
        type="text"
        name="newPrice"
        value={newProduct.newPrice}
        onChange={onInputChange}
        placeholder="Enter new price"
      />
      <label>Company:</label>
      <input
        type="text"
        name="company"
        value={newProduct.company}
        onChange={onInputChange}
        placeholder="Enter company"
      />
      <label>Color:</label>
      <input
        type="text"
        name="color"
        value={newProduct.color}
        onChange={onInputChange}
        placeholder="Enter color"
      />
      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={newProduct.category}
        onChange={onInputChange}
        placeholder="Enter category"
      />
      <button onClick={onSaveEditProduct}>Save</button>
      <button onClick={onCancelEditProduct}>Cancel</button>
    </div>
  );
};

export default EditProductForm;
