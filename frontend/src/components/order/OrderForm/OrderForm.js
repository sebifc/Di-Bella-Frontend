import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getItems } from "../../../redux/features/items/itemSlice";
import { getSuppliers } from "../../../redux/features/supplier/supplierSlice";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import "./OrderForm.scss";
import moment from "moment";
import Select from "react-select";
import Modal from "../../Modal/Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const OrderForm = ({
  order,
  handleInputChange,
  saveOrder,
  handeSelectChange,
  handleItemsChange,
  isEdit = false,
}) => {
  const [modal, setModal] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);
  const [item, setItem] = useState({
    item: "",
    minimumUnit: "",
    brand: "",
    ean13: "",
    batch: "",
    expiration: "",
    itemPurchasePrice: "",
  });
  const [orderItems, setOrderItems] = useState(isEdit ? order?.sku : []);

  const handleInputItemChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectItemChange = (selectedOption) => {
    setItem({
      ...item,
      item: selectedOption.value,
    });
  };

  const handleSave = () => {
    if (!item.item || !item.minimumUnit) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (isEditItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem._id === item._id ? item : orderItem
        )
      );
    } else setOrderItems([...orderItems, item]);

    setItem({
      item: "",
      minimumUnit: "",
      brand: "",
      ean13: "",
      batch: "",
      expiration: "",
      itemPurchasePrice: "",
    });
    setModal(false);
    setIsEditItem(false);
  };

  useEffect(() => {
    handleItemsChange(orderItems);
  }, [orderItems]);

  const types = {
    0: "A cargo nuestro",
    1: "A cargo del proveedor",
  };
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {
    items,
    isLoading: { isLoadingItem },
    isError: { isErrorItem },
    message: { messageItem },
  } = useSelector((state) => state.item);

  const {
    suppliers,
    isLoading: { isLoadingSupplier },
    isError: { isErrorSupplier },
    message: { messageSupplier },
  } = useSelector((state) => state.supplier);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getItems());
      dispatch(getSuppliers());
    }

    if (isErrorItem) {
      console.log(messageItem);
    }
  }, [
    isLoggedIn,
    isErrorItem,
    messageItem,
    dispatch,
    isErrorSupplier,
    messageSupplier,
  ]);

  const validateButton = () => {
    return order?.sku?.length === 0;
  };

  const getDefaultValueSupplier = () => {
    return order?.supplier?.length > 0
      ? suppliers
          .filter((supplier) => order?.supplier?.includes(supplier._id))
          .map((supplier) => ({
            value: supplier._id,
            label: supplier.name,
          }))
      : null;
  };

  const getLabelItem = (orderItem) => {
    const item = items.find((item) => item._id === orderItem.item);
    return item ? `${item.sku} - ${item.category} - ${item.presentation}` : "";
  };

  return (
    <div className="add-order">
      {(isLoadingItem || isLoadingSupplier) && <Loader />}
      <Card cardClass={"card"}>
        <form onSubmit={saveOrder}>
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
                  {isEdit && <th>Acciones</th>}
                </tr>
              </thead>

              <tbody>
                {orderItems.length > 0 &&
                  orderItems.map((orderItem, index) => (
                    <tr key={index}>
                      <td>{getLabelItem(orderItem)}</td>
                      <td>{orderItem.minimumUnit}</td>
                      <td>{orderItem.itemPurchasePrice}$</td>
                      <td>{orderItem.brand}</td>
                      <td>{orderItem.batch}</td>
                      <td>{orderItem.ean13}</td>
                      <td>{orderItem.expiration}</td>
                      {isEdit && (
                        <td>
                          <button
                            type="button"
                            className="--btn --btn-danger"
                            onClick={() =>
                              setOrderItems(
                                orderItems.filter(
                                  (item) => item !== orderItems[index]
                                )
                              )
                            }
                          >
                            <FaTrashAlt />
                          </button>
                          <button
                            type="button"
                            className="--btn --btn-primary"
                            onClick={() => {
                              setItem(orderItem);
                              setIsEditItem(true);
                              setModal(true);
                            }}
                          >
                            <FaEdit />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
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
              </tbody>
            </table>
          </div>

          <Modal openModal={modal}>
            <label>SKUs</label>
            <select
              name="sku"
              value={item.item}
              onChange={({ target: { value } }) => {
                setItem({
                  ...item,
                  item: value,
                });
              }}
            >
              <option value="" disabled>
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
              placeholder="Cantidad"
              name="minimumUnit"
              value={item.minimumUnit}
              onChange={handleInputItemChange}
            />

            <label>Marca:</label>
            <input
              type="text"
              placeholder="Marca"
              name="brand"
              value={item.brand}
              onChange={handleInputItemChange}
            />

            <label>EAN13:</label>
            <input
              type="number"
              maxLength={13}
              placeholder="EAN13"
              name="ean13"
              value={item.ean13}
              onChange={handleInputItemChange}
            />

            <label>Lote:</label>
            <input
              type="text"
              placeholder="Lote"
              name="batch"
              value={item.batch}
              onChange={handleInputItemChange}
            />

            <label>Vencimiento:</label>
            <input
              type="date"
              placeholder="Vencimiento"
              name="expiration"
              value={
                item.expiration
                  ? moment(item.expiration).format("YYYY-MM-DD")
                  : ""
              }
              onChange={handleInputItemChange}
            />

            <label>Precio de compras del ítem (sin IVA):</label>
            <input
              type="number"
              placeholder="Precio"
              name="itemPurchasePrice"
              value={item.itemPurchasePrice}
              onChange={handleInputItemChange}
            />

            <div className="--flex-center">
              <button
                className="--btn --btn-primary"
                type="button"
                onClick={handleSave}
              >
                Guardar
              </button>

              <button
                className="--btn --btn-danger"
                type="button"
                onClick={() => setModal(false)}
              >
                Cerrar
              </button>
            </div>
          </Modal>

          {/* <label>SKUs</label>
          <Select
            value={getDefaultValueSku()}
            isMulti
            name="sku"
            options={items.map((sku) => ({
              value: sku._id,
              label: `${sku.sku} - ${sku.category} - ${sku.presentation}`,
            }))}
            onChange={(value) => handeSelectChange(value, "sku")}
            className="basic-multi-select"
            classNamePrefix="select"
          />

          <label>Cantidad:</label>
          <input
            type="number"
            placeholder="Cantidad"
            name="minimumUnit"
            value={order?.minimumUnit}
            onChange={handleInputChange}
          />

          <label>Marca:</label>
          <input
            type="text"
            placeholder="Marca"
            name="brand"
            value={order?.brand}
            onChange={handleInputChange}
          />

          <label>EAN13:</label>
          <input
            type="text"
            maxLength={13}
            placeholder="EAN13"
            name="ean13"
            value={order?.ean13}
            onChange={handleInputChange}
          />

          <label>Lote:</label>
          <input
            type="text"
            placeholder="Lote"
            name="batch"
            value={order?.batch}
            onChange={handleInputChange}
          />

          <label>Vencimiento:</label>
          <input
            type="date"
            placeholder="Vencimiento"
            name="expiration"
            value={
              order?.expiration
                ? moment(order?.expiration).format("YYYY-MM-DD")
                : ""
            }
            onChange={handleInputChange}
          /> */}

          <label>Proveedor</label>
          <Select
            value={getDefaultValueSupplier()}
            isMulti
            name="supplier"
            options={suppliers.map((supp) => ({
              value: supp._id,
              label: supp.name,
            }))}
            onChange={(value) => handeSelectChange(value, "supplier")}
            className="basic-multi-select"
            classNamePrefix="select"
          />

          <label>Remito:</label>
          <input
            type="text"
            placeholder="Remito"
            name="refer"
            value={order?.refer}
            onChange={handleInputChange}
          />

          <label>Numero de Factura:</label>
          <input
            type="text"
            placeholder="Numero de Factura"
            name="invoiceNumber"
            value={order?.invoiceNumber}
            onChange={handleInputChange}
          />

          {/* <label>Precio de compras del ítem (sin IVA):</label>
          <input
            type="number"
            placeholder="Precio"
            name="itemPurchasePrice"
            value={order?.itemPurchasePrice}
            onChange={handleInputChange}
          /> */}

          <label>Transporte:</label>
          <select
            name="transport"
            value={order?.transport}
            onChange={handleInputChange}
            placeholder="Transporte"
          >
            {Object.keys(types).map((key) => (
              <option key={key} value={key}>
                {types[key]}
              </option>
            ))}
          </select>

          <label>Condiciones higiénicas del transporte:</label>
          <textarea
            type="text"
            placeholder="Condiciones..."
            name="hygienic"
            value={order?.hygienic}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button
              type="submit"
              className="--btn --btn-primary"
              disabled={validateButton()}
            >
              Guardar Compra
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

OrderForm.modules = {
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
OrderForm.formats = [
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

export default OrderForm;
