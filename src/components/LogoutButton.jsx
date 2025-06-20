import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unsetAuthUserActionCreator } from '../states/authUser/action';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(unsetAuthUserActionCreator());
    navigate('/login');
  };

  return (
    <button onClick={logout}>Logout</button>
  );
}

export default Navbar;
