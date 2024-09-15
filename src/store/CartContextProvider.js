import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = prevState.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    let existingCartItem = false;
    if (existingCartItemIndex >= 0)
      existingCartItem = prevState.items[existingCartItemIndex];

    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = {
        ...action.item,
      };
      updatedItems = prevState.items.concat(updatedItem);
    }
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
