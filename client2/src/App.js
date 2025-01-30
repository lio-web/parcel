import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ParcelForm from './components/ParcelForm';
import ParcelDetails from './components/ParcelDetails';
import MapView from './components/MapView';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-parcel" element={<ParcelForm />} />
          <Route path="/parcel/:id" element={<ParcelDetails />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
