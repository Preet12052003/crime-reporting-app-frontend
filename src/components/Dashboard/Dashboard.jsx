import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, BarChart2, FileText } from 'lucide-react';
import ReportForm from '../crimeReport/ReportForm';
import { useAuth } from '../../context/AuthContext';
import Profile from '../Profile';
import StatisticsChart from '../statistics/StatisticsChart';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('statistics');
  const { state } = useAuth()
  console.log(state.user);
  
  const navigate = useNavigate()
  useEffect(() => {
    if(state.user === null) navigate('/login')
  } , [])

  const navItems = [
    { name: 'My Profile', icon: User, link: '/profile' },
    { name: 'Statistics', icon: BarChart2, link: '/statistics' },
    { name: 'Crime Report', icon: FileText, link: '/report' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Anveshan</h2>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${
                activePage === item.name.toLowerCase() ? 'bg-gray-100 text-gray-800' : ''
              }`}
              onClick={() => setActivePage(item.name.toLowerCase())}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        {activePage === 'statistics' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Crime Statistics</h2>
            <StatisticsChart />
          </div>
        )}
        {/* Add other page components here when they're implemented */}
        {activePage === 'my profile' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Profile</h2>
            <Profile />
          </div>
        )}
        {activePage === 'crime report' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Crime Report</h2>
            <ReportForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;