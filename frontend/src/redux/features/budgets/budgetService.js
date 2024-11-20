import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/budgets/`;

// Create New Budget
const createBudget = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all budgets
const getBudgets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Budget
const deleteBudget = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Budget
const getBudget = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Budget
const updateBudget = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const budgetservice = {
  createBudget,
  getBudgets,
  getBudget,
  deleteBudget,
  updateBudget,
};

export default budgetservice;
