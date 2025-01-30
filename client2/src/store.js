import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import parcelReducer from './slices/parcelSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    parcel: parcelReducer,
  },
});
