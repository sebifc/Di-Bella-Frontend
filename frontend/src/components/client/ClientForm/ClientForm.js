import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ClientForm.scss";

const ClientForm = ({ client, handleInputChange, saveClient }) => {
  const types = {
    0: "Mayorista",
    1: "Minorista",
    2: "E-Commerce",
    3: "Otros",
  };
  return (
    <div className="add-client">
      <Card cardClass={"card"}>
        <form onSubmit={saveClient}>
          <label>Nombre del Cliente:</label>
          <input
            type="text"
            placeholder="Nombre del Cliente"
            name="name"
            value={client?.name}
            onChange={handleInputChange}
          />

          <label>Razón Social del Cliente:</label>
          <input
            type="text"
            placeholder="Razón Social del Cliente"
            name="businessName"
            value={client?.businessName}
            onChange={handleInputChange}
          />

          <label>CUIT del Cliente:</label>
          <input
            type="number"
            placeholder="CUIT del Cliente"
            name="cuit"
            value={client?.cuit}
            onChange={handleInputChange}
          />

          <label>Contacto del Cliente:</label>
          <input
            type="text"
            placeholder="Contacto del Cliente"
            name="contact"
            value={client?.contact}
            onChange={handleInputChange}
          />

          <label>Dirección del Cliente:</label>
          <input
            type="text"
            placeholder="Dirección del Cliente"
            name="address"
            value={client?.address}
            onChange={handleInputChange}
          />

          <label>Email del Cliente:</label>
          <input
            type="email"
            placeholder="Email del Cliente"
            name="email"
            value={client?.email}
            onChange={handleInputChange}
          />

          <label>Localidad del Cliente:</label>
          <input
            type="text"
            placeholder="Localidad del Cliente"
            name="location"
            value={client?.location}
            onChange={handleInputChange}
          />

          <label>Telefono del Cliente:</label>
          <input
            type="number"
            placeholder="Telefono del Cliente"
            name="phone"
            value={client?.phone}
            onChange={handleInputChange}
          />

          <label>Tipo de Cliente</label>
          <select
            name="type"
            value={client?.type}
            onChange={handleInputChange}
            placeholder="Tipo de Cliente"
          >
            {Object.keys(types).map((key) => (
              <option key={key} value={key}>
                {types[key]}
              </option>
            ))}
          </select>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Client
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ClientForm.modules = {
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
ClientForm.formats = [
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

export default ClientForm;
