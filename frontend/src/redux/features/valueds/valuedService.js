import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/items/`;

// Get all Valueds
const getValueds = async () => {
  const response = await axios.get(API_URL + "valued/price");
  return response.data;
};

const ValuedService = {
  getValueds,
};

export default ValuedService;
