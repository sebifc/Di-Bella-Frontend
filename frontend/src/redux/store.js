import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import supplierReducer from "./features/supplier/supplierSlice";
import clientReducer from "./features/client/clientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    supplier: supplierReducer,
    client: clientReducer,
  },
});
