import DOMPurify from "dompurify";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getSupplier } from "../../../redux/features/supplier/supplierSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./SupplierDetail.scss";

const SupplierDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { supplier, isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSupplier(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const getType = () => {
    const types = {
      0: "Fabrica",
      1: "Importador",
      2: "Distribuidor",
      3: "Otros",
    };

    return types[supplier.type];
  };

  return (
    <div className="supplier-detail">
      <h3 className="--mt">Detalle del proveedor</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {supplier && (
          <div className="detail">
            <h4>
              <span className="badge">Nombre: </span> &nbsp; {supplier.name}
            </h4>
            <p>
              <b>&rarr; CUIT : </b> {supplier.cuit}
            </p>
            <p>
              <b>&rarr; Telefono : </b> {supplier.phone}
            </p>
            <p>
              <b>&rarr; Contacto : </b> {supplier.contact}
            </p>
            <p>
              <b>&rarr; Dirección : </b> {supplier.address}
            </p>
            <p>
              <b>&rarr; Email : </b> {supplier.email}
            </p>
            <p>
              <b>&rarr; Forma de Pago : </b> {supplier.paymentMethod}
            </p>
            <p>
              <b>&rarr; Calificado : </b> {supplier.qualified ? "Si" : "No"}
            </p>
            <p>
              <b>&rarr; Tipo : </b> {getType()}
            </p>
            <p>
              <b>&rarr; Código : </b> {supplier.code}
            </p>
            <p>
              <b>&rarr; Descripción : </b> {supplier.description}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {supplier.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {supplier.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SupplierDetail;
