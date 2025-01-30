import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateOrder from './pages/CreateOrder';
import UpdateOrder from './pages/UpdateOrder';
import ViewOrders from './pages/ViewOrders';
import TrackOrder from './pages/TrackOrder';
import OrderLocation from './pages/OrderLocation';
import DashboardLayout from './components/DashboardLayout';
import ManageUsers from './pages/ManageUsers';
import TrackDeliveries from './pages/TrackDeliveries';
import Profile from './pages/Profile';  // Import Profile component
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';  // Import NavBar component

function App() {
  return (
    <Router>
      <NavBar />  {/* Add NavBar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-order" element={<ProtectedRoute component={CreateOrder} />} />
        <Route path="/update-order/:id" element={<ProtectedRoute component={UpdateOrder} />} />
        <Route path="/view-orders" element={<ProtectedRoute component={ViewOrders} />} />
        <Route path="/track-order/:id" element={<ProtectedRoute component={TrackOrder} />} />
        <Route path="/order-location/:id" element={<ProtectedRoute component={OrderLocation} />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />  {/* Profile Route */}

        <Route path="/dashboard" element={<ProtectedRoute component={DashboardLayout} />}>
          <Route path="orders" element={<ViewOrders />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="track" element={<TrackDeliveries />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
