import moment from "moment";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteBudget,
  getBudgets,
} from "../../../redux/features/budgets/budgetSlice";
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

  const ProspectStatusValues = Object.freeze({
    0: "Borrador",
    1: "Rechazado",
    2: "Aprobado",
    3: "Aprobado con Modificaciones",
  });

  const PaymentMethodsValues = Object.freeze({
    0: "Efectivo contra entrega",
    1: "Transferencia contraentrega",
    2: "Transferencia a 30 dias",
    3: "Cheque a 30 dias",
    4: "Cheque a 60 dias",
  });

  const Sellers = {
    0: "DIANA COCH",
    1: "FERNANDO PAZZANO",
    2: "LUCILA DI BELLA",
    3: "VENDEDOR EXTERNO",
  };

  const delBudget = async (id) => {
    await dispatch(deleteBudget(id));
    await dispatch(getBudgets());
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
            <h3>Presupuestos</h3>
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
              Crear Presupuesto
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
                  <th>N°</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Metodo de pago</th>
                  <th>Vendedor</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {currentBudgets.map((budget, index) => {
                  const {
                    _id,
                    budgetId,
                    client,
                    budgetDate,
                    prospectStatus,
                    paymentMethod,
                    seller,
                  } = budget;
                  return (
                    <tr key={_id}>
                      <td>{budgetId}</td>
                      <td>{client.name}</td>
                      <td>{moment(budgetDate).format("DD/MM/YYYY")}</td>
                      <td>{ProspectStatusValues[prospectStatus]}</td>
                      <td>{PaymentMethodsValues[paymentMethod]}</td>
                      <td>{Sellers[seller]}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/budget/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
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
