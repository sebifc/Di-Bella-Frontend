import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/remitos/`;

// Get all remitos
const getRemitos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Remito
const getRemito = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const remitoservice = {
  getRemitos,
  getRemito,
};

export default remitoservice;
