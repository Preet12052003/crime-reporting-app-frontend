import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ReportForm = () => {
  const [report, setReport] = useState({
    crimeType: '',
    description: '',
    location: '',
    dateTime: '',
  });

  const { state } = useAuth()

  // I need to store userId in authcontext and then send it while submitting the report

  const [error, setError] = useState({
    dateTime: ''
  });

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dateTime
    const selectedDate = new Date(report.dateTime);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      setError({ dateTime: 'Date and time cannot be in the future.' });
      return;
    } else {
      setError({ dateTime: '' });
    }

    try {
      const response = await axios.post('http://localhost:5000/api/crimeReports/submit' , {
        ...report,
        userId: state.user.id
      });
      const data = await response.data
      alert(`Report submitted successfully. Reference number: ${data.reportId}`);

      setReport({
        crimeType: '',
        description: '',
        location: '',
        dateTime: '',

      })
      // Reset form or redirect user
    } catch (error) {
      alert('Error submitting report. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="crimeType" className="block text-sm font-medium text-gray-700">Crime Type</label>
        <select
          name="crimeType"
          id="crimeType"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select crime type</option>
          <option value="theft">Theft</option>
          <option value="assault">Assault</option>
          <option value="fraud">Fraud</option>
          {/* Add more crime types */}
        </select>
      </div>
      <div>
        <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Time</label>
        <input
          onChange={handleChange}
          name='dateTime'
          id='dateTime'
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {/* Display error message if the date is in the future */}
        {error.dateTime && <p className="text-red-500">{error.dateTime}</p>}
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name='location'
          id='location'
          onChange={handleChange}
          className='border-b px-2 py-1'
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          name='description'
          id='description'
          onChange={handleChange}
          className='border-b px-2 py-1'
        />
      </div>
      {/* Add more form fields for evidence or other details if needed */}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Report
      </button>
    </form>
  );
};

export default ReportForm;
