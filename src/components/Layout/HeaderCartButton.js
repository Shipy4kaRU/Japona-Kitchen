import CartIcon from "../Cart/CartIcon";
import style from "./HeaderCartButton.module.css";

const HeaderCartButton = function (props) {
  return (
    <button className={`${style.button}`}>
      <span className={`${style.icon}`}>
        <CartIcon />
      </span>
      <span>Корзина</span>
      <span className={`${style.badge}`}>2</span>
    </button>
  );
};

export default HeaderCartButton;
