import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ClientForm from "../../components/client/ClientForm/ClientForm";
import {
  createClient,
  selectIsLoading,
} from "../../redux/features/client/clientSlice";

const initialState = {
  name: "",
  businessName: "",
  cuit: 0,
  contact: "",
  address: "",
  email: "",
  email2: "",
  email3: "",
  location: "",
  phone: 0,
  type: 0,
  originContact: 0,
  paymentCondition: 0,
  observations: "",
};

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [client, setClient] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const saveClient = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", client?.name);
    formData.append("businessName", client?.businessName);
    formData.append("cuit", client?.cuit);
    formData.append("contact", client?.contact);
    formData.append("address", client?.address);
    formData.append("email", client?.email);
    formData.append("email2", client?.email2);
    formData.append("email3", client?.email3);
    formData.append("location", client?.location);
    formData.append("phone", client?.phone);
    formData.append("type", client?.type);
    formData.append("originContact", client?.originContact);
    formData.append("paymentCondition", client?.paymentCondition);
    formData.append("observations", client?.observations);

    await dispatch(createClient(formData));

    navigate("/clients");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agregar Nuevo Cliente</h3>
      <ClientForm
        client={client}
        handleInputChange={handleInputChange}
        saveClient={saveClient}
      />
    </div>
  );
};

export default AddClient;
