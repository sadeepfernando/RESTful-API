import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function privateNavbarLinks() {

  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('blogData');

    toast.success('Logout Successfull', {
      position: "top-right",
      autoClose: 2000,
    });
   
    navigate('/login');
  }
  return (
    <nav className='primary-link'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/categories'>Categories</NavLink>
        <NavLink to='/posts'>Posts</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/setting'>Setting</NavLink>
        <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
    </nav>
  )
}
