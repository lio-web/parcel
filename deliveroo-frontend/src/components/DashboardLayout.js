import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-1/4 p-6">
        <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-3">
              <Link to="/dashboard/orders" className="text-white hover:underline">View Orders</Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/users" className="text-white hover:underline">Manage Users</Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/track" className="text-white hover:underline">Track Deliveries</Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
