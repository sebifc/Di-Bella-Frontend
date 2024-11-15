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
  description: "",
  presentation: "",
};

const AddBudget = () => {
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
    formData.append("description", item?.description);
    formData.append("presentation", item?.presentation);

    await dispatch(createItem(formData));

    navigate("/items");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Crear presupuesto</h3>
      <ItemForm
        item={item}
        handleInputChange={handleInputChange}
        saveItem={saveItem}
      />
    </div>
  );
};

export default AddBudget;
