import moment from "moment";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiFillFileExcel, AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder } from "../../../redux/features/order/orderSlice";
import {
  FILTER_ORDERS,
  selectFilteredOrders,
} from "../../../redux/features/product/filterSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./OrderList.scss";
import { CSVLink } from "react-csv";

const OrderList = ({ orders, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredOrders = useSelector(selectFilteredOrders);

  const dispatch = useDispatch();

  const delOrder = async (id) => {
    await dispatch(deleteOrder(id));
    await dispatch(FILTER_ORDERS({ orders, search }));
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

  const getSuppliersNames = (suppliers) => {
    if (suppliers === null || suppliers.length === 0) {
      return "Sin proveedor";
    }
    const supplierNames = suppliers.map((supplier) => supplier.name);
    return supplierNames.join(", ");
  };

  const getItemsSKU = (skus) => {
    const skuNames = skus.map(({ item }) => item.sku);
    return skuNames.join(", ");
  };

  const getTransport = (transport) => {
    const types = {
      0: "A cargo nuestro",
      1: "A cargo del proveedor",
    };

    return types[transport];
  };

  const headers = [
    { label: "Factura de Compra Nro", key: "invoiceNumber" },
    { label: "SKU", key: "sku" },
    { label: "Cantidad", key: "minimumUnit" },
    { label: "Marca", key: "brand" },
    { label: "EAN13", key: "ean13" },
    { label: "Lote", key: "lot" },
    { label: "Fecha de Vencimiento", key: "expiration" },
    { label: "Proveedores", key: "supplier" },
    { label: "Remito", key: "refer" },
    { label: "Precio de compras de Ítem (sin IVA)", key: "itemPurchasePrice" },
    { label: "Transporte", key: "transport" },
    { label: "Condiciones higiénicas del transporte", key: "hygienic" },
  ];

  const dataToExport = orders.map((order) => ({
    invoiceNumber: order.invoiceNumber,
    sku: order?.sku?.length > 0 ? getItemsSKU(order.sku) : "",
    minimumUnit: order.minimumUnit,
    brand: order.brand,
    ean13: order.ean13,
    lot: order.lot,
    expiration: order.expiration
      ? moment(order.expiration).format("DD/MM/YYYY")
      : "Sin fecha de vencimiento",
    supplier: getSuppliersNames(order.supplier),
    refer: order.refer,
    itemPurchasePrice: order.itemPurchasePrice,
    transport: getTransport(order.transport),
    hygienic: order.hygienic,
  }));

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
              placeholder={"Buscar compra"}
            />
          </span>
        </div>

        <div className="--flex-end">
          <Link to={`/add-order`}>
            <button type="button" className="--btn --btn-primary">
              Cargar compra
            </button>
          </Link>

          <CSVLink
            headers={headers}
            data={dataToExport}
            separator={";"}
            filename="ordenes.csv"
          >
            <button type="button" className="--btn --btn-success">
              Exportar
              <AiFillFileExcel className="--ml" />
            </button>
          </CSVLink>
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
                  <th>Proveedores</th>
                  <th>SKUs</th>
                  <th>Modificado por</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((order, index) => {
                  const { _id, invoiceNumber, supplier, user_name, sku } =
                    order;
                  return (
                    <tr key={_id}>
                      <td>{invoiceNumber}</td>
                      <td>{getSuppliersNames(supplier)}</td>
                      <td>{getItemsSKU(sku)}</td>
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
