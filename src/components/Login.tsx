'use client';

import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await loginUser(username, password);
      const token = response.data.token; 
      localStorage.setItem('token', token); 
      console.log('Token: ' + localStorage.getItem('token'));
      setUsername('');
      setPassword('');
      if (localStorage.getItem('token') === 'undefined') {
        setError('Login failed. Please check your username and password.');
      } else {
        setSuccess(`Welcome back ${username}!`);
      }
    } catch (err) {
      setError('Login failed. Please check your username and password.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-dark">Login to Your Account</h2>
      <form onSubmit={handleLogin} className="flex flex-col mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 border rounded text-dark"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded text-dark"
          required
        />
        <button type="submit" className="bg-blue-400 text-white p-2 rounded shadow-neutral-800 shadow-sm">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default Login;