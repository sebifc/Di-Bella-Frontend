import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getSuppliers } from "../../redux/features/supplier/supplierSlice";
import SupplierList from "../../components/supplier/SupplierList/SuppliertList";

const Suppliers = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { suppliers, isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSuppliers());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <SupplierList suppliers={suppliers} isLoading={isLoading} />
    </div>
  );
};

export default Suppliers;
