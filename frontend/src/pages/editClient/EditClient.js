import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ClientForm from "../../components/client/ClientForm/ClientForm";
import Loader from "../../components/loader/Loader";
import {
  getClient,
  getClients,
  selectClient,
  selectIsLoading,
  updateClient,
} from "../../redux/features/client/clientSlice";

const EditClient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const clientEdit = useSelector(selectClient);

  const [client, setClient] = useState(clientEdit);

  useEffect(() => {
    dispatch(getClient(id));
  }, [dispatch, id]);

  useEffect(() => {
    setClient(clientEdit);
  }, [clientEdit]);

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

    await dispatch(updateClient({ id, formData }));
    await dispatch(getClients());
    navigate("/clients");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar Cliente</h3>

      <ClientForm
        client={client}
        handleInputChange={handleInputChange}
        saveClient={saveClient}
      />
    </div>
  );
};

export default EditClient;
