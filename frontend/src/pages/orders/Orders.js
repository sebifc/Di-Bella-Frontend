import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../../components/order/OrderList/OrderList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getOrders } from "../../redux/features/order/orderSlice";
import { getSuppliers } from "../../redux/features/supplier/supplierSlice";

const Orders = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.order
  );
  const { suppliers } = useSelector((state) => state.supplier);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getOrders());
      dispatch(getSuppliers());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <OrderList orders={orders} isLoading={isLoading} suppliers={suppliers} />
    </div>
  );
};

export default Orders;
