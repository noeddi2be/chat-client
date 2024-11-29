"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/api"; 
import PropTypes from 'prop-types';

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(); 
        setUsers(response.data.users); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user); 
    console.log(`Selected user: ${selectedUser}`);
  };

  const handleConfirmSelection = () => {
    if (selectedUser) {
      onUserSelect(selectedUser);
      console.log(`Selected user: ${selectedUser}`);
    }
  };

  return (
    <div className="max-h-[80vh] w-full flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-dark text-center">Select a user to Chat:</h2>
      <ul className="bg-white rounded-lg p-4 w-5/12 overflow-y-auto text-center">
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
      </ul>
      <button
        onClick={handleConfirmSelection}
        className="mt-4 p-2 bg-yellow-400 text-dark font-bold rounded-lg w-3/12"
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