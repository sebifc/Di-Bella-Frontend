import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import OrderForm from "../../components/order/OrderForm/OrderForm";
import {
  getOrder,
  getOrders,
  selectIsLoading,
  selectOrder,
  updateOrder,
} from "../../redux/features/order/orderSlice";

const EditOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const orderEdit = useSelector(selectOrder);

  const [order, setOrder] = useState(orderEdit);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    setOrder(orderEdit);
  }, [orderEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", order?.date);
    formData.append("brand", order?.brand);
    formData.append("batch", order?.batch);
    formData.append("expiration", order?.expiration);
    formData.append("invoiceNumber", order?.invoiceNumber);
    formData.append(
      "product",
      typeof order?.product === "object" && order?.product !== null
        ? order?.product?._id
        : order?.product
    );
    formData.append(
      "supplier",
      typeof order?.supplier === "object" && order?.supplier !== null
        ? order?.supplier?._id
        : order?.supplier
    );

    await dispatch(updateOrder({ id, formData }));
    await dispatch(getOrders());
    navigate("/orders");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar Compra</h3>

      <OrderForm
        order={order}
        handleInputChange={handleInputChange}
        saveOrder={saveOrder}
      />
    </div>
  );
};

export default EditOrder;
