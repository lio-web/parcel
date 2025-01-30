import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as loginUserAPI } from '../api';

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const response = await loginUserAPI(credentials);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, token: null, status: 'idle', error: null },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
