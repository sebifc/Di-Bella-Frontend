import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  filteredSuppliers: [],
  filteredClients: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
    FILTER_SUPPLIERS(state, action) {
      const { suppliers, search } = action.payload;
      const tempSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredSuppliers = tempSuppliers;
    },
    FILTER_CLIENTS(state, action) {
      const { clients, search } = action.payload;
      const tempClients = clients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredClients = tempClients;
    },
  },
});

export const { FILTER_PRODUCTS, FILTER_SUPPLIERS, FILTER_CLIENTS } =
  filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;
export const selectFilteredSuppliers = (state) =>
  state.filter.filteredSuppliers;
export const selectFilteredClients = (state) => state.filter.filteredClients;

export default filterSlice.reducer;
