import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  filteredSuppliers: [],
  filteredClients: [],
  filteredOrders: [],
  filteredItems: [],
  filteredBudgets: [],
  filteredSales: [],
  filteredRemitos: [],
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
      const { clients, search, type } = action.payload;
      let tempClients = clients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      );

      if (type) {
        tempClients = tempClients.filter(
          (client) => client.type === parseInt(type)
        );
      }

      state.filteredClients = tempClients;
    },
    FILTER_ORDERS(state, action) {
      const { orders, search } = action.payload;
      const tempOrders = orders.filter((order) =>
        order.sku.find(({ item }) => {
          if (typeof item === "string") {
            return item.toLowerCase().includes(search.toLowerCase());
          }
          return item?.sku.toString().includes(search.toLowerCase());
        })
      );

      state.filteredOrders = tempOrders;
    },
    FILTER_ITEMS(state, action) {
      const { items, search } = action.payload;
      const tempItems = items.filter((item) =>
        item.sku.toString().includes(search.toLowerCase())
      );
      state.filteredItems = tempItems;
    },
    FILTER_BUDGETS(state, action) {
      const { budgets, search } = action.payload;
      /* const tempBudgets = budgets.filter((budget) =>
        budget.sku.toString().includes(search.toLowerCase())
      ); */
      const tempBudgets = budgets;
      state.filteredBudgets = tempBudgets;
    },
    FILTER_SALES(state, action) {
      const { sales, search } = action.payload;
      state.filteredSales = sales;
    },
    FILTER_REMITOS(state, action) {
      const { remitos, search } = action.payload;
      state.filteredRemitos = remitos;
    },
  },
});

export const {
  FILTER_PRODUCTS,
  FILTER_SUPPLIERS,
  FILTER_CLIENTS,
  FILTER_ORDERS,
  FILTER_ITEMS,
  FILTER_BUDGETS,
  FILTER_SALES,
  FILTER_REMITOS,
} = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;
export const selectFilteredSuppliers = (state) =>
  state.filter.filteredSuppliers;
export const selectFilteredClients = (state) => state.filter.filteredClients;
export const selectFilteredOrders = (state) => state.filter.filteredOrders;
export const selectFilteredItems = (state) => state.filter.filteredItems;
export const selectFilteredBudgets = (state) => state.filter.filteredBudgets;
export const selectFilteredSales = (state) => state.filter.filteredSales;
export const selectFilteredRemitos = (state) => state.filter.filteredRemitos;

export default filterSlice.reducer;
