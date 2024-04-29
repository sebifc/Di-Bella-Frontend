import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getOrder } from "../../../redux/features/order/orderSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./OrderDetail.scss";
import { getSupplier } from "../../../redux/features/supplier/supplierSlice";

const OrderDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order
  );
  // TODO : get supplier
  const { supplier } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getOrder(id));
      dispatch(getSupplier(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="order-detail">
      <h3 className="--mt">Detalle de la compra</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {order && (
          <div className="detail">
            <h4>
              <span className="badge">Nombre: </span> &nbsp; {order.name}
            </h4>
            <p>
              <b>&rarr; Razón Social : </b> {order.businessName}
            </p>
            <p>
              <b>&rarr; CUIT : </b> {order.cuit}
            </p>
            <p>
              <b>&rarr; Contacto : </b> {order.contact}
            </p>
            <p>
              <b>&rarr; Dirección : </b> {order.address}
            </p>
            <p>
              <b>&rarr; Email : </b> {order.email}
            </p>
            <p>
              <b>&rarr; Telefono : </b> {order.phone}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {order.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {order.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OrderDetail;
