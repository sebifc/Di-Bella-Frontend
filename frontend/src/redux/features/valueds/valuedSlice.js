import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import valuedService from "./valuedService";
import { toast } from "react-toastify";

const initialState = {
  valued: null,
  valueds: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Get all valueds
export const getValueds = createAsyncThunk(
  "items/valued/price",
  async (_, thunkAPI) => {
    try {
      return await valuedService.getValueds();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const valuedSlice = createSlice({
  name: "valued",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getValueds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getValueds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.valueds = action.payload;
      })
      .addCase(getValueds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.valued.isLoading;
export const selectValued = (state) => state.valued.valued;
export const selectTotalStoreValue = (state) => state.valued.totalStoreValue;
export const selectOutOfStock = (state) => state.valued.outOfStock;
export const selectCategory = (state) => state.valued.category;

export default valuedSlice.reducer;
