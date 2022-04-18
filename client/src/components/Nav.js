import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='bg-black mb-4 font-bold text-white flex justify-between px-4 nav items-center'>
      <Link to='/'>My_Blog_App</Link>
    </nav>
  );
};

export default Nav;
