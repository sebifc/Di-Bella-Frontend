import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saleService from "./saleService";
import { toast } from "react-toastify";

const initialState = {
  sale: null,
  sales: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Sale
export const createSale = createAsyncThunk(
  "sales/create",
  async (formData, thunkAPI) => {
    try {
      return await saleService.createSale(formData);
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

// Get all sales
export const getSales = createAsyncThunk(
  "sales/getAll",
  async (_, thunkAPI) => {
    try {
      return await saleService.getSales();
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

export const updateSale = createAsyncThunk(
  "sales/updateSale",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await saleService.updateSale(id, formData);
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

// Delete a Sale
export const deleteSale = createAsyncThunk(
  "sales/delete",
  async (id, thunkAPI) => {
    try {
      return await saleService.deleteSale(id);
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

// Get a sale
export const getSale = createAsyncThunk(
  "sales/getSale",
  async (id, thunkAPI) => {
    try {
      return await saleService.getSale(id);
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

const saleSlice = createSlice({
  name: "sale",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.sales.push(action.payload);
        toast.success("Sale added successfully");
      })
      .addCase(createSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.sales = action.payload;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Sale deleted successfully");
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.sale = action.payload;
      })
      .addCase(getSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Se actualzo la venta");
      })
      .addCase(updateSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.sale.isLoading;
export const selectSale = (state) => state.sale.sale;
export const selectTotalStoreValue = (state) => state.sale.totalStoreValue;
export const selectOutOfStock = (state) => state.sale.outOfStock;
export const selectCategory = (state) => state.sale.category;

export default saleSlice.reducer;
