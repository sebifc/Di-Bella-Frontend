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
  minimumUnit: "",
  brand: "",
  ean13: 0,
  batch: "",
  expiration: "",
  supplier: null,
  refer: "",
  invoiceNumber: "",
  itemPurchasePrice: 0,
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

  const saveOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("sku", JSON.stringify(order?.sku));
    formData.append("minimumUnit", order?.minimumUnit);
    formData.append("brand", order?.brand);
    formData.append("ean13", order?.ean13);
    formData.append("batch", order?.batch);
    formData.append("expiration", order?.expiration);
    formData.append("supplier", JSON.stringify(order?.supplier));
    formData.append("refer", order?.refer);
    formData.append("invoiceNumber", order?.invoiceNumber);
    formData.append("itemPurchasePrice", order?.itemPurchasePrice);
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
        saveOrder={saveOrder}
      />
    </div>
  );
};

export default AddOrder;
