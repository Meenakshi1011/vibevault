import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return false;
    }

    if (createPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!passwordRegex.test(createPassword)) {
      setError("Password must have at least 1 capital letter, 1 special character, and be at least 8 characters long");
      return false;
    }

    setError('');
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('/api/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: JSON.stringify({
            email,
            password: createPassword,
          }),
          credentials: 'include',
        });
        
  
        const data = await response.json();
        if (response.ok) {
          setSuccess(data.success);
          setError('');
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className='flex items-center flex-col justify-center min-h-screen'>
      <div className='flex justify-center flex-col h-auto w-[350px] bg-black bg-opacity-50 p-6 text-white rounded-lg'>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Enter Your Email Address'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='text-black mb-5 p-3 border border-gray-300 rounded focus:border-pink-500 outline-none w-full'
          />
          <input
            type='password'
            placeholder='Create Password'
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
            className='text-black mb-5 p-3 border border-gray-300 rounded focus:border-pink-500 outline-none w-full'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='text-black mb-5 p-3 border border-gray-300 rounded focus:border-pink-500 outline-none w-full'
          />
          {/* Show error */}
          {error && <p className='text-red-500 mb-2 text-sm'>{error}</p>}
          {/* Show success */}
          {success && <p className='text-green-500 mb-2 text-sm'>{success}</p>}

          <button
            type='submit'
            className='bg-[#32CD32] text-white py-2 rounded mt-2 w-full'
          >
            Sign Up
          </button>
        </form>
        <hr className='my-4 border-gray-400' />
        <span className='text-white text-sm'>
          Already have an account? <Link to="/login" className='text-[#32CD32]'>Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
