import style from "./MealItem.module.css";
import MealItemForm from "../MealItem/MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/CartContext";

const MealItem = function (props) {
  const cartContext = useContext(CartContext);
  const formattedPrice = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={`${style.meal}`}>
      <div>
        <h3 className={`${style.name}`}>{props.name}</h3>
        <p className={`${style.description}`}>{props.description}</p>
        <p className={`${style.price}`}>{formattedPrice}</p>
      </div>
      <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
    </li>
  );
};

export default MealItem;
