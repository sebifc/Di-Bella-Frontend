import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getOrder } from "../../../redux/features/order/orderSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./OrderDetail.scss";

const OrderDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getOrder(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const getSuppliersNames = (suppliers) => {
    const supplierNames = suppliers.map((supplier) => supplier.name);
    return supplierNames.join(", ");
  };

  const getItemsSKU = (skus) => {
    const skuNames = skus.map((sku) => sku.sku);
    return skuNames.join(", ");
  };

  const getTransport = () => {
    const types = {
      0: "A cargo nuestro",
      1: "A cargo del proveedor",
    };

    return types[order.transport];
  };

  return (
    <div className="order-detail">
      <h3 className="--mt">Detalle de la compra</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {order && (
          <div className="detail">
            <h4>
              <span className="badge">Factura de Compra Nro: </span> &nbsp;{" "}
              {order.invoiceNumber}
            </h4>
            <p>
              <b>&rarr; SKUs : </b> {getItemsSKU(order.sku)}
            </p>
            <p>
              <b>&rarr; Unidad minima : </b> {order.minimumUnit}
            </p>
            <p>
              <b>&rarr; Marca : </b> {order.brand}
            </p>
            <p>
              <b>&rarr; EAN13 : </b> {order.ean13}
            </p>
            <p>
              <b>&rarr; Lote : </b> {order.batch}
            </p>
            <p>
              <b>&rarr; Vencimiento : </b>{" "}
              {moment(order.expiration).format("DD/MM/YYYY")}
            </p>
            <p>
              <b>&rarr; Proveedores : </b> {getSuppliersNames(order.supplier)}
            </p>
            <p>
              <b>&rarr; Remito : </b> {order.refer}
            </p>
            <p>
              <b>&rarr; Precio de compras del ítem (sin IVA) : </b> $
              {order.itemPurchasePrice}
            </p>
            <p>
              <b>&rarr; Transporte : </b> {getTransport()}
            </p>
            <p>
              <b>&rarr; Condiciones higiénicas del transporte : </b>{" "}
              {order.hygienic}
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
