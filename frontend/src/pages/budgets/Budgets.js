import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetList from "../../components/budget/BudgetList/BudgetList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getBudgets } from "../../redux/features/budgets/budgetSlice";

const Budgets = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { budgets, isLoading, isError, message } = useSelector(
    (state) => state.budget
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getBudgets());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <BudgetList budgets={budgets} isLoading={isLoading} />
    </div>
  );
};

export default Budgets;
