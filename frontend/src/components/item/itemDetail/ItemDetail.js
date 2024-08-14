import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getItem } from "../../../redux/features/items/itemSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ItemDetail.scss";

const ItemDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { item, isLoading, isError, message } = useSelector(
    (state) => state.item
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getItem(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="item-detail">
      <h3 className="--mt">Detalle del item</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {item && (
          <div className="detail">
            <h4>
              <span className="badge">SKU: </span> &nbsp; {item.sku}
            </h4>
            <p>
              <b>&rarr; Categoria : </b> {item.category}
            </p>
            <p>
              <b>&rarr; Unidad minima : </b> {item.minimumUnit}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {item.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {item.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ItemDetail;
