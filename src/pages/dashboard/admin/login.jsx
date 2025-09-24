import React from 'react';

// A reusable InputField component that follows the DRY principle
const InputField = ({ id, label, type, placeholder, containerClassName }) => {
  const commonInputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id} // It's a common convention to have name and id be the same
        className={commonInputClasses}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

// The main Login component, now much cleaner and easier to read
function Login() {
  return (
    // Main container that centers the form
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Form Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          EEC Admin Panel
        </h2>
        
        {/* Form */}
        <form>
          {/* Reusable InputField for Username */}
          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            containerClassName="mb-4"
          />
          
          {/* Reusable InputField for Password */}
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            containerClassName="mb-6"
          />
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;