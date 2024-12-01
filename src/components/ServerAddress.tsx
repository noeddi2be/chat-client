import { useState } from 'react';
import { pingServer, setApiUrl } from '../services/api';

const ServerAddress = () => {
  const [serverAddress, setServerAddress] = useState('http://javaprojects.ch:50001');

  const handleSetAddress = () => {
    const token = localStorage.getItem('token');
    if (token) {
      alert('You must first log out to change the server address.');
      return;
    }
    setApiUrl(serverAddress);
    alert(`Server address set to: ${serverAddress}`);
  };

  const handlePingServer = async () => {
    try {
      const response = await pingServer();
      const firstKey = Object.keys(response.data)[0];
      const firstValue = response.data[firstKey];
      alert(`Server is reachable: ${firstValue}`);
    } catch (error) {
      alert(`Failed to reach the server at ${serverAddress}: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col text-dark items-center p-4 w-5/12 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Current Server Address:</h2>
      <p className="mb-8 text-blue-500">{serverAddress}</p>
      <input
        type="text"
        value={serverAddress}
        onChange={(e) => setServerAddress(e.target.value)}
        placeholder="Enter new server address"
        className="mb-8 p-2 border text-gray-400 w-9/12 rounded"
      />
      <button 
        onClick={handleSetAddress} 
        className="bg-blue-400 text-white p-2 shadow-neutral-600 shadow-sm rounded mb-2"
      >
        Set Server Address
      </button>
      <button 
        onClick={handlePingServer} 
        className="bg-blue-400 text-white p-2 shadow-neutral-600 shadow-sm rounded"
      >
        Ping Server 
      </button>
    </div>
  );
};

export default ServerAddress;