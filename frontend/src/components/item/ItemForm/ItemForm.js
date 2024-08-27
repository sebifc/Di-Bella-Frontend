import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ItemForm.scss";

const ItemForm = ({ item, handleInputChange, saveItem }) => {
  return (
    <div className="add-item">
      <Card cardClass={"card"}>
        <form onSubmit={saveItem}>
          <label>SKU:</label>
          <input
            type="text"
            placeholder="SKU"
            name="sku"
            required
            value={item?.sku}
            onChange={handleInputChange}
          />

          <label>Categoria:</label>
          <input
            type="text"
            placeholder="Categoria"
            name="category"
            value={item?.category}
            onChange={handleInputChange}
          />

          <label>Descripción:</label>
          <input
            type="text"
            placeholder="Descripción"
            name="description"
            value={item?.description}
            onChange={handleInputChange}
          />

          <label>Presentación:</label>
          <input
            type="text"
            placeholder="Presentación"
            name="presentation"
            value={item?.presentation}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Item
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ItemForm.modules = {
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
ItemForm.formats = [
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

export default ItemForm;
