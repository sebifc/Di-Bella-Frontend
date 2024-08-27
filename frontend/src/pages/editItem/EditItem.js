import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../../components/item/ItemForm/ItemForm";
import Loader from "../../components/loader/Loader";
import {
  getItem,
  getItems,
  selectItem,
  selectIsLoading,
  updateItem,
} from "../../redux/features/items/itemSlice";

const EditItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const itemEdit = useSelector(selectItem);

  const [item, setItem] = useState(itemEdit);

  useEffect(() => {
    dispatch(getItem(id));
  }, [dispatch, id]);

  useEffect(() => {
    setItem(itemEdit);
  }, [itemEdit]);

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

    await dispatch(updateItem({ id, formData }));
    await dispatch(getItems());
    navigate("/items");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar item</h3>

      <ItemForm
        item={item}
        handleInputChange={handleInputChange}
        saveItem={saveItem}
      />
    </div>
  );
};

export default EditItem;
