import moment from "moment";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSale, getSales } from "../../../redux/features/sales/saleSlice";
import {
  FILTER_SALES,
  selectFilteredSales,
} from "../../../redux/features/product/filterSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./SaleList.scss";

const SaleList = ({ sales, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredSales = useSelector(selectFilteredSales);

  const dispatch = useDispatch();

  const PaymentMethodsValues = Object.freeze({
    0: "Efectivo contra entrega",
    1: "Transferencia contraentrega",
    2: "Transferencia a 30 dias",
    3: "Cheque a 30 dias",
    4: "Cheque a 60 dias",
  });

  const Sellers = {
    0: "CONSTANZA CONTENTI",
    1: "FERNANDO PAZZANO",
    2: "LUCILA DI BELLA",
    3: "VENDEDOR EXTERNO",
  };

  const StatusSale = {
    0: "Borrador",
    1: "Venta cerrada - esperando generar remitos",
    2: "Venta cerrada - remitos generados",
  };

  //   Begin Pagination
  const [currentSales, setCurrentSales] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [saleOffset, setSaleOffset] = useState(0);
  const salesPerPage = 10;

  useEffect(() => {
    const endOffset = saleOffset + salesPerPage;

    setCurrentSales(filteredSales.slice(saleOffset, endOffset));
    setPageCount(Math.ceil(filteredSales.length / salesPerPage));
  }, [saleOffset, salesPerPage, filteredSales]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * salesPerPage) % filteredSales.length;
    setSaleOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_SALES({ sales, search }));
  }, [sales, search, dispatch]);

  return (
    <div className="sale-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Ventas</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Buscar sale"}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && sales.length === 0 ? (
            <p>-- No sale found, please add a sale...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Metodo de pago</th>
                  <th>Vendedor</th>
                  <th>Estado</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {currentSales.map((sale, index) => {
                  const {
                    _id,
                    saleId,
                    client,
                    saleDate,
                    paymentMethod,
                    seller,
                    status,
                  } = sale;
                  return (
                    <tr key={_id}>
                      <td>{saleId}</td>
                      <td>{client.name}</td>
                      <td>{moment(saleDate).format("DD/MM/YYYY")}</td>
                      <td>{PaymentMethodsValues[paymentMethod]}</td>
                      <td>{Sellers[seller]}</td>
                      <td>{StatusSale[status]}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/sale/${_id}`}>
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

export default SaleList;
