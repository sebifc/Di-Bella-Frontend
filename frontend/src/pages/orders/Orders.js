import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../../components/order/OrderList/OrderList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getOrders } from "../../redux/features/order/orderSlice";

const Orders = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getOrders());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <OrderList orders={orders} isLoading={isLoading} />
    </div>
  );
};

export default Orders;
