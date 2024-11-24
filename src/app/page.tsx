'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Register from '../components/Register';
import Login from '../components/Login';
import { logoutUser } from '../services/api';

type View = 'welcome' | 'register' | 'login';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [message, setMessage] = useState<string>('');

  const handleRegisterClick = () => {
    setCurrentView('register');
  };

  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleLogoutClick = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await logoutUser(token);
        localStorage.removeItem('token');
        setMessage('Logout successful!');
        setCurrentView('welcome');
      } catch (err) {
        console.error('Logout failed:', err);
        setMessage('Logout failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-800">
      <main className="flex-1 p-5">
        <h1 className="flex justify-center text-6xl p-5 font-extrabold antialiased text-white font-leckerli">
          <span className="text-dark">Chat</span>
          <span className="text-light">App</span>
        </h1>
        <div className="flex items-center space-x-5 w-full">
          <div className="flex rounded-lg items-center justify-center bg-background w-1/12">
            <Sidebar 
              onRegisterClick={handleRegisterClick} 
              onLoginClick={handleLoginClick} 
              onLogoutClick={handleLogoutClick}
            />
          </div>
          <div className="flex flex-col rounded-lg items-center justify-center min-h-[80vh] bg-gray-100 w-11/12">
            {currentView === 'register' && <Register />}
            {currentView === 'login' && <Login />}
            {currentView === 'welcome' && (
              <>
                <h1 className="text-5xl font-medium subpixel-antialiased text-medium font-leckerli">Welcome to ChatApp!</h1>
                <p className="mt-4 text-lg font-bold text-dark">
                  Connect with friends and start chatting...
                </p>
                {message && <p className="mt-2 text-green-500">{message}</p>}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}