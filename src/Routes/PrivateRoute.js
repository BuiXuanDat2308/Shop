import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
  const isLogined = JSON.parse(localStorage.getItem('isLogined'));

  return isLogined===true ? (
    <>
    {props.children}
    </>
  ): (
    <Navigate to="/" />
  );
};

export default PrivateRoute;