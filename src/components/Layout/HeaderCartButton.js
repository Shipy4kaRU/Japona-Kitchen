import CartIcon from "../Cart/CartIcon";
import style from "./HeaderCartButton.module.css";
import CartContext from "../../store/CartContext";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = function (props) {
  const [isBtnAnimated, setIsButtonAnimated] = useState(false);
  const cartContext = useContext(CartContext);

  const cartItemsNumber = cartContext.items.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);

  const btnClasess = `${style.button} ${isBtnAnimated ? style.bump : ""}`;
 
  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setIsButtonAnimated(true);

    const timer = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={btnClasess} onClick={props.onClick}>
      <span className={`${style.icon}`}>
        <CartIcon />
      </span>
      <span>Корзина</span>
      <span className={`${style.badge}`}>{cartItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
