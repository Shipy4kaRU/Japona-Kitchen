import style from "./CartItem.module.css";

const CartItem = function (props) {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li>
      <div className={`${style["cart-item"]}`}>
        <h2>{props.name}</h2>
        <div className={`${style.summary}`}>
          <span className={`${style.price}`}>{price}</span>
          <span className={`${style.amount}`}>x {props.amount}</span>
        </div>
        <div className={`${style.actions}`}>
          <button onClick={props.onRemove}>-</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
