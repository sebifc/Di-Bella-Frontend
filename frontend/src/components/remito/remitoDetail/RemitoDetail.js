import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getRemito } from "../../../redux/features/remitos/remitoSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./RemitoDetail.scss";
import moment from "moment";
import { AiFillFilePdf } from "react-icons/ai";

const PaymentMethodsValues = Object.freeze({
  0: "Efectivo contra entrega",
  1: "Transferencia contraentrega",
  2: "Transferencia a 30 dias",
  3: "Cheque a 30 dias",
  4: "Cheque a 60 dias",
});

const RemitoDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { remito, isLoading, isError, message } = useSelector(
    (state) => state.remito
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getRemito(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const getLabelItem = (item) => {
    return item ? `${item.sku} - ${item.category} - ${item.presentation}` : "";
  };

  const numberToPrice = (number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  return (
    <div className="remito-detail --mt">
      <div className="print-buttons budget-detail__header">
        <button
          type="button"
          className="--btn --btn-danger"
          onClick={() => {
            window.print();
          }}
        >
          Exportar PDF
          <AiFillFilePdf className="--ml" />
        </button>
      </div>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {remito && (
          <div>
            <div className="--flex-between">
              <h3>Remito N° {remito && remito.remitoId}</h3>
              <img src="/logo.jpg" alt="logo" width={100} />
            </div>
            <div className="detail">
              <p>
                <b>&rarr; N° de Venta : </b> {remito.sale.saleId}
              </p>
              <p>
                <b>&rarr; Cliente : </b> {remito.client.name}
              </p>
              <p className="hide-print">
                <b>&rarr; Fecha : </b>{" "}
                {moment(remito.remitoDate).format("DD/MM/YYYY")}
              </p>
              <p>
                <b>&rarr; Metodo de pago : </b>{" "}
                {PaymentMethodsValues[remito.paymentMethod]}
              </p>
              <p>
                <b>&rarr; Numero de factura : </b> {remito.sale.invoiceNumber}
              </p>
              <p>
                <b>&rarr; Plazo de entrega : </b> {remito.sale.deliveryTime}
              </p>
              <p>
                <b>&rarr; Lugar de entrega : </b> {remito.sale.deliveryPlace}
              </p>
              <p>
                <b>&rarr; Quien recibe : </b> {remito.sale.receivingDelivery}
              </p>
              <p>
                <b>&rarr; Rango de horario de entrega : </b> {remito.timeRange}
              </p>

              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>Marca</th>
                      <th>Expiración</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remito.items.length > 0 &&
                      remito.items.map((item, index) => (
                        <tr key={index}>
                          <td>{getLabelItem(item.sku)}</td>
                          <td>{item.brand}</td>
                          <td>
                            {moment(item.expiration).format("DD/MM/YYYY")}
                          </td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div class="signatures show-print">
                <div className="signature">
                  <span>Fecha</span>
                </div>
                <div className="signature">
                  <span>Aclaracion</span>
                </div>
                <div className="signature">
                  <span>Firma</span>
                </div>
              </div>

              <div className="print-info">
                <hr />
                <code className="--color-dark">
                  Created on: {remito.createdAt.toLocaleString("en-US")}
                </code>
                <br />
                <code className="--color-dark">
                  Last Updated: {remito.updatedAt.toLocaleString("en-US")}
                </code>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RemitoDetail;
