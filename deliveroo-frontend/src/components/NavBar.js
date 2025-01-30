import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's role and authentication status from localStorage or an API
    const userRole = localStorage.getItem('role') || 'user';  // Default to 'user' if role is not set
    const token = localStorage.getItem('token');
    setRole(userRole);
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Deliveroo</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/view-orders" className="hover:underline">Orders</Link>
              </li>
              {role === 'admin' && (
                <>
                  <li>
                    <Link to="/dashboard/users" className="hover:underline">Manage Users</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/track" className="hover:underline">Track Deliveries</Link>
                  </li>
                </>
              )}
              {role === 'user' && (
                <>
                  <li>
                    <Link to="/track-order" className="hover:underline">Track Order</Link>
                  </li>
                  <li>
                    <Link to="/create-order" className="hover:underline">Create Order</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:underline">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login" className="hover:underline">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
