import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import SupplierForm from "../../components/supplier/supplierForm/SupplierForm";
import {
  getSupplier,
  getSuppliers,
  selectIsLoading,
  selectSupplier,
  updateSupplier,
} from "../../redux/features/supplier/supplierSlice";

const EditSupplier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const supplierEdit = useSelector(selectSupplier);

  const [supplier, setSupplier] = useState(supplierEdit);

  useEffect(() => {
    dispatch(getSupplier(id));
  }, [dispatch, id]);

  useEffect(() => {
    setSupplier(supplierEdit);
  }, [supplierEdit]);

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
    formData.append("cbu", supplier?.cbu);
    formData.append("alias", supplier?.alias);

    await dispatch(updateSupplier({ id, formData }));
    await dispatch(getSuppliers());
    navigate("/suppliers");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar Proveedor</h3>
      <SupplierForm
        supplier={supplier}
        handleInputChange={handleInputChange}
        saveSupplier={saveSupplier}
      />
    </div>
  );
};

export default EditSupplier;
