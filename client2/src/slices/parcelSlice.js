import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getParcels } from '../api';

export const fetchParcels = createAsyncThunk(
  'parcel/fetchParcels',
  async (_, { getState }) => {
    const state = getState();
    const response = await getParcels(state.user.token);
    return response.data;
  }
);

const parcelSlice = createSlice({
  name: 'parcel',
  initialState: { parcels: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchParcels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parcels = action.payload;
      })
      .addCase(fetchParcels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default parcelSlice.reducer;
