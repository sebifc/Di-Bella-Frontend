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
    if (orderEdit) {
      setOrder({
        ...orderEdit,
        product: orderEdit?.product?.map((product) => product._id),
        supplier: orderEdit?.supplier?.map((supplier) => supplier._id),
      });
    }
  }, [orderEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handeSelectChange = (e, name) => {
    setOrder({ ...order, [name]: e.map((e) => e.value) });
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    console.log(order);
    const formData = new FormData();
    formData.append("date", order?.date);
    formData.append("brand", order?.brand);
    formData.append("batch", order?.batch);
    formData.append("expiration", order?.expiration);
    formData.append("invoiceNumber", order?.invoiceNumber);
    formData.append("product", JSON.stringify(order?.product));
    formData.append("supplier", JSON.stringify(order?.supplier));

    await dispatch(updateOrder({ id, formData }));
    await dispatch(getOrders());
    navigate("/orders");
  };

  /* console.log(order); */

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar Compra</h3>

      {order && (
        <OrderForm
          order={order}
          handleInputChange={handleInputChange}
          handeSelectChange={handeSelectChange}
          saveOrder={saveOrder}
        />
      )}

      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  );
};

export default EditOrder;
