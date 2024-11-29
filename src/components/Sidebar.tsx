interface SidebarProps {
  onRegisterClick: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onUsersClick: () => void;
  onChatClick: () => void;
  onServerClick: () => void;
  onTokenClick: () => void;
}
const Sidebar = ({
  onRegisterClick,
  onLoginClick,
  onLogoutClick,
  onUsersClick,
  // onChatClick,
  onServerClick,
  onTokenClick
}: SidebarProps) => {
  return (
    <div className="flex flex-col space-y-3 items-center rounded-lg w-full py-8 shadow-md min-h-[80vh] justify-between">
      <button
        onClick={onServerClick}
        className=" bg-blue-400 text-dark font-semibold p-1 rounded-lg shadow-neutral-800 shadow-md w-full aspect-video"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path
              d="M360-400h260q42 0 71-29.5t29-71.5q0-42-30-71t-72-29q-8-51-47-85t-91-34q-41 0-75 22t-51 59q-48 2-81 36.5T240-520q0 50 35 85t85 35Zm0-80q-17 0-28.5-11.5T320-520q0-17 11.5-28.5T360-560h50v-10q0-29 20.5-49.5T480-640q29 0 49.5 20.5T550-570v50h70q8 0 14 6t6 14q0 8-6 14t-14 6H360Zm-40 360v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"
            />
          </svg>
          Server
        </div>
      </button>
      <button
        onClick={onTokenClick}
        className=" bg-blue-400 text-dark font-semibold p-1 rounded-lg shadow-neutral-800 shadow-md w-full aspect-video"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path
              d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
            />
          </svg>
          Token
        </div>
      </button>
      <button
        onClick={onRegisterClick}
        className=" bg-blue-400 text-dark font-semibold p-1 rounded-lg shadow-neutral-800 shadow-md w-full aspect-video"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
          </svg>
          Register
        </div>
      </button>
      <button
        onClick={onLoginClick}
        className="bg-green-400 text-dark font-semibold rounded-lg shadow-neutral-800 shadow-md w-full aspect-video"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
          </svg>
          Login
        </div>
      </button>
      <button
        onClick={onUsersClick}
        className="bg-yellow-400 text-dark font-semibold rounded-lg shadow-neutral-800 shadow-md w-full aspect-video"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
          </svg>
          Users
        </div>
      </button>
      {/* <button
        onClick={onChatClick}
        className="bg-yellow-400 text-dark font-semibold rounded-lg shadow-neutral-800 shadow-md w-full aspect-video"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z" />
          </svg>
          Chat
        </div>
      </button> */}
      <button
        onClick={onLogoutClick}
        className="bg-red-400 text-dark font-semibold rounded-lg shadow-neutral-800 shadow-md w-full aspect-video"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
          Logout
        </div>
      </button>
    </div>
  );
};

export default Sidebar;