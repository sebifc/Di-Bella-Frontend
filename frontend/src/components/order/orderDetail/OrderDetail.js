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
    if (!suppliers) return "Sin Proveedores";
    const supplierNames = suppliers.map((supplier) => supplier.name);
    return supplierNames.join(", ");
  };

  const getTransport = () => {
    const types = {
      0: "A cargo nuestro",
      1: "A cargo del proveedor",
    };

    return types[order.transport];
  };

  const getLabelItem = ({ item }) => {
    return `${item?.sku} - ${item?.category} - ${item?.presentation}`;
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

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Marca</th>
                    <th>Lote</th>
                    <th>EAN13</th>
                    <th>Expiración</th>
                  </tr>
                </thead>

                <tbody>
                  {order.sku.length > 0 &&
                    order.sku.map((orderItem, index) => (
                      <tr key={index}>
                        <td>{getLabelItem(orderItem)}</td>
                        <td>{orderItem.minimumUnit}</td>
                        <td>{orderItem.itemPurchasePrice}$</td>
                        <td>{orderItem.brand}</td>
                        <td>{orderItem.batch}</td>
                        <td>{orderItem.ean13}</td>
                        <td>
                          {orderItem.expiration
                            ? moment(orderItem.expiration).format("DD/MM/YYYY")
                            : "Sin fecha de vencimiento"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p>
              <b>&rarr; Proveedores : </b> {getSuppliersNames(order.supplier)}
            </p>
            <p>
              <b>&rarr; Remito : </b> {order.refer}
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
