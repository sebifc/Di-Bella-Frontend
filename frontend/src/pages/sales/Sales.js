import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaleList from "../../components/sale/SaleList/SaleList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getSales } from "../../redux/features/sales/saleSlice";

const Sales = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { sales, isLoading, isError, message } = useSelector(
    (state) => state.sale
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSales());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <SaleList sales={sales} isLoading={isLoading} />
    </div>
  );
};

export default Sales;
