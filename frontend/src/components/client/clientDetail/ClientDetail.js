import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getClient } from "../../../redux/features/client/clientSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ClientDetail.scss";

const ClientDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { client, isLoading, isError, message } = useSelector(
    (state) => state.client
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getClient(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const getType = () => {
    const types = {
      0: "Mayorista",
      1: "Minorista",
      2: "E-Commerce",
      3: "Otros",
    };

    return types[client.type];
  };

  return (
    <div className="client-detail">
      <h3 className="--mt">Detalle del proveedor</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {client && (
          <div className="detail">
            <h4>
              <span className="badge">Nombre: </span> &nbsp; {client.name}
            </h4>
            <p>
              <b>&rarr; Razón Social : </b> {client.businessName}
            </p>
            <p>
              <b>&rarr; CUIT : </b> {client.cuit}
            </p>
            <p>
              <b>&rarr; Contacto : </b> {client.contact}
            </p>
            <p>
              <b>&rarr; Dirección : </b> {client.address}
            </p>
            <p>
              <b>&rarr; Email : </b> {client.email}
            </p>
            <p>
              <b>&rarr; Telefono : </b> {client.phone}
            </p>
            <p>
              <b>&rarr; Tipo : </b> {getType()}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {client.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {client.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClientDetail;
