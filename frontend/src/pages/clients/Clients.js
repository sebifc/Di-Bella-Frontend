import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientList from "../../components/client/ClientList/clientList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getClients } from "../../redux/features/client/clientSlice";

const Clients = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { clients, isLoading, isError, message } = useSelector(
    (state) => state.client
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getClients());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ClientList clients={clients} isLoading={isLoading} />
    </div>
  );
};

export default Clients;
