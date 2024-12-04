import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/sales/`;

// Create New Sale
const createSale = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all sales
const getSales = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Sale
const deleteSale = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Sale
const getSale = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Sale
const updateSale = async (id, formData) => {
  const response = await axios.put(`${API_URL}${id}`, formData);
  return response.data;
};

const getPendingItems = async (id) => {
  const response = await axios.get(`${API_URL}pending-items/${id}`);
  return response.data;
};

const createRemito = async (data) => {
  const response = await axios.post(`${API_URL}create-remito`, data);
  return response.data;
};

const saleservice = {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
  getPendingItems,
  createRemito,
};

export default saleservice;
