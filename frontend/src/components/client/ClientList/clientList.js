import "react-confirm-alert/src/react-confirm-alert.css";
import "./clientList.scss";

import { AiFillFileExcel, AiOutlineEye } from "react-icons/ai";
import {
  FILTER_CLIENTS,
  selectFilteredClients,
} from "../../../redux/features/product/filterSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  deleteClient,
  getClients,
} from "../../../redux/features/client/clientSlice";
import { useDispatch, useSelector } from "react-redux";

import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Search from "../../search/Search";
import Select from "../../select/Select";
import { SpinnerImg } from "../../loader/Loader";
import { confirmAlert } from "react-confirm-alert";

const ClientList = ({ clients, isLoading }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const filteredClients = useSelector(selectFilteredClients);

  const dispatch = useDispatch();

  const headers = [
    { label: "ID", key: "id" },
    { label: "Nombre", key: "name" },
    { label: "CUIT", key: "cuit" },
    { label: "Razon Social", key: "businessName" },
    { label: "Email 1", key: "email" },
    { label: "Email 2", key: "email2" },
    { label: "Email 3", key: "email3" },
    { label: "Contacto", key: "contact" },
    { label: "Telefono", key: "phone" },
    { label: "Dirección", key: "location" },
    { label: "Tipo", key: "type" },
    { label: "Origen de Contacto", key: "originContact" },
    { label: "Condición de pago acordada", key: "paymentCondition" },
    { label: "Observaciones", key: "observations" },
  ];

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const getType = (type) => {
    const types = {
      0: "Mayorista",
      1: "Minorista",
      2: "E-Commerce",
      3: "Otros",
    };

    return types[type];
  };

  const getOriginContact = (origin) => {
    const origins = {
      0: "Fernando Pazzano",
      1: "Lucila Di Bella",
      2: "Vendedor externo",
      3: "Redes sociales",
      4: "Mercado Libre",
    };

    return origins[origin];
  };

  const getPaymentCondition = (condition) => {
    const conditions = {
      0: "Efectivo contra entrega",
      1: "Transferencia contranetrega",
      2: "Transferencia a 30 dias",
      3: "Cheque a 30 dias",
      4: "Cheque a 60 dias",
    };

    return conditions[condition];
  };

  const delClient = async (id) => {
    await dispatch(deleteClient(id));
    await dispatch(getClients());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Client",
      message: "Are you sure you want to delete this client.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delClient(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredClients.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredClients.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredClients]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredClients.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_CLIENTS({ clients, search, type }));
  }, [clients, search, dispatch, type]);

  const dataToExport = clients.map((client) => ({
    id: client.clientId,
    name: client.name,
    cuit: client.cuit,
    businessName: client.businessName,
    email: client.email,
    email2: client.email2,
    email3: client.email3,
    contact: client.contact,
    phone: client.phone,
    location: client.location,
    type: getType(client.type),
    originContact: getOriginContact(client.originContact),
    paymentCondition: getPaymentCondition(client.paymentCondition),
    observations: client.observations,
  }));

  return (
    <div className="client-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Clientes</h3>
          </span>
          <div className="--flex-between --gap-10">
            <Select
              value={type}
              options={[
                { value: "", label: "Todos" },
                { value: "0", label: "Mayorista" },
                { value: "1", label: "Minorista" },
              ]}
              onChange={(e) => setType(e.target.value)}
            />
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Buscar cliente"}
            />
          </div>
        </div>

        <div className="--flex-end">
          <Link to={`/add-client`}>
            <button type="button" className="--btn --btn-primary">
              Nuevo cliente
            </button>
          </Link>
          <CSVLink
            headers={headers}
            data={dataToExport}
            separator={";"}
            filename="clientes.csv"
          >
            <button type="button" className="--btn --btn-success">
              Exportar
              <AiFillFileExcel className="--ml" />
            </button>
          </CSVLink>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && clients.length === 0 ? (
            <p>-- No client found, please add a client...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre Cliente</th>
                  <th>CUIT</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Tipo de Cliente</th>
                  <th>Persona de contacto</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((client, index) => {
                  const {
                    _id,
                    name,
                    cuit,
                    phone,
                    email,
                    type,
                    contact,
                    clientId,
                  } = client;
                  return (
                    <tr key={_id}>
                      <td>{clientId}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{cuit}</td>
                      <td>{phone}</td>
                      <td>{email}</td>
                      <td>{getType(type)}</td>
                      <td>{contact}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/client-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-client/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ClientList;
