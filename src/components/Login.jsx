import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username) {
      onLogin(username);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/BGW1.png')", // Image from the 'public' folder
      }}
    >
      {/* Semi-transparent overlay covering the entire page */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Login Section */}
      <div className="relative z-10 text-center text-white px-6 py-12 md:px-12">
        <h1 className="text-4xl font-extrabold mb-6">
          Achieve Your Goals with Focus and Determination
        </h1>
        <p className="text-lg mb-8">
          Take control of your tasks, one step at a time. Stay motivated and
          keep moving forward.
        </p>

        {/* Login Box with semi-transparent background and transparent image */}
        <div
          className="bg-white bg-opacity-80 p-6 rounded shadow-lg max-w-md mx-auto relative"
          style={{
            backgroundImage: "url('/BGW.png')", // Transparent background image for login box
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <input
            type="text"
            placeholder="Enter your username"
            className={`border border-gray-300 p-3 rounded w-full mb-4 focus:ring-2 focus:ring-blue-500 ${
              username ? 'text-black' : 'text-white'
            }`} // Dynamically change text color based on input state
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded w-full hover:bg-blue-600 transition duration-200"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
