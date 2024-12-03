import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { updateSale, getSale } from "../../../redux/features/sales/saleSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./SaleDetail.scss";
import moment from "moment";

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

const SALE_DATA = {
  invoiceNumber: "",
  deliveryTime: "",
  deliveryPlace: "",
  receivingDelivery: "",
};

const SaleDetail = () => {
  useRedirectLoggedOutUser("/login");
  const [saleData, setSaleData] = useState(SALE_DATA);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { sale, isLoading, isError, message } = useSelector(
    (state) => state.sale
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSale(id));
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

  const handleChange = (e) => {
    setSaleData({ ...saleData, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    e.preventDefault();

    await dispatch(updateSale({ formData: saleData, id }));

    navigate("/sales");
  };

  return (
    <div className="sale-detail --mt">
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {sale && (
          <div>
            <div className="--flex-between">
              <h3>Venta N° {sale && sale.saleId}</h3>
              <img src="/logo.jpg" alt="logo" width={100} />
            </div>
            <div className="detail">
              <p>
                <b>&rarr; Cliente : </b> {sale.client.name}
              </p>
              <p>
                <b>&rarr; Fecha : </b>{" "}
                {moment(sale.saleDate).format("DD/MM/YYYY")}
              </p>
              <p>
                <b>&rarr; Metodo de pago : </b>{" "}
                {PaymentMethodsValues[sale.paymentMethod]}
              </p>
              <p>
                <b>&rarr; Vendedor : </b> {Sellers[sale.seller]}
              </p>

              <form onSubmit={save}>
                <label>Numero de factura:</label>
                <input
                  type="number"
                  name="invoiceNumber"
                  value={sale.invoiceNumber}
                  onChange={handleChange}
                />

                <label>Plazo de entrega:</label>
                <input
                  type="text"
                  name="deliveryTime"
                  required
                  value={sale.deliveryTime}
                  onChange={handleChange}
                />

                <label>Lugar de entrega:</label>
                <input
                  type="text"
                  name="deliveryPlace"
                  required
                  value={sale.deliveryPlace}
                  onChange={handleChange}
                />

                <label>Quien recibe:</label>
                <input
                  type="text"
                  name="receivingDelivery"
                  required
                  value={sale.receivingDelivery}
                  onChange={handleChange}
                />

                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Marca</th>
                        <th>Expiración</th>
                        <th>Precio de Compra</th>
                        <th>Cantidad</th>
                        <th>Precio de Venta</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sale.items.length > 0 &&
                        sale.items.map((item, index) => (
                          <tr key={index}>
                            <td>{getLabelItem(item.sku)}</td>
                            <td>{item.brand}</td>
                            <td>
                              {moment(item.expiration).format("DD/MM/YYYY")}
                            </td>

                            <td>{numberToPrice(item.itemPurchasePrice)}</td>

                            <td>{item.quantity}</td>
                            <td>{numberToPrice(item.itemSalePrice)}</td>
                            <td>
                              {numberToPrice(
                                item.itemSalePrice * item.quantity
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  <div className="--my">
                    <button type="submit" className="--btn --btn-primary">
                      Guardar Venta
                    </button>
                  </div>
                </div>
              </form>

              <div className="print-info">
                <hr />
                <code className="--color-dark">
                  Created on: {sale.createdAt.toLocaleString("en-US")}
                </code>
                <br />
                <code className="--color-dark">
                  Last Updated: {sale.updatedAt.toLocaleString("en-US")}
                </code>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SaleDetail;
