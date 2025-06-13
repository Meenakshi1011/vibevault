import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate instead of useHistory
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // ✅ useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                email,
                password,
            });
            // Save email to localStorage too
           localStorage.setItem('userEmail', email);

            localStorage.setItem('authToken', response.data.token);

            navigate('/movies'); // ✅ redirect with useNavigate
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <section className='flex items-center flex-col justify-center min-h-screen'>
            <div className='flex justify-center flex-col h-[500px] w-[350px] bg-black bg-opacity-50 p-6 text-black rounded-lg'>
                {error && <div className='text-red-500 mb-3'>{error}</div>}
                <input
                    type='email'
                    placeholder='Enter Your Email Address'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mb-5 p-3 border border-gray-300 rounded focus:border-pink-500 outline-none'
                />
                <input
                    type='password'
                    placeholder='Enter Your Password'
                    id='create-password'
                    name='create-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='mb-5 p-3 border border-gray-300 rounded focus:border-pink-500 outline-none'
                />
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='bg-[#32CD32] text-white py-2 rounded'
                >
                    Login
                </button>
                <span className='text-center mt-2'>Forgot Password?</span>
                <hr className='my-4' />
                <span className='text-white'>
                    Don't have an account?{' '}
                    <Link to='/signup' className='text-[#32CD32]'>
                        Signup
                    </Link>
                </span>
            </div>
        </section>
    );
};

export default Login;
