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
    };

    return types[client.type];
  };

  const getOriginContact = () => {
    const origins = {
      0: "Fernando Pazzano",
      1: "Lucila Di Bella",
      2: "Vendedor externo",
      3: "Redes sociales",
      4: "Mercado Libre",
    };

    return origins[client.originContact];
  };

  const getPaymentCondition = () => {
    const conditions = {
      0: "Efectivo contra entrega",
      1: "Transferencia contraentrega",
      2: "Transferencia a 30 dias",
      3: "Cheque a 30 dias",
      4: "Cheque a 60 dias",
    };

    return conditions[client.paymentCondition];
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
              <b>&rarr; Email 2 : </b> {client.email2}
            </p>
            <p>
              <b>&rarr; Email 3 : </b> {client.email3}
            </p>
            <p>
              <b>&rarr; Telefono : </b> {client.phone}
            </p>
            <p>
              <b>&rarr; Tipo : </b> {getType()}
            </p>
            <p>
              <b>&rarr; Origen del contacto : </b> {getOriginContact()}
            </p>
            <p>
              <b>&rarr; Condición de pago acordada : </b>{" "}
              {getPaymentCondition()}
            </p>
            <p>
              <b>&rarr; Observaciones : </b> {client.observations}
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
