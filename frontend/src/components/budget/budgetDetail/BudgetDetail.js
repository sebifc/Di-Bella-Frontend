import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getBudget } from "../../../redux/features/budgets/budgetSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./BudgetDetail.scss";
import moment from "moment";
import { AiFillFilePdf } from "react-icons/ai";

const ProspectStatusValues = Object.freeze({
  0: "Borrador",
  1: "Rechazado",
  2: "Aprobado",
  3: "Aprobado con Modificaciones",
});

const PaymentMethodsValues = Object.freeze({
  0: "Efectivo contra entrega",
  1: "Transferencia contraentrega",
  2: "Transferencia a 30 dias",
  3: "Cheque a 30 dias",
  4: "Cheque a 60 dias",
});

const Sellers = {
  0: "DIANA COCH",
  1: "FERNANDO PAZZANO",
  2: "LUCILA DI BELLA",
  3: "VENDEDOR EXTERNO",
};

const BudgetDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { budget, isLoading, isError, message } = useSelector(
    (state) => state.budget
  );

  const [showPrice, setShowPrice] = useState(true);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getBudget(id));
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

  useEffect(() => {
    window.onafterprint = () => {
      setShowPrice(true);
    };
  }, []);

  return (
    <div className="budget-detail --mt">
      <div className="print-buttons budget-detail__header">
        <button
          type="button"
          className="--btn --btn-danger"
          onClick={() => {
            setShowPrice(false);
            setTimeout(() => {
              window.print();
            }, 0);
          }}
        >
          Exportar PDF Cliente
          <AiFillFilePdf className="--ml" />
        </button>
        <button
          type="button"
          className="--btn --btn-danger"
          onClick={() => {
            window.print();
          }}
        >
          Exportar PDF Interno
          <AiFillFilePdf className="--ml" />
        </button>
      </div>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {budget && (
          <div>
            <div className="--flex-between">
              <h3>Presupuesto N° {budget && budget.budgetId}</h3>
              <img src="/logo.jpg" alt="logo" width={100} />
            </div>
            <div className="detail">
              <p>
                <b>&rarr; Cliente : </b> {budget.client.name}
              </p>
              <p>
                <b>&rarr; Fecha : </b>{" "}
                {moment(budget.budgetDate).format("DD/MM/YYYY")}
              </p>
              <p>
                <b>&rarr; Estado : </b>{" "}
                {ProspectStatusValues[budget.prospectStatus]}
              </p>
              <p>
                <b>&rarr; Metodo de pago : </b>{" "}
                {PaymentMethodsValues[budget.paymentMethod]}
              </p>
              <p>
                <b>&rarr; Vendedor : </b> {Sellers[budget.seller]}
              </p>

              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>Marca</th>
                      <th>Expiración</th>
                      {showPrice && <th>Precio de Compra</th>}
                      <th>Cantidad</th>
                      <th>Precio de Venta</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget.items.length > 0 &&
                      budget.items.map((item, index) => (
                        <tr key={index}>
                          <td>{getLabelItem(item.sku)}</td>
                          <td>{item.brand}</td>
                          <td>
                            {moment(item.expiration).format("DD/MM/YYYY")}
                          </td>
                          {showPrice && (
                            <td>{numberToPrice(item.itemPurchasePrice)}</td>
                          )}
                          <td>{item.quantity}</td>
                          <td>{numberToPrice(item.itemSalePrice)}</td>
                          <td>
                            {numberToPrice(item.itemSalePrice * item.quantity)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="print-info">
                <hr />
                <code className="--color-dark">
                  Created on: {budget.createdAt.toLocaleString("en-US")}
                </code>
                <br />
                <code className="--color-dark">
                  Last Updated: {budget.updatedAt.toLocaleString("en-US")}
                </code>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BudgetDetail;
