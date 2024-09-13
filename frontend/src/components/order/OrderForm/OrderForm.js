import React, { useEffect } from "react";
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

const OrderForm = ({
  order,
  handleInputChange,
  saveOrder,
  handeSelectChange,
}) => {
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
    if (
      order?.sku?.length === 0 ||
      !order?.minimumUnit
    ) {
      return true;
    } else {
      return false;
    }
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

  const getDefaultValueSku = () => {
    return order?.sku?.length > 0
      ? items
          .filter((sku) => order?.sku?.includes(sku._id))
          .map((sku) => ({
            value: sku._id,
            label: sku.sku,
          }))
      : null;
  };

  return (
    <div className="add-order">
      {(isLoadingItem || isLoadingSupplier) && <Loader />}
      <Card cardClass={"card"}>
        <form onSubmit={saveOrder}>
          <label>SKUs</label>
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
          />

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

          <label>Precio de compras del ítem (sin IVA):</label>
          <input
            type="number"
            placeholder="Precio"
            name="itemPurchasePrice"
            value={order?.itemPurchasePrice}
            onChange={handleInputChange}
          />

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
