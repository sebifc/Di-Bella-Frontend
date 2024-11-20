import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import Suppliers from "./pages/suppliers/Suppliers";
import SupplierDetail from "./components/supplier/supplierDetail/SupplierDetail";
import EditSupplier from "./pages/editSupplier/EditSupplier";
import AddSupplier from "./pages/addSupplier/AddSupplier";
import Clients from "./pages/clients/Clients";
import ClientDetail from "./components/client/clientDetail/ClientDetail";
import EditClient from "./pages/editClient/EditClient";
import AddClient from "./pages/addClient/AddClient";
import Orders from "./pages/orders/Orders";
import OrderDetail from "./components/order/orderDetail/OrderDetail";
import EditOrder from "./pages/editOrder/EditOrder";
import AddOrder from "./pages/addOrder/AddOrder";
import Items from "./pages/items/Items";
import ItemDetail from "./components/item/itemDetail/ItemDetail";
import EditItem from "./pages/editItem/EditItem";
import AddItem from "./pages/addItem/AddItem";
import Budgets from "./pages/budgets/Budgets";
import AddBudget from "./pages/addBudget/AddBudget";
import BudgetDetail from "./components/budget/budgetDetail/BudgetDetail";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/suppliers"
          element={
            <Sidebar>
              <Layout>
                <Suppliers />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/supplier-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <SupplierDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-supplier/:id"
          element={
            <Sidebar>
              <Layout>
                <EditSupplier />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-supplier"
          element={
            <Sidebar>
              <Layout>
                <AddSupplier />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/clients"
          element={
            <Sidebar>
              <Layout>
                <Clients />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/client-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ClientDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-client/:id"
          element={
            <Sidebar>
              <Layout>
                <EditClient />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-client"
          element={
            <Sidebar>
              <Layout>
                <AddClient />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/orders"
          element={
            <Sidebar>
              <Layout>
                <Orders />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/order-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <OrderDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-order/:id"
          element={
            <Sidebar>
              <Layout>
                <EditOrder />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-order"
          element={
            <Sidebar>
              <Layout>
                <AddOrder />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/items"
          element={
            <Sidebar>
              <Layout>
                <Items />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/item-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ItemDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-item/:id"
          element={
            <Sidebar>
              <Layout>
                <EditItem />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-item"
          element={
            <Sidebar>
              <Layout>
                <AddItem />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/budgets"
          element={
            <Sidebar>
              <Layout>
                <Budgets />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-budget"
          element={
            <Sidebar>
              <Layout>
                <AddBudget />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/budget/:id"
          element={
            <Sidebar>
              <Layout>
                <BudgetDetail />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
