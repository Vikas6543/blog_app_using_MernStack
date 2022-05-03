import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const logoutHandler = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className='bg-black text-white flex justify-between px-4 items-center py-3'>
      <div className='font-bold'>
        <Link to='/dashboard'>My_Blog_App</Link>
      </div>
      {user && (
        <div className='relative'>
          <div>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className='border rounded hover:bg-gray-800 py-1 px-3'
            >
              Profile{' '}
              {showDropdown ? (
                <i className='fa-solid fa-angle-up pl-3'></i>
              ) : (
                <i className='fa-solid fa-angle-down pl-3'></i>
              )}
            </button>
          </div>

          {showDropdown && (
            <div className='absolute bg-gray-600 w-full text-center dropdown-btn'>
              <p className='py-3 border-b'>
                <i className='fa-solid fa-user'></i>{' '}
                {user && user.user.userName}
              </p>
              <button onClick={logoutHandler} className='py-3'>
                <i className='fa-solid fa-right-from-bracket'></i> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
