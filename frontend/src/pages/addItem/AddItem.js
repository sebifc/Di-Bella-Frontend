import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ItemForm from "../../components/item/ItemForm/ItemForm";
import {
  createItem,
  selectIsLoading,
} from "../../redux/features/items/itemSlice";

const initialState = {
  sku: "",
  category: "",
  minimumUnit: "",
};

const AddItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sku", item?.sku);
    formData.append("category", item?.category);
    formData.append("minimumUnit", item?.minimumUnit);

    await dispatch(createItem(formData));

    navigate("/items");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agregar Nuevo Item</h3>
      <ItemForm
        item={item}
        handleInputChange={handleInputChange}
        saveItem={saveItem}
      />
    </div>
  );
};

export default AddItem;
