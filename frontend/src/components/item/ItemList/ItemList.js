import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiFillFileExcel, AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItem } from "../../../redux/features/items/itemSlice";
import {
  FILTER_ITEMS,
  selectFilteredItems,
} from "../../../redux/features/product/filterSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./ItemList.scss";
import { CSVLink } from "react-csv";

const ItemList = ({ items, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredItems = useSelector(selectFilteredItems);

  const dispatch = useDispatch();

  const delItem = async (id) => {
    await dispatch(deleteItem(id));
    await dispatch(FILTER_ITEMS({ items, search }));
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Item",
      message: "Are you sure you want to delete this item.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delItem(id),
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

    setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_ITEMS({ items, search }));
  }, [items, search, dispatch]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "SKU", key: "sku" },
    { label: "Categoria", key: "category" },
    { label: "Descripción", key: "description" },
    { label: "Unidad minima", key: "presentation" },
  ];

  const dataToExport = items.map((item) => ({
    id: item.itemId,
    sku: item.sku,
    category: item.category,
    description: item.description,
    presentation: item.presentation,
  }));

  return (
    <div className="item-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Buscar item"}
            />
          </span>
        </div>

        <div className="--flex-end">
          <Link to={`/add-item`}>
            <button type="button" className="--btn --btn-primary">
              Cargar item
            </button>
          </Link>
          <CSVLink
            headers={headers}
            data={dataToExport}
            separator={";"}
            filename="items.csv"
          >
            <button type="button" className="--btn --btn-success">
              Exportar
              <AiFillFileExcel className="--ml" />
            </button>
          </CSVLink>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && items.length === 0 ? (
            <p>-- No item found, please add a item...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Categoria</th>
                  <th>Descripción</th>
                  <th>Presentación</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item, index) => {
                  const { _id, category, sku, description, presentation } = item;
                  return (
                    <tr key={_id}>
                      <td>{sku}</td>
                      <td>{category}</td>
                      <td>{description}</td>
                      <td>{presentation}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/item-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-item/${_id}`}>
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

export default ItemList;
