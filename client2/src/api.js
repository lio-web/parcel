import axios from 'axios';

const API_URL = 'http://localhost:5000';

// User API
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

// Parcel API
export const createParcel = (parcelData, token) => {
  return axios.post(`${API_URL}/parcels`, parcelData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getParcels = (token) => {
  return axios.get(`${API_URL}/parcels`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getParcelById = (id, token) => {
  return axios.get(`${API_URL}/parcels/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateParcel = (id, parcelData, token) => {
  return axios.put(`${API_URL}/parcels/${id}`, parcelData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteParcel = (id, token) => {
  return axios.delete(`${API_URL}/parcels/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
