import React, { createContext, useState, useEffect } from 'react';

const ItemContext = createContext();

function ItemProvider({ children }) {
  const [item, setItem] = useState(0);

  useEffect(() => {
    const count = JSON.parse(localStorage.getItem('listProduct')) || [];
    setItem(count.length);
  }, []); // Chú ý sử dụng useEffect để tính toán giá trị item khi component được mount

  const countItem = () => {
    const count = JSON.parse(localStorage.getItem('listProduct')) || [];
    setItem(count.length);
  };

  const value = {
    item,
    countItem,
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}

export { ItemContext, ItemProvider };