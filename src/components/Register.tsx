'use client';

import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await registerUser(username, password);
      setSuccess(`User ${response.data.username} registered successfully!`);
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-dark">Create an Account</h2>
      <span className=" text-zinc-400">Username & Password must be at least 3 characters long!</span>
      <form onSubmit={handleRegister} className="flex flex-col mt-4">
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
          Register
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default Register;