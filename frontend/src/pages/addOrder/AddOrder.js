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
  sku: null,
  supplier: null,
  refer: "",
  invoiceNumber: "",
  transport: 0,
  hygienic: "",
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

  const handleItemsChange = (items) => {
    console.log(items);
    
    setOrder({ ...order, sku: items });
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("sku", JSON.stringify(order?.sku));
    formData.append("supplier", JSON.stringify(order?.supplier));
    formData.append("invoiceNumber", order?.invoiceNumber);
    formData.append("transport", order?.transport);
    formData.append("hygienic", order?.hygienic);
    
    await dispatch(createOrder(formData));

    navigate("/orders");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agregar Nuevo Pedido</h3>
      <OrderForm
        order={order}
        handleInputChange={handleInputChange}
        handeSelectChange={handeSelectChange}
        handleItemsChange={handleItemsChange}
        saveOrder={saveOrder}
      />
    </div>
  );
};

export default AddOrder;
