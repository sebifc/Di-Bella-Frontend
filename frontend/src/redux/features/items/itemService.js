import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/items/`;

// Create New Item
const createItem = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all Items
const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Item
const deleteItem = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Item
const getItem = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Item
const updateItem = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const saveSalePrice = async (items) => {
  const response = await axios.post(`${API_URL}save-sale-price`, { items });
  return response;
};

const ItemService = {
  createItem,
  getItems,
  getItem,
  deleteItem,
  updateItem,
  saveSalePrice,
};

export default ItemService;
