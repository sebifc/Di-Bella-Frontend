import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import BudgetForm from "../../components/budget/BudgetForm/BudgetForm";
import {
  createBudget,
  selectIsLoading,
} from "../../redux/features/budgets/budgetSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getClients } from "../../redux/features/client/clientSlice";
import { getItems } from "../../redux/features/items/itemSlice";
import stockService from "../../redux/features/stock/stockServices";

const initialState = {
  client: null,
  status: 0,
  paymentMethod: null,
  seller: null,
};

const AddBudget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [budget, setBudget] = useState(initialState);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { clients, isLoading, isError, message } = useSelector(
    (state) => state.client
  );

  const { items } = useSelector((state) => state.item);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBudget({ ...budget, [name]: value });
  };

  const saveBudget = async (itemsBudget) => {
    const dataItemsBudget = itemsBudget.map(
      ({ _id, purchasePrice, salePrice, quantity, expiration, brand }) => ({
        sku: _id,
        itemPurchasePrice: purchasePrice,
        itemSalePrice: salePrice,
        quantity,
        expiration,
        brand,
      })
    );

    const budgetCreated = await dispatch(
      createBudget({ ...budget, items: dataItemsBudget })
    );

    const dataItemsReserve = itemsBudget.map(({ _id, quantity }) => ({
      sku: _id,
      quantity,
    }));

    if (budgetCreated) {
      await stockService.reserve({
        budgetId: budgetCreated.payload._id,
        items: dataItemsReserve,
      });
    }

    navigate("/budgets");
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getClients());
      dispatch(getItems());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Crear presupuesto</h3>
      <BudgetForm
        budget={budget}
        handleInputChange={handleInputChange}
        saveBudget={saveBudget}
        clients={clients}
        setBudget={setBudget}
        items={items}
      />
    </div>
  );
};

export default AddBudget;
