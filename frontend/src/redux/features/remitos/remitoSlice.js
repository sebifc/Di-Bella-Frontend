import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import remitoService from "./remitoService";
import { toast } from "react-toastify";

const initialState = {
  remito: null,
  remitos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Get all remitos
export const getRemitos = createAsyncThunk(
  "remitos/getAll",
  async (_, thunkAPI) => {
    try {
      return await remitoService.getRemitos();
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

// Get a remito
export const getRemito = createAsyncThunk(
  "remitos/getRemito",
  async (id, thunkAPI) => {
    try {
      return await remitoService.getRemito(id);
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

const remitoSlice = createSlice({
  name: "remito",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRemitos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRemitos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.remitos = action.payload;
      })
      .addCase(getRemitos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getRemito.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRemito.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.remito = action.payload;
      })
      .addCase(getRemito.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.remito.isLoading;
export const selectRemito = (state) => state.remito.remito;
export const selectTotalStoreValue = (state) => state.remito.totalStoreValue;
export const selectOutOfStock = (state) => state.remito.outOfStock;
export const selectCategory = (state) => state.remito.category;

export default remitoSlice.reducer;
