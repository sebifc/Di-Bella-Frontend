import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValuedList from "../../components/valued/ValuedList/ValuedList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getValueds } from "../../redux/features/valueds/valuedSlice";

const Valued = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { valueds, isLoading, isError, message } = useSelector(
    (state) => state.valued
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getValueds());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ValuedList valueds={valueds} isLoading={isLoading} />
    </div>
  );
};

export default Valued;
