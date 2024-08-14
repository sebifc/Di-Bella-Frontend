import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "../../components/item/ItemList/ItemList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getItems } from "../../redux/features/items/itemSlice";

const Items = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.item
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getItems());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ItemList items={items} isLoading={isLoading} />
    </div>
  );
};

export default Items;
