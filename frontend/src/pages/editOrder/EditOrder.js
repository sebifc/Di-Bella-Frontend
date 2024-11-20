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
        sku: orderEdit?.sku?.map((data) => ({
          ...data,
          item: data?.item?._id,
        })),
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
    const formData = new FormData();

    formData.append("sku", JSON.stringify(order?.sku));
    formData.append("supplier", JSON.stringify(order?.supplier));
    formData.append("invoiceNumber", order?.invoiceNumber);
    formData.append("transport", order?.transport);
    formData.append("hygienic", order?.hygienic);
    formData.append("refer", order?.refer);

    await dispatch(updateOrder({ id, formData }));
    await dispatch(getOrders());
    navigate("/orders");
  };

  const handleItemsChange = (items) => {
    setOrder({ ...order, sku: items });
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar Compra</h3>

      {order && (
        <OrderForm
          order={order}
          handleInputChange={handleInputChange}
          handeSelectChange={handeSelectChange}
          handleItemsChange={handleItemsChange}
          saveOrder={saveOrder}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default EditOrder;
