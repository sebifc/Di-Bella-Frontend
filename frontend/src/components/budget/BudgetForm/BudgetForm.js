import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./BudgetForm.scss";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../../Modal/Modal";
import stockService from "../../../redux/features/stock/stockServices";

const BudgetForm = ({
  budget,
  handleInputChange,
  saveBudget,
  clients,
  setBudget,
  items,
}) => {
  const ProspectStatus = {
    0: "Borrador",
    1: "Rechazado",
    2: "Aprobado",
    3: "Aprobado con Modificaciones",
  };

  const PaymentMethods = {
    0: "Efectivo contra entrega",
    1: "Transferencia contraentrega",
    2: "Transferencia a 30 dias",
    3: "Cheque a 30 dias",
    4: "Cheque a 60 dias",
  };
  const defaultCheckStock = {
    sku: "",
    quantity: 0,
    available: 0,
    loading: false,
    message: "",
  };
  const [itemsBudget, setItemsBudget] = useState([]);
  const [modal, setModal] = useState(false);
  const [checkStock, setCheckStock] = useState(defaultCheckStock);

  const getLabelItem = (item) => {
    return item ? `${item.sku} - ${item.category} - ${item.presentation}` : "";
  };

  const verify = async () => {
    setCheckStock({ ...checkStock, loading: true });
    const { available } = await stockService.checkStockAvailability(
      checkStock.sku,
      checkStock.quantity
    );

    setCheckStock({
      ...checkStock,
      available,
      loading: false,
      message: available ? "Hay stock ✅" : "Stock insuficiente ❌",
    });
  };

  const addItem = async () => {
    const response = await stockService.getInfoAndPrice(checkStock.sku);

    const item = {
      ...response.item,
      quantity: parseInt(checkStock.quantity),
      price: response.stockInfo.purchasePrice,
      total: response.stockInfo.purchasePrice * checkStock.quantity,
    };

    if (response.available) {
      setItemsBudget([...itemsBudget, item]);
    }
    setCheckStock(defaultCheckStock);
    setModal(false);
  };

  const delItem = (id) => {
    setItemsBudget(itemsBudget.filter((item) => item._id !== id));
  };

  const getTotal = () => {
    return itemsBudget.reduce((total, item) => total + item.total, 0);
  };

  const disabledSaveBudget = () => {
    return !(
      budget.client &&
      budget.status !== null &&
      budget.paymentMethod !== null &&
      itemsBudget.length > 0
    );
  };

  return (
    <div className="add-budget">
      <Card cardClass={"card"}>
        <form onSubmit={saveBudget}>
          <label>Cliente:</label>
          <select
            name="client"
            value={budget.client}
            onChange={(e) => {
              handleInputChange(e);
              const client = clients.find(
                (client) => client._id === e.target.value
              );
              setBudget({
                ...budget,
                paymentMethod: client.paymentCondition,
                client: client._id,
              });
            }}
          >
            <option selected value="" disabled>
              -- Seleccione --
            </option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>

          <label>Estado del Prospecto:</label>
          <select
            name="status"
            value={budget.status}
            onChange={handleInputChange}
          >
            <option selected value="" disabled>
              -- Seleccione --
            </option>
            {Object.keys(ProspectStatus).map((key) => (
              <option key={key} value={key}>
                {ProspectStatus[key]}
              </option>
            ))}
          </select>

          <label>Metodo de Pago:</label>
          <select
            name="paymentMethod"
            value={budget.paymentMethod}
            onChange={handleInputChange}
          >
            <option selected value="" disabled>
              -- Seleccione --
            </option>
            {Object.keys(PaymentMethods).map((key) => (
              <option key={key} value={key}>
                {PaymentMethods[key]}
              </option>
            ))}
          </select>

          <h4>Items</h4>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {itemsBudget.length > 0 &&
                  itemsBudget.map((ib, index) => (
                    <tr key={index}>
                      <td>{getLabelItem(ib)}</td>
                      <td>{ib.price}$</td>
                      <td>{ib.quantity}</td>
                      <td>{ib.total}$</td>
                      <td>
                        <button
                          type="button"
                          className="--btn --btn-danger"
                          onClick={() => {
                            delItem(ib._id);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{getTotal()}$</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={"8"}>
                    <button
                      type="button"
                      className="--btn --btn-primary --width-100"
                      onClick={() => setModal(true)}
                    >
                      Agregar item
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <Modal openModal={modal}>
            <div className="add-budget__modal --dir-column">
              <h3>Agregar Item</h3>
              <p>
                Antes de agregar un item, verificaremos que haya disponibilidad
              </p>

              <label>Item:</label>
              <select
                name="sku"
                value={checkStock.sku}
                onChange={(e) =>
                  setCheckStock({
                    ...checkStock,
                    sku: e.target.value,
                    message: "",
                    available: false,
                  })
                }
              >
                <option selected value="" disabled>
                  -- Seleccione --
                </option>
                {items.map((sku) => (
                  <option key={sku._id} value={sku._id}>
                    {sku.sku} - {sku.category} - {sku.presentation}
                  </option>
                ))}
              </select>

              <label>Cantidad:</label>
              <input
                type="number"
                placeholder="Ingrese la cantidad"
                value={checkStock.quantity}
                onChange={(e) =>
                  setCheckStock({
                    ...checkStock,
                    quantity: e.target.value,
                    message: "",
                    available: false,
                  })
                }
              />

              <button
                className="--btn --btn-primary"
                type="button"
                disabled={!checkStock.sku || !checkStock.quantity}
                onClick={verify}
              >
                Verificar disponibilidad
              </button>

              {checkStock.loading && (
                <p className="--my">Verificando disponibilidad...</p>
              )}

              {checkStock.message && (
                <p className="--my">{checkStock.message}</p>
              )}

              <div className="add-budget__modal-actions">
                <button
                  className="--btn --btn-danger"
                  type="button"
                  onClick={() => {
                    setCheckStock(defaultCheckStock);
                    setModal(false);
                  }}
                >
                  Cerrar
                </button>

                <button
                  className="--btn --btn-primary"
                  type="button"
                  onClick={addItem}
                  disabled={!checkStock.available}
                >
                  Guardar
                </button>
              </div>
            </div>
          </Modal>

          <div className="--my">
            <button
              type="submit"
              className="--btn --btn-primary"
              disabled={disabledSaveBudget()}
              onClick={(e) => {
                e.preventDefault();
                saveBudget(itemsBudget);
              }}
            >
              Crear Presupuesto
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

BudgetForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
BudgetForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default BudgetForm;
