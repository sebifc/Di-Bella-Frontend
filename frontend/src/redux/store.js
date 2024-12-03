import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import supplierReducer from "./features/supplier/supplierSlice";
import clientReducer from "./features/client/clientSlice";
import orderReducer from "./features/order/orderSlice";
import itemReducer from "./features/items/itemSlice";
import budgetReducer from "./features/budgets/budgetSlice";
import saleReducer from "./features/sales/saleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    supplier: supplierReducer,
    client: clientReducer,
    order: orderReducer,
    item: itemReducer,
    budget: budgetReducer,
    sale: saleReducer,
  },
});
