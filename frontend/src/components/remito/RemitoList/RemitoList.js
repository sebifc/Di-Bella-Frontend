import moment from "moment";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRemito, getRemitos } from "../../../redux/features/remitos/remitoSlice";
import {
  FILTER_REMITOS,
  selectFilteredRemitos,
} from "../../../redux/features/product/filterSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./RemitoList.scss";

const RemitoList = ({ remitos, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredRemitos = useSelector(selectFilteredRemitos);

  const dispatch = useDispatch();

  const PaymentMethodsValues = Object.freeze({
    0: "Efectivo contra entrega",
    1: "Transferencia contraentrega",
    2: "Transferencia a 30 dias",
    3: "Cheque a 30 dias",
    4: "Cheque a 60 dias",
  });

  //   Begin Pagination
  const [currentRemitos, setCurrentRemitos] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [remitoOffset, setRemitoOffset] = useState(0);
  const remitosPerPage = 10;

  useEffect(() => {
    const endOffset = remitoOffset + remitosPerPage;

    setCurrentRemitos(filteredRemitos.slice(remitoOffset, endOffset));
    setPageCount(Math.ceil(filteredRemitos.length / remitosPerPage));
  }, [remitoOffset, remitosPerPage, filteredRemitos]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * remitosPerPage) % filteredRemitos.length;
    setRemitoOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_REMITOS({ remitos, search }));
  }, [remitos, search, dispatch]);

  return (
    <div className="remito-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Remitos</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Buscar remito"}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && remitos.length === 0 ? (
            <p>-- No remito found, please add a remito...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>N° de Venta</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Metodo de pago</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {currentRemitos.map((remito, index) => {
                  const {
                    _id,
                    remitoId,
                    client,
                    remitoDate,
                    paymentMethod,
                    sale,
                  } = remito;
                  return (
                    <tr key={_id}>
                      <td>{remitoId}</td>
                      <td>{sale.saleId}</td>
                      <td>{client.name}</td>
                      <td>{moment(remitoDate).format("DD/MM/YYYY")}</td>
                      <td>{PaymentMethodsValues[paymentMethod]}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/remito/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
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

export default RemitoList;
