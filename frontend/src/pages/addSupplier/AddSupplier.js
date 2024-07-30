import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import SupplierForm from "../../components/supplier/supplierForm/SupplierForm";
import {
  createSupplier,
  selectIsLoading,
} from "../../redux/features/supplier/supplierSlice";

const initialState = {
  name: "",
  phone: 0,
  cuit: 0,
  contact: "",
  address: "",
  email: "",
  paymentMethod: "",
  qualified: false,
  type: 0,
  code: "",
  description: "",
};

const AddSupplier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const saveSupplier = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", supplier?.name);
    formData.append("phone", supplier?.phone);
    formData.append("cuit", supplier?.cuit);
    formData.append("contact", supplier?.contact);
    formData.append("address", supplier?.address);
    formData.append("email", supplier?.email);
    formData.append("paymentMethod", supplier?.paymentMethod);
    formData.append("qualified", supplier?.qualified);
    formData.append("type", supplier?.type);
    formData.append("code", supplier?.code);
    formData.append("description", supplier?.description);

    console.log(...formData);

    await dispatch(createSupplier(formData));

    navigate("/suppliers");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agregar Nuevo Proveedor</h3>
      <SupplierForm
        supplier={supplier}
        handleInputChange={handleInputChange}
        saveSupplier={saveSupplier}
      />
    </div>
  );
};

export default AddSupplier;
