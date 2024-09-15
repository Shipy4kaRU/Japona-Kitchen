import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = prevState.items.concat(action.item);
    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    return;
  }
  return defaultCartState;
};

const CartContextProvider = function (props) {
  const [cartState, displatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    displatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    displatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
