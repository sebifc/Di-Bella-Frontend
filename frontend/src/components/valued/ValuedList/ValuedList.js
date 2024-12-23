import React, { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaInbox } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getValueds } from "../../../redux/features/valueds/valuedSlice";
import {
  FILTER_VALUEDS,
  selectFilteredValueds,
} from "../../../redux/features/product/filterSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./ValuedList.scss";
import CSVReader from "react-csv-reader";
import itemService from "../../../redux/features/items/itemService";
import { toast } from "react-toastify";

const ValuedList = ({ valueds, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredValueds = useSelector(selectFilteredValueds);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const dispatch = useDispatch();

  //   Begin Pagination
  const [currentValueds, setCurrentValueds] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [valuedOffset, setValuedOffset] = useState(0);
  const valuedsPerPage = 10;

  useEffect(() => {
    const endOffset = valuedOffset + valuedsPerPage;

    setCurrentValueds(filteredValueds.slice(valuedOffset, endOffset));
    setPageCount(Math.ceil(filteredValueds.length / valuedsPerPage));
  }, [valuedOffset, valuedsPerPage, filteredValueds]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * valuedsPerPage) % filteredValueds.length;
    setValuedOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_VALUEDS({ valueds, search }));
  }, [valueds, search, dispatch]);

  const handleFileLoaded = async (data, fileInfo) => {
    const res = await itemService.saveSalePrice(data);

    if (res.status === 200) {
      setFileInputKey(Date.now());
      toast.success(res.data.message);
      await dispatch(getValueds());
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="valued-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Item Valorizado</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Buscar valued"}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && valueds.length === 0 ? (
            <p>-- No valued found, please add a valued...</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Categoria</th>
                    <th>Descripción</th>
                    <th>Presentación</th>
                    <th>Marca</th>
                    <th>Precio</th>
                  </tr>
                </thead>

                <tbody>
                  {currentValueds.map((valued, index) => {
                    const { _id, category, sku, description, presentation, brand, price } =
                      valued;
                    return (
                      <tr key={_id}>
                        <td>{sku}</td>
                        <td>{category}</td>
                        <td>{description}</td>
                        <td>{presentation}</td>
                        <td>{brand}</td>
                        <td>{price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <label
                style={{
                  height: "fit-content",
                  display: "flex",
                  padding: "1rem",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "0.375rem",
                  borderWidth: "2px",
                  borderColor: "#D1D5DB",
                  borderStyle: "dashed",
                  position: "relative",
                  marginTop: "1rem",
                  backgroundColor: "#fff",
                }}
              >
                <FaInbox style={{ fontSize: "30px" }} />
                Clique o arrastre para subir un archivo
                <CSVReader
                  inputId="CSVReader"
                  key={fileInputKey}
                  inputStyle={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    cursor: "pointer",
                    opacity: 0,
                  }}
                  onFileLoaded={handleFileLoaded}
                  /* parserOptions={{ dynamicTyping: true, skipEmptyLines: true }} */
                />
              </label>
            </>
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

export default ValuedList;
