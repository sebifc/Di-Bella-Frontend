import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import budgetService from "./budgetService";
import { toast } from "react-toastify";

const initialState = {
  budget: null,
  budgets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Budget
export const createBudget = createAsyncThunk(
  "budgets/create",
  async (formData, thunkAPI) => {
    try {
      return await budgetService.createBudget(formData);
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

// Get all budgets
export const getBudgets = createAsyncThunk(
  "budgets/getAll",
  async (_, thunkAPI) => {
    try {
      return await budgetService.getBudgets();
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

// Delete a Budget
export const deleteBudget = createAsyncThunk(
  "budgets/delete",
  async (id, thunkAPI) => {
    try {
      return await budgetService.deleteBudget(id);
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

// Get a budget
export const getBudget = createAsyncThunk(
  "budgets/getBudget",
  async (id, thunkAPI) => {
    try {
      return await budgetService.getBudget(id);
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
// Update budget
export const cancelBudget = createAsyncThunk(
  "budgets/cancelBudget",
  async (id, thunkAPI) => {
    try {
      return await budgetService.cancelBudget(id);
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
export const approveBudget = createAsyncThunk(
  "budgets/approveBudget",
  async (id, thunkAPI) => {
    try {
      return await budgetService.approveBudget(id);
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
export const approvedModificationsBudget = createAsyncThunk(
  "budgets/approveModifiactions",
  async (id, thunkAPI) => {
    try {
      return await budgetService.approvedModificationsBudget(id);
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

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.budgets.push(action.payload);
        toast.success("Budget added successfully");
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getBudgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.budgets = action.payload;
      })
      .addCase(getBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Budget deleted successfully");
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.budget = action.payload;
      })
      .addCase(getBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(cancelBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Presupuesto cancelado, el stock se ha restablecido");
      })
      .addCase(cancelBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(approveBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Presupuesto aprobado");
      })
      .addCase(approveBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(approvedModificationsBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approvedModificationsBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(
          "Se cambio el estado del presupuesto a aprobado con modificaciones"
        );
      })
      .addCase(approvedModificationsBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.budget.isLoading;
export const selectBudget = (state) => state.budget.budget;
export const selectTotalStoreValue = (state) => state.budget.totalStoreValue;
export const selectOutOfStock = (state) => state.budget.outOfStock;
export const selectCategory = (state) => state.budget.category;

export default budgetSlice.reducer;
