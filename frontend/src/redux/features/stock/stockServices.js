import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/stock/`;

const checkStockAvailability = async (id, quantity) => {
  const response = await axios.get(
    `${API_URL}check/${id}?requiredQuantity=${quantity}`
  );
  return response.data;
};

const getInfoAndPrice = async (id) => {
  const response = await axios.get(`${API_URL}item-info/${id}`);
  return response.data;
};

const reserve = async (items) => {
  const response = await axios.post(`${API_URL}reserve`, items);
  toast.success(response.message);
  return response.data;
};

const stockService = {
  checkStockAvailability,
  getInfoAndPrice,
  reserve,
};

export default stockService;
