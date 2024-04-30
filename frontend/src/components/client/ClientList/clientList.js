import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FILTER_CLIENTS,
  selectFilteredClients,
} from "../../../redux/features/product/filterSlice";
import {
  deleteClient,
  getClients,
} from "../../../redux/features/client/clientSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./clientList.scss";

const ClientList = ({ clients, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredClients = useSelector(selectFilteredClients);

  const dispatch = useDispatch();

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

  const delClient = async (id) => {
    console.log(id);
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
    dispatch(FILTER_CLIENTS({ clients, search }));
  }, [clients, search, dispatch]);

  return (
    <div className="client-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Clientes</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Buscar cliente"}
            />
          </span>
        </div>

        <div className="--flex-end">
          <Link to={`/add-client`}>
            <button type="button" className="--btn --btn-primary">
              Nuevo cliente
            </button>
          </Link>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && clients.length === 0 ? (
            <p>-- No client found, please add a client...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
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
                  const { _id, name, cuit, phone, email, type, contact } =
                    client;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
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
