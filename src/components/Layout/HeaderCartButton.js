import CartIcon from "../Cart/CartIcon";
import style from "./HeaderCartButton.module.css";
import CartContext from "../../store/CartContext";
import { useContext } from "react";

const HeaderCartButton = function (props) {
  const cartContext = useContext(CartContext);

  const cartItemsNumber = cartContext.items.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);

  return (
    <button className={`${style.button}`} onClick={props.onClick}>
      <span className={`${style.icon}`}>
        <CartIcon />
      </span>
      <span>Корзина</span>
      <span className={`${style.badge}`}>{cartItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
