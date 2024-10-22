import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiFillFileExcel, AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBudget } from "../../../redux/features/budgets/budgetSlice";
import {
  FILTER_BUDGETS,
  selectFilteredBudgets,
} from "../../../redux/features/product/filterSlice";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import "./BudgetList.scss";

const BudgetList = ({ budgets, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredBudgets = useSelector(selectFilteredBudgets);

  const dispatch = useDispatch();

  const delBudget = async (id) => {
    await dispatch(deleteBudget(id));
    await dispatch(FILTER_BUDGETS({ budgets, search }));
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Budget",
      message: "Are you sure you want to delete this budget.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delBudget(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentBudgets, setCurrentBudgets] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [budgetOffset, setBudgetOffset] = useState(0);
  const budgetsPerPage = 10;

  useEffect(() => {
    const endOffset = budgetOffset + budgetsPerPage;

    setCurrentBudgets(filteredBudgets.slice(budgetOffset, endOffset));
    setPageCount(Math.ceil(filteredBudgets.length / budgetsPerPage));
  }, [budgetOffset, budgetsPerPage, filteredBudgets]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * budgetsPerPage) % filteredBudgets.length;
    setBudgetOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_BUDGETS({ budgets, search }));
  }, [budgets, search, dispatch]);

  return (
    <div className="budget-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Budgets</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Buscar budget"}
            />
          </span>
        </div>

        <div className="--flex-end">
          <Link to={`/add-budget`}>
            <button type="button" className="--btn --btn-primary">
              Cargar budget
            </button>
          </Link>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && budgets.length === 0 ? (
            <p>-- No budget found, please add a budget...</p>
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
                {currentBudgets.map((budget, index) => {
                  const { _id, category, sku, description, presentation } =
                    budget;
                  return (
                    <tr key={_id}>
                      <td>{sku}</td>
                      <td>{category}</td>
                      <td>{description}</td>
                      <td>{presentation}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/budget-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-budget/${_id}`}>
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

export default BudgetList;
