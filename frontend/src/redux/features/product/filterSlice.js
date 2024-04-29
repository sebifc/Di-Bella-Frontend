import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  filteredSuppliers: [],
  filteredClients: [],
  filteredOrders: [],
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
    FILTER_ORDERS(state, action) {
      const { orders, search } = action.payload;
      const tempOrders = orders.filter((order) =>
        order.invoiceNumber.toString().includes(search.toLowerCase())
      );

      state.filteredOrders = tempOrders;
    },
  },
});

export const {
  FILTER_PRODUCTS,
  FILTER_SUPPLIERS,
  FILTER_CLIENTS,
  FILTER_ORDERS,
} = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;
export const selectFilteredSuppliers = (state) =>
  state.filter.filteredSuppliers;
export const selectFilteredClients = (state) => state.filter.filteredClients;
export const selectFilteredOrders = (state) => state.filter.filteredOrders;

export default filterSlice.reducer;
