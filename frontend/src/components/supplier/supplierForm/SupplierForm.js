import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./SupplierForm.scss";

const SupplierForm = ({ supplier, handleInputChange, saveSupplier }) => {
  const types = {
    0: "Fabrica",
    1: "Importador",
    2: "Distribuidor",
    3: "Otros",
  };
  return (
    <div className="add-supplier">
      <Card cardClass={"card"}>
        <form onSubmit={saveSupplier}>
          <label>Nombre del Proveedor:</label>
          <input
            required
            type="text"
            placeholder="Nombre del Proveedor"
            name="name"
            value={supplier?.name}
            onChange={handleInputChange}
          />

          <label>Telefono del Proveedor:</label>
          <input
            type="number"
            placeholder="Telefono del Proveedor"
            name="phone"
            value={supplier?.phone}
            onChange={handleInputChange}
          />

          <label>CUIT del Proveedor:</label>
          <input
            type="number"
            placeholder="CUIT del Proveedor"
            name="cuit"
            value={supplier?.cuit}
            onChange={handleInputChange}
          />

          <label>Contacto del Proveedor:</label>
          <input
            type="text"
            placeholder="Contacto del Proveedor"
            name="contact"
            value={supplier?.contact}
            onChange={handleInputChange}
          />

          <label>Dirección del Proveedor:</label>
          <input
            type="text"
            placeholder="Dirección del Proveedor"
            name="address"
            value={supplier?.address}
            onChange={handleInputChange}
          />

          <label>Email del Proveedor:</label>
          <input
            type="email"
            placeholder="Email del Proveedor"
            name="email"
            value={supplier?.email}
            onChange={handleInputChange}
          />

          <label>Metodo de Pago del Proveedor:</label>
          <input
            type="text"
            placeholder="Metodo de Pago del Proveedor"
            name="paymentMethod"
            value={supplier?.paymentMethod}
            onChange={handleInputChange}
          />

          <label>Proveedor Calificado</label>
          <select
            name="qualified"
            onChange={handleInputChange}
            value={supplier?.qualified}
            placeholder="Calificado?"
          >
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>

          <label>Tipo de Proveedor</label>
          <select
            name="type"
            value={supplier?.type}
            onChange={handleInputChange}
            placeholder="Tipo de Proveedor"
          >
            {Object.keys(types).map((key) => (
              <option key={key} value={key}>
                {types[key]}
              </option>
            ))}
          </select>

          <label>Código del Proveedor</label>
          <input
            type="text"
            placeholder="Código del Proveedor"
            name="code"
            value={supplier?.code}
            onChange={handleInputChange}
          />

          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            name="description"
            value={supplier?.description}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Supplier
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

SupplierForm.modules = {
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
SupplierForm.formats = [
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

export default SupplierForm;
