import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
// import Header from './components/Layout/Header';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import CrimeReporting from './pages/CrimeReporting';
// import Statistics from './pages/Statistics';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/report" element={<Dashboard />} />
                <Route path="/statistics" element={<Dashboard />} />
                <Route path="/profile" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;