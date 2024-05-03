import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import OrderForm from "../../components/order/OrderForm/OrderForm";
import {
  createOrder,
  selectIsLoading,
} from "../../redux/features/order/orderSlice";

const initialState = {
  date: "",
  brand: "",
  batch: "",
  expiration: "",
  invoiceNumber: "",
  product: null,
  supplier: null,
};

const AddOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handeSelectChange = (e, name) => {
    setOrder({ ...order, [name]: e.map((e) => e.value) });
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("date", order?.date);
    formData.append("brand", order?.brand);
    formData.append("batch", order?.batch);
    formData.append("expiration", order?.expiration);
    formData.append("invoiceNumber", order?.invoiceNumber);
    formData.append("product", JSON.stringify(order?.product));
    formData.append("supplier", JSON.stringify(order?.supplier));

    console.log(...formData);

    await dispatch(createOrder(formData));

    navigate("/orders");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agregar Nuevo Ordere</h3>
      <OrderForm
        order={order}
        handleInputChange={handleInputChange}
        handeSelectChange={handeSelectChange}
        saveOrder={saveOrder}
      />
    </div>
  );
};

export default AddOrder;
