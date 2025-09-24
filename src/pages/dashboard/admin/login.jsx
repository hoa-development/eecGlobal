import React from 'react';
import Logo from "../../../assets/jpg/eecLogo.jpeg";

const InputField = ({ id, label, type, placeholder, containerClassName }) => {
const commonInputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-200";

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
      autoComplete="off"
      required
    />
  </div>
);
};

function Login() {
return (
// Main container that centers the form
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
    {/* Form Card */}
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
      
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img 
          src={Logo}
          alt="Company Logo" 
          className="h-12"
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        EEC Admin Panel
      </h2>
      
      {/* Form */}
      <form>
        {/* Reusable InputField for Username */}
        <InputField
          id="username"
          label="Username"
          type="text"
          placeholder="Enter your Username"
          containerClassName="mb-4"
        />

        {/* Reusable InputField for Email */}
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your E-Mail"
          containerClassName="mb-4"
        />
        
        {/* Reusable InputField for Password */}
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your Password"
          containerClassName="mb-6"
        />
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 font-semibold"
        >
          Login
        </button>
      </form>
      
    </div>
  </div>
  );
}

export default Login;

