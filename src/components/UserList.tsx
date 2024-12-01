"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/api";
import PropTypes from 'prop-types';

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersWithMessages, setUsersWithMessages] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.online);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    // Load messages from local storage
    // Added with the help of Copilot
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
    // Extract usernames who have sent messages
    // Added with the help of Copilot
    const extractedUsers = Object.keys(storedMessages);
    setUsersWithMessages(extractedUsers);
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log(`Selected user: ${user}`);
  };

  const handleConfirmSelection = () => {
    if (selectedUser) {
      onUserSelect(selectedUser);
      console.log(`Confirmed selection: ${selectedUser}`);
    }
  };

  return (
    <div className="max-h-[70vh] w-full flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg">
      <div className="flex space-x-4 w-full justify-center items-start">
        <div className="flex flex-col w-full items-center justify-between">
          <h2 className="text-xl font-bold mb-4 text-dark text-center">Select a user to Chat</h2>
          <ul className="bg-white shadow-md rounded-lg p-4 w-9/12 overflow-y-auto text-center">
            {users.map((user, index) => (
              <li key={index} className="p-1">
                <button
                  onClick={() => handleUserClick(user)}
                  className={`w-10/12 text-left text-dark p-2 hover:bg-blue-200 rounded ${selectedUser === user ? 'bg-blue-300' : ''}`}
                  style={{ width: '100%' }}
                >
                  {user}
                </button>
              </li>
            ))}
            <input
              type="text"
              placeholder="Username"
              value={selectedUser || ''}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mb-2 p-2 border rounded text-dark w-full"
              required
            />
          </ul>
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <h2 className="text-xl font-bold mb-4 text-dark text-center">Chats</h2>
          <ul className="bg-white shadow-md rounded-lg p-4 w-9/12 overflow-y-auto text-center">
            {usersWithMessages.map((user, index) => (
              <li key={index} className="p-1">
                <button
                  onClick={() => handleUserClick(user)}
                  className={`w-10/12 text-left text-dark p-2 hover:bg-blue-200 rounded ${selectedUser === user ? 'bg-blue-300' : ''}`}
                  style={{ width: '100%' }}
                >
                  {user}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={handleConfirmSelection}
        className="mt-10 p-2 bg-yellow-400 text-dark shadow-neutral-800 shadow-sm font-bold rounded-lg w-3/12"
        disabled={!selectedUser} // Disable button if no user is selected
      >
        Chat
      </button>
    </div>
  );
};

UserList.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
};

export default UserList;