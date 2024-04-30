import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProducts } from "../../../redux/features/product/productSlice";
import { getSuppliers } from "../../../redux/features/supplier/supplierSlice";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import "./OrderForm.scss";
import moment from "moment";

const OrderForm = ({ order, handleInputChange, saveOrder }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {
    products,
    isLoading: { isLoadingProduct },
    isError: { isErrorProduct },
    message: { messageProduct },
  } = useSelector((state) => state.product);

  const {
    suppliers,
    isLoading: { isLoadingSupplier },
    isError: { isErrorSupplier },
    message: { messageSupplier },
  } = useSelector((state) => state.supplier);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
      dispatch(getSuppliers());
    }

    if (isErrorProduct) {
      console.log(messageProduct);
    }
  }, [
    isLoggedIn,
    isErrorProduct,
    messageProduct,
    dispatch,
    isErrorSupplier,
    messageSupplier,
  ]);

  return (
    <div className="add-order">
      {isLoadingProduct && <Loader />}
      <Card cardClass={"card"}>
        <form onSubmit={saveOrder}>
          <label>Fecha de la compra:</label>
          <input
            type="date"
            placeholder="Fecha de la compra"
            name="date"
            value={order?.date ? moment(order?.date).format("YYYY-MM-DD") : ""}
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

          <label>Numero de Factura:</label>
          <input
            type="text"
            placeholder="Numero de Factura"
            name="invoiceNumber"
            value={order?.invoiceNumber}
            onChange={handleInputChange}
          />

          <label>Producto</label>
          <select
            name="product"
            value={order?.product?._id}
            onChange={handleInputChange}
            placeholder="Producto"
          >
            <option value="">Seleccionar</option>
            {products?.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>

          <label>Proveedor</label>
          <select
            name="supplier"
            value={order?.supplier?._id}
            onChange={handleInputChange}
            placeholder="Proveedor"
          >
            <option value="">Seleccionar</option>
            {suppliers?.map((supp) => (
              <option key={supp._id} value={supp._id}>
                {supp.name}
              </option>
            ))}
          </select>

          <pre>{JSON.stringify(order, null, 4)}</pre>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
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
