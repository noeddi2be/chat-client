
const Sidebar = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  return (
    <div className="flex flex-col space-y-3 items-center rounded-lg shadow-md h-5/6 justify-between">
      <button
        onClick={onRegisterClick}
        className=" bg-gray-100 text-dark font-semibold font-mono p-1 rounded-xl w-full aspect-video"
      >
        Register
      </button>
      <button
        onClick={onRegisterClick}
        className=" bg-gray-100 text-dark font-semibold font-mono rounded-xl w-full aspect-video"
      >
        Login
      </button>
      <button
        onClick={onRegisterClick}
        className="bg-gray-100 text-dark font-semibold font-mono rounded-xl w-full aspect-video"
      >
        Users
      </button>
      <button
        onClick={onRegisterClick}
        className="bg-gray-100 text-dark font-semibold font-mono rounded-xl w-full aspect-video"
      >
        Chat
      </button>
      <button
        onClick={onRegisterClick}
        className="bg-gray-100 text-dark font-semibold font-mono rounded-xl w-full aspect-video"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;