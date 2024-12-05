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
import Modal from "../../Modal/Modal";
import saleservice from "../../../redux/features/sales/saleService";

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

const StatusSale = {
  0: "Borrador",
  1: "Venta cerrada - esperando generar remitos",
  2: "Venta cerrada - remitos generados",
};

const SaleDetail = () => {
  const [modal, setModal] = useState(false);
  useRedirectLoggedOutUser("/login");
  const [saleData, setSaleData] = useState(SALE_DATA);
  const [pendingItems, setPendingItems] = useState([]);
  const [inputQuantities, setInputQuantities] = useState({});
  const [timeRange, setTimeRange] = useState("");
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
      fetchPendingItems(id);
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const fetchPendingItems = async (saleId) => {
    try {
      const { pendingItems } = await saleservice.getPendingItems(saleId);

      setPendingItems(pendingItems);
    } catch (error) {
      console.error("Error al obtener ítems pendientes:", error);
    }
  };

  const handleInputChange = ({ sku }, value) => {
    setInputQuantities({
      ...inputQuantities,
      [sku]: value,
    });
  };

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

  const handleSubmit = async () => {
    const itemsToRemit = pendingItems.map((item) => ({
      sku: item.sku._id,
      quantity: parseInt(inputQuantities[item.sku.sku] || 0, 10),
      pendingQuantity: item.pendingQuantity,
      deliveryQuantity: item.deliveredQuantity,
    }));

    // Filtrar solo los ítems con cantidades mayores a 0
    const validItems = itemsToRemit.filter(
      (item) => item.quantity > 0 && item.quantity <= item.pendingQuantity
    );

    if (validItems.length > 0) {
      try {
        // Llamada a createRemito con los ítems válidos
        const response = await saleservice.createRemito({
          saleId: id,
          items: validItems,
          timeRange,
        });

        console.log("Remito creado exitosamente:", response);

        // Lógica para cerrar el modal si es necesario
        setModal(false);
        navigate("/sales");
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else {
      alert("Por favor, ingrese una cantidad válida para al menos un ítem.");
    }
  };

  const setColorStatus = (status) => {
    if (status === 0) {
      return "var(--color-info)";
    } else if (status === 1) {
      return "var(--color-danger)";
    } else if (status === 2) {
      return "var(--color-success)";
    }
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
                <b>&rarr; Estado : </b>{" "}
                <span style={{ color: setColorStatus(sale.status) }}>
                  {StatusSale[sale.status]}
                </span>
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
                  defaultValue={sale.invoiceNumber}
                  onChange={handleChange}
                />

                <label>Plazo de entrega:</label>
                <input
                  type="text"
                  name="deliveryTime"
                  required
                  defaultValue={sale.deliveryTime}
                  onChange={handleChange}
                />

                <label>Lugar de entrega:</label>
                <input
                  type="text"
                  name="deliveryPlace"
                  required
                  defaultValue={sale.deliveryPlace}
                  onChange={handleChange}
                />

                <label>Quien recibe:</label>
                <input
                  type="text"
                  name="receivingDelivery"
                  required
                  defaultValue={sale.receivingDelivery}
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
                  <div className="--my">
                    <button
                      type="button"
                      className="--btn --btn-primary"
                      onClick={() => setModal(true)}
                      disabled={pendingItems.length === 0}
                    >
                      Generar Remito
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

      <Modal openModal={modal} maxWidth={"700px"}>
        <div className="modal-content">
          <h4>Ítems Pendientes</h4>

          {/* timeRange */}
          <label>Rango de horario de entrega</label>
          <input
            type="text"
            name="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          />

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Cantidad Pendiente</th>
                  <th>Cantidad a Remitir</th>
                </tr>
              </thead>
              <tbody>
                {pendingItems.length > 0 &&
                  pendingItems.map((item, index) => (
                    <tr key={index}>
                      <td>{getLabelItem(item.sku)}</td>
                      <td>{item.pendingQuantity}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={inputQuantities[item.sku.sku] || 0}
                          onChange={(e) =>
                            handleInputChange(item.sku, e.target.value)
                          }
                          placeholder="0"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="modal-buttons">
              <button
                className="--btn --btn-danger"
                type="button"
                onClick={() => {
                  setInputQuantities({});
                  setTimeRange("");
                  setModal(false);
                }}
              >
                Cerrar
              </button>

              <button
                className="--btn --btn-primary"
                type="button"
                onClick={handleSubmit}
                disabled={
                  !timeRange || Object.keys(inputQuantities).length === 0
                }
              >
                Crear Remito
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SaleDetail;
