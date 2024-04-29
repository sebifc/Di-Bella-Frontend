import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/orders/`;

// Create New Order
const createOrder = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all Orders
const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Order
const deleteOrder = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Order
const getOrder = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Order
const updateOrder = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const OrderService = {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
};

export default OrderService;
