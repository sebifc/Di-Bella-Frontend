import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getBudget } from "../../../redux/features/budgets/budgetSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./BudgetDetail.scss";
import moment from "moment";

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

const BudgetDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { budget, isLoading, isError, message } = useSelector(
    (state) => state.budget
  );

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

  return (
    <div className="budget-detail">
      <h3 className="--mt">Presupuesto N° {budget && budget.budgetId}</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {budget && (
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

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {budget.items.length > 0 &&
                    budget.items.map((item, index) => (
                      <tr key={index}>
                        <td>{getLabelItem(item.sku)}</td>
                        <td>{item.itemPurchasePrice}$</td>
                        <td>{item.quantity}</td>
                        <td>{item.itemPurchasePrice * item.quantity}$</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <hr />
            <code className="--color-dark">
              Created on: {budget.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {budget.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BudgetDetail;
