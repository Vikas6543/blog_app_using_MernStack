import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  toast.configure();

  const showHandler = (e) => {
    e.preventDefault();
    setShowPassword(false);
  };
  const hideHandler = (e) => {
    e.preventDefault();
    setShowPassword(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className='flex justify-center mt-20'>
      <form className='w-full md:w-2/6 border shadow-xl p-8'>
        <p className='text-center font-semibold pb-6 text-2xl'>Login</p>
        <div>
          <div className='mb-3'>
            <input
              type='email'
              autoComplete='email'
              className='w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm focus:ring focus:ring-gray-200'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='relative'>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className='w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm focus:ring focus:ring-gray-200'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='absolute right-2 top-2'>
              {showPassword ? (
                <button onClick={showHandler}>
                  <i className='fa-solid fa-eye-slash cursor-pointer'></i>
                </button>
              ) : (
                <button onClick={hideHandler}>
                  <i className='fa-solid fa-eye cursor-pointer'></i>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='mt-3 text-sm text-blue-600 font-semibold'>
          <Link to='/register' className=''>
            Don't have an account
          </Link>
        </div>

        <div className='mt-4'>
          <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800  focus:outline-none'
            onClick={submitHandler}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
