'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Register from '../components/Register';
import Login from '../components/Login';
import Chat from '../components/Chat';
import UserList from '../components/UserList';
import { logoutUser, pingServer, checkToken } from '../services/api';

type View = 'welcome' | 'register' | 'login';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [message, setMessage] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState(null); 

  const handlePingClick = async () => {
    try {
      const response = await pingServer();
      const firstKey = Object.keys(response.data)[0];
      const firstValue = response.data[firstKey];
      alert("Server is reachable: " + firstValue.toString()[0].toUpperCase() + firstValue.toString().substring(1));
    } catch (error) {
      console.error("Error pinging server: ", error);
      alert("Error pinging server: " + error.message);
    }
  };

  const handleCheckToken = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await checkToken(token);
      const firstKey = Object.keys(response.data)[0];
      const firstValue = response.data[firstKey];
      alert("Active token: " + firstValue.toString()[0].toUpperCase() + firstValue.toString().substring(1));
    } catch (error) {
      console.error("Error checking token:", error);
      alert("Error checking token: " + error.message);
    }
  };

  const handleRegisterClick = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      alert("You must log out before registering a new account.");
    } else {
      setCurrentView('register');
    }
  };

  const handleLoginClick = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      alert("You are already logged in as: " + localStorage.getItem('username'));
    } else {
      setCurrentView('login');
    }
  };

  const handleUsersClick = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      alert("You must log in before viewing users.");
    } else {
    setCurrentView('users'); 
    }
  };

  const handleUserSelect= (user) => {
    setSelectedUser(user);
    setCurrentView('chat'); 
  };

  const handleChatClick = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      alert("You must log in before chatting with a user.");
    } else {
      setCurrentView('chat');
    }
  };

  const handleLogoutClick = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await logoutUser(token);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setMessage('Logout successful!');
        setCurrentView('welcome');
      } catch (err) {
        console.error('Logout failed:', err);
        setMessage('Logout failed. Please try again.');
      } 
    } else {
      alert("Already logged out.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-400 to-violet-900">
      <main className="flex-1 p-5">
        <div className="flex items-center space-x-5 w-full">
          <div className="w-1/12"></div>
          <div className="w-11/12">
            <h1 className="flex justify-center text-6xl p-5 font-extrabold antialiased font-leckerli">
              <span className="text-dark">Chat</span>
              <span className="text-light">App</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-5 w-full">
          <div className="flex rounded-lg items-center justify-center bg-background w-1/12">
            <Sidebar
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              onLogoutClick={handleLogoutClick}
              onChatClick={handleChatClick}
              onUsersClick={handleUsersClick} 
              onServerClick={handlePingClick}
              onTokenClick={handleCheckToken}
            />
          </div>
          <div className="flex flex-col rounded-lg items-center justify-center min-h-[80vh] bg-gray-100 w-11/12">
            {currentView === 'register' && <Register />}
            {currentView === 'login' && <Login />}
            {currentView === 'users' && <UserList onUserSelect={handleUserSelect} />}
            {currentView === 'chat' && selectedUser && <Chat chatWith={selectedUser} />}
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