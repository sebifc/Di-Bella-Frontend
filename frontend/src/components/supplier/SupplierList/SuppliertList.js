import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiFillFileExcel, AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FILTER_SUPPLIERS,
  selectFilteredSuppliers,
} from "../../../redux/features/product/filterSlice";
import {
  deleteSupplier,
  getSuppliers,
} from "../../../redux/features/supplier/supplierSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./supplierList.scss";
import { CSVLink } from "react-csv";

const SupplierList = ({ suppliers, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredSuppliers = useSelector(selectFilteredSuppliers);

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
      0: "Fabrica",
      1: "Importador",
      2: "Distribuidor",
      3: "Otros",
    };

    return types[type];
  };

  const delSupplier = async (id) => {
    await dispatch(deleteSupplier(id));
    await dispatch(getSuppliers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Supplier",
      message: "Are you sure you want to delete this supplier.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delSupplier(id),
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

    setCurrentItems(filteredSuppliers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredSuppliers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredSuppliers]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredSuppliers.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_SUPPLIERS({ suppliers, search }));
  }, [suppliers, search, dispatch]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Nombre", key: "name" },
    { label: "CUIT", key: "cuit" },
    { label: "Tipo", key: "type" },
    { label: "Email", key: "email" },
    { label: "Teléfono", key: "phone" },
    { label: "Dirección", key: "address" },
    { label: "Contacto", key: "contact" },
    { label: "Forma de Pago", key: "paymentMethod" },
    { label: "Calificado", key: "qualified" },
    { label: "Código", key: "code" },
    { label: "Descripción", key: "description" },
  ];

  const dataToExport = suppliers.map((supp) => ({
    id: supp.supplierId,
    name: supp.name,
    cuit: supp.cuit,
    type: getType(supp.type),
    email: supp.email,
    phone: supp.phone,
    address: supp.address,
    contact: supp.contact,
    paymentMethod: supp.paymentMethod,
    qualified: supp.qualified ? "Si" : "No",
    code: supp.code,
    description: supp.description,
  }));

  return (
    <div className="supplier-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Proveedores</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Buscar proveedor"}
            />
          </span>
        </div>

        <div className="--flex-end">
          <Link to={`/add-supplier`}>
            <button type="button" className="--btn --btn-primary">
              Nuevo proveedor
            </button>
          </Link>
          <CSVLink
            headers={headers}
            data={dataToExport}
            separator={";"}
            filename="proveedores.csv"
          >
            <button type="button" className="--btn --btn-success">
              Exportar
              <AiFillFileExcel className="--ml" />
            </button>
          </CSVLink>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && suppliers.length === 0 ? (
            <p>-- No supplier found, please add a supplier...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre empresa</th>
                  <th>CUIT</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Tipo de Proveedor</th>
                  <th>Persona de contacto</th>
                  <th>Proveedor Calificado</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((supplier, index) => {
                  const {
                    _id,
                    name,
                    cuit,
                    phone,
                    email,
                    type,
                    contact,
                    qualified,
                    supplierId,
                  } = supplier;
                  return (
                    <tr key={_id}>
                      <td>{supplierId}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{cuit}</td>
                      <td>{phone}</td>
                      <td>{email}</td>
                      <td>{getType(type)}</td>
                      <td>{contact}</td>
                      <td>{qualified ? "Si" : "No"}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/supplier-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-supplier/${_id}`}>
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

export default SupplierList;
