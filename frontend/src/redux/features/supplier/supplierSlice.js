import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supplierService from "./supplierService";
import { toast } from "react-toastify";

const initialState = {
  supplier: null,
  suppliers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Supplier
export const createSupplier = createAsyncThunk(
  "suppliers/create",
  async (formData, thunkAPI) => {
    try {
      return await supplierService.createSupplier(formData);
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

// Get all suppliers
export const getSuppliers = createAsyncThunk(
  "suppliers/getAll",
  async (_, thunkAPI) => {
    try {
      return await supplierService.getSuppliers();
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

// Delete a Supplier
export const deleteSupplier = createAsyncThunk(
  "suppliers/delete",
  async (id, thunkAPI) => {
    try {
      return await supplierService.deleteSupplier(id);
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

// Get a supplier
export const getSupplier = createAsyncThunk(
  "suppliers/getSupplier",
  async (id, thunkAPI) => {
    try {
      return await supplierService.getSupplier(id);
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
// Update supplier
export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await supplierService.updateSupplier(id, formData);
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

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.suppliers.push(action.payload);
        toast.success("Supplier added successfully");
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Supplier deleted successfully");
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.supplier = action.payload;
      })
      .addCase(getSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Supplier updated successfully");
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.supplier.isLoading;
export const selectSupplier = (state) => state.supplier.supplier;
export const selectTotalStoreValue = (state) => state.supplier.totalStoreValue;
export const selectOutOfStock = (state) => state.supplier.outOfStock;
export const selectCategory = (state) => state.supplier.category;

export default supplierSlice.reducer;
