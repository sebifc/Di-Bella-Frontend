import moment from "moment";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteOrder,
  getOrders,
} from "../../../redux/features/order/orderSlice";
import {
  FILTER_ORDERS,
  selectFilteredOrders,
} from "../../../redux/features/product/filterSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./OrderList.scss";

const OrderList = ({ orders, isLoading, suppliers }) => {
  const [search, setSearch] = useState("");
  const filteredOrders = useSelector(selectFilteredOrders);

  const dispatch = useDispatch();

  const delOrder = async (id) => {
    console.log(id);
    await dispatch(deleteOrder(id));
    await dispatch(getOrders());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Order",
      message: "Are you sure you want to delete this order.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delOrder(id),
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

    setCurrentItems(filteredOrders.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredOrders.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredOrders]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredOrders.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_ORDERS({ orders, search }));
  }, [orders, search, dispatch]);

  return (
    <div className="order-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Compras</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        <div className="--flex-end">
          <Link to={`/add-order`}>
            <button type="button" className="--btn --btn-primary">
              Nueva compra
            </button>
          </Link>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && orders.length === 0 ? (
            <p>-- No order found, please add a order...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Factura de Compra Nro</th>
                  <th>Marca</th>
                  <th>Proveedor</th>
                  <th>Vencimiento</th>
                  <th>Lote</th>
                  <th>Codigo</th>
                  <th>Modificado por</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((order, index) => {
                  const {
                    _id,
                    invoiceNumber,
                    brand,
                    supplier,
                    expiration,
                    batch,
                    user_name,
                  } = order;
                  const supp = suppliers.find((s) => s._id === supplier);
                  return (
                    <tr key={_id}>
                      <td>{invoiceNumber}</td>
                      <td>{brand}</td>
                      <td>{supp?.name}</td>
                      <td>{moment(expiration).format("DD/MM/YYYY")}</td>
                      <td>{batch}</td>
                      <td>{supp?.code}</td>
                      <td>{user_name}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/order-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-order/${_id}`}>
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

export default OrderList;
