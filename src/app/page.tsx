import Sidebar from "../components/Sidebar";

export default function Home() {

  return (

    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <main className="flex-1 p-5"> {/* Main content area */}
        <h1 className="flex justify-center text-6xl p-5 font-extrabold antialiased text-white font-leckerli">
          <span className="text-dark">Chat</span>
          <span className="text-light">App</span>
        </h1>
        <div className="flex items-center space-x-5 w-full">
          <div className="flex rounded-lg items-center justify-center bg-background w-1/12"> {/* Left div */}
            <Sidebar />
          </div>
          <div className="flex flex-col rounded-lg items-center justify-center min-h-[80vh] bg-gray-100 w-11/12"> {/* Right div */}
            <h1 className="text-5xl font-medium subpixel-antialiased text-medium font-leckerli">Welcome to ChatApp!</h1>
            <p className="mt-4 text-lg font-bold font-mono text-dark">
              Connect with friends and start chatting...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
