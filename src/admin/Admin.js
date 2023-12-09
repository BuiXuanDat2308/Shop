import React, { useState } from 'react'
import MiniProductAdmin from './miniProductAdmin/MiniProductAdmin';
import { useEffect } from 'react';
function Admin() {
    const [dataitem, setDataitem] = useState([]);
    useEffect(() => {
        const dataitem1 = localStorage.getItem("data");
        setDataitem(JSON.parse(dataitem1) || []);
    }, []);
  return (
    <>
    { dataitem.map(item =>{
        return(
            <MiniProductAdmin
            id = {item.id}
            image={item.img}
            price={item.newPrice}
            />
        )
    })}
    </>
  )
}

export default Admin