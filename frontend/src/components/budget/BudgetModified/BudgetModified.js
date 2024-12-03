import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import BudgetForm from "../../budget/BudgetForm/BudgetForm";
import {
  createBudget,
  selectIsLoading,
  getBudget,
} from "../../../redux/features/budgets/budgetSlice";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getClients } from "../../../redux/features/client/clientSlice";
import { getItems } from "../../../redux/features/items/itemSlice";
import stockService from "../../../redux/features/stock/stockServices";

const BudgetModified = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [budget, setBudget] = useState(null);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {
    budget: budgetEdit,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.budget);
  const { clients } = useSelector((state) => state.client);

  const { items } = useSelector((state) => state.item);

  useEffect(() => {
    setBudget(budgetEdit);
  }, [budgetEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBudget({ ...budget, [name]: value });
  };

  const saveBudget = async (itemsBudget) => {
    /* const dataItemsBudget = itemsBudget.map(
      ({
        _id,
        purchasePrice,
        salePrice,
        quantity,
        expiration,
        brand,
        batch,
      }) => ({
        sku: _id,
        itemPurchasePrice: purchasePrice,
        itemSalePrice: salePrice,
        quantity,
        expiration,
        brand,
        batch,
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

    navigate("/budgets"); */
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getBudget(id));
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
      {budget && (
        <>
          <h3 className="--mt">Modificacion del presupuesto aprobado</h3>
          <BudgetForm
            isEdit={true}
            budget={budget}
            handleInputChange={handleInputChange}
            saveBudget={saveBudget}
            clients={clients}
            setBudget={setBudget}
            items={items}
          />
        </>
      )}
    </div>
  );
};

export default BudgetModified;
