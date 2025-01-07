import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Login = ({ errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [globalErrors, setGlobalErrors] = useState(errors || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset specific error for the field
    setGlobalErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Submit form data to the backend
    Inertia.post('/login', formData, {
      onError: (errors) => {
        // Inertia automatically adds validation errors to the response
        setGlobalErrors(errors); // Update state with the errors from the backend
        setIsSubmitting(false);
      },
      onFinish: () => {
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {/* Display email validation errors */}
            {globalErrors.email && <span style={{ color: 'red' }}>{globalErrors.email}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {/* Display password validation errors */}
            {globalErrors.password && <span style={{ color: 'red' }}>{globalErrors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={isSubmitting}
          >
            {/* {isSubmitting ? 'Submitting...' : 'Login'} */}
            { 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
