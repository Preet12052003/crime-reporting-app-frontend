import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    aadhar: ''
  });

  const { login } = useAuth()

  const [error, setError] = useState({
    password: '',
    aadhar: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error.aadhar || error.password) {
      alert("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        email: formData.email,
        password: formData.password,
        aadhaarNumber: formData.aadhar
      });
      const user = await response.data;
      login(user);
    } catch (err) {
      console.error('Error during registration:', err);
      alert('Registration failed. Please try again.');
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    if (value.length !== 12) {
      setError(prev => ({
        ...prev,
        aadhar: 'Aadhaar number must be 12 digits'
      }));
    } else {
      setError(prev => ({
        ...prev,
        aadhar: ''
      }));
    }
    setFormData(prev => ({
      ...prev,
      aadhar: value
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length > 10) {
      setError(prev => ({
        ...prev,
        password: 'Password must be less than 10 characters'
      }));
    } else if (value.length < 6) {
      setError(prev => ({
        ...prev,
        password: 'Password must be at least 6 characters long'
      }));
    } else if (value.includes(' ')) {
      setError(prev => ({
        ...prev,
        password: 'Password cannot contain spaces'
      }));
    } else {
      setError(prev => ({
        ...prev,
        password: ''
      }));
    }
    setFormData(prev => ({
      ...prev,
      password: value
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    
    // Check if confirm password matches the password
    if (value !== formData.password) {
      setError(prev => ({
        ...prev,
        password: 'Passwords do not match'
      }));
    } else {
      setError(prev => ({
        ...prev,
        password: ''
      }));
    }
  
    setFormData(prev => ({
      ...prev,
      confirmPassword: value
    }));
  }

  return (
    <div className="bg-blue-400 text-white absolute w-1/2 h-auto p-8 flex flex-col justify-around top-48 left-[calc(100vw-75%)] items-center">
      <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-6 items-center">
        <h1 className="text-2xl">Register</h1>
        
        <div className="flex flex-col justify-center">
          <label className="mb-3" htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={formData.email}
            name="email"
            className="p-1.5 w-[300px] text-black"
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <label className="mb-3" htmlFor="aadhar">Aadhar No.</label>
          <input
            type="number"
            id="aadhar"
            value={formData.aadhar}
            name="aadhar"
            className="p-1.5 w-[300px] text-black"
            onChange={handleAadharChange}
          />
          {error.aadhar && <p className="text-red-500">{error.aadhar}</p>}
        </div>
        
        <div className="flex flex-col justify-center">
          <label className="mb-3" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            className="p-1.5 text-black w-[300px]"
            onChange={handlePasswordChange}
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
        </div>
        
        <div className="flex flex-col justify-center">
          <label className="mb-3" htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={formData.confirmPassword}
            name="confirm-password"
            className="p-1.5 text-black w-[300px]"
            onChange={handleConfirmPasswordChange}
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
        </div>
        
        <button type="submit" className="border w-1/2 rounded-md p-2 hover:bg-white hover:text-black">Submit</button>
        
        <div className="flex gap-3">
          <p>Already have an account?</p>
          <Link to={'/login'}>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register;
