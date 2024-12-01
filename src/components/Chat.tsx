"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { sendMessage as sendMessageApi, pollMessages, checkUserOnline } from "@/services/api";

const Chat = ({ chatWith }) => {
  const [messagesByUser, setMessagesByUser] = useState(() => {
    // Load messages from localStorage if available
    // Added with the help of Copilot
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : {};
  });
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const username = localStorage.getItem("username");

  const checkOnlineStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await checkUserOnline(token, chatWith);
      setIsOnline(response.data.online);
    } catch (error) {
      console.error("Error checking online status:", error);
    }
  };

  const send = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const token = localStorage.getItem("token");
      try {
        const response = await sendMessageApi(token, chatWith, newMessage);

        if (response.data.send) {
          // Update the message stack for the current user
          // Added with the help of Copilot
          setMessagesByUser((prev) => {
            const updatedMessages = {
              ...prev,
              [chatWith]: [
                ...(prev[chatWith] || []),
                { username: "You", text: newMessage },
              ],
            };
            // Save to localStorage
            // Added with the help of Copilot
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            return updatedMessages;
          });
          setNewMessage("");
        } else {
          console.error("Failed to send message. The recipient may be offline.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.warn("Cannot send an empty message.");
    }
  };

  const fetchMessages = async () => {
    checkOnlineStatus();
    const token = localStorage.getItem("token");
    try {
      const response = await pollMessages(token);

      if (response.data.messages && response.data.messages.length > 0) {
        response.data.messages.forEach((msg) => {
          // Update the message stack for each user
          // Added with the help of Copilot
          setMessagesByUser((prev) => {
            const updatedMessages = {
              ...prev,
              [msg.username]: [
                ...(prev[msg.username] || []),
                { username: msg.username, text: msg.message },
              ],
            };
            // Save to localStorage
            // Added with the help of Copilot
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            return updatedMessages;
          });
        });
      } else {
        console.log("No new messages available.");
      }
    } catch (error) {
      console.error("Error polling messages:", error);
    }
  };

  useEffect(() => {
    checkOnlineStatus();
    fetchMessages(); // Initial fetch
    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-full">
      <h2 className="text-xl text-dark font-bold mb-4 flex items-center">
        <span className="mr-2 text-blue-400">
          {username}
        </span>
        Chatting with {chatWith}
        <span className={`ml-2 text-sm ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
          ({isOnline ? 'Online' : 'Offline'})
        </span>
      </h2>
      <div className="flex-1 border-2 max-h-[60vh] min-h-[60vh] w-8/12 bg-white text-dark overflow-y-auto p-4 rounded-lg">
        {(messagesByUser[chatWith] || []).map((msg, index) => (
          <div key={index} className="mb-2">
            <strong className="text-blue-500">{msg.username}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="flex w-7/12 text-dark mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-gray-600 w-auto p-2 m-1 rounded-xl shadow-neutral-800 shadow-sm"
        >

          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.2111 2.06722L3.70001 5.94499C1.63843 6.46039 1.38108 9.28612 3.31563 10.1655L8.09467 12.3378C9.07447 12.7831 10.1351 12.944 11.1658 12.8342C11.056 13.8649 11.2168 14.9255 11.6622 15.9053L13.8345 20.6843C14.7139 22.6189 17.5396 22.3615 18.055 20.3L21.9327 4.78886C22.3437 3.14517 20.8548 1.6563 19.2111 2.06722ZM8.92228 10.517C9.85936 10.943 10.9082 10.9755 11.8474 10.6424C12.2024 10.5165 12.5417 10.3383 12.8534 10.1094C12.8968 10.0775 12.9397 10.0446 12.982 10.0108L15.2708 8.17974C15.6351 7.88831 16.1117 8.36491 15.8202 8.7292L13.9892 11.018C13.9553 11.0603 13.9225 11.1032 13.8906 11.1466C13.6617 11.4583 13.4835 11.7976 13.3576 12.1526C13.0244 13.0918 13.057 14.1406 13.4829 15.0777L15.6552 19.8567C15.751 20.0673 16.0586 20.0393 16.1147 19.8149L19.9925 4.30379C20.0372 4.12485 19.8751 3.96277 19.6962 4.00751L4.18509 7.88528C3.96065 7.94138 3.93264 8.249 4.14324 8.34473L8.92228 10.517Z" fill="#0F1729" /
            >
          </svg>
        </button>
      </form>
    </div>
  );
};

Chat.propTypes = {
  chatWith: PropTypes.string.isRequired,
};

export default Chat;