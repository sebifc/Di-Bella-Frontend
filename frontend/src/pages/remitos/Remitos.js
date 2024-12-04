import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemitoList from "../../components/remito/RemitoList/RemitoList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getRemitos } from "../../redux/features/remitos/remitoSlice";

const Remitos = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { remitos, isLoading, isError, message } = useSelector(
    (state) => state.remito
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getRemitos());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <RemitoList remitos={remitos} isLoading={isLoading} />
    </div>
  );
};

export default Remitos;
