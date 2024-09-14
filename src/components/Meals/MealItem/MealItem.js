import style from "./MealItem.module.css";

const MealItem = function (props) {
  const formattedPrice = `$${props.price.toFixed(2)}`;

  return (
    <li className={`${style.meal}`}>
      <div>
        <h3 className={`${style.name}`}>{props.name}</h3>
        <p className={`${style.description}`}>{props.description}</p>
        <p className={`${style.price}`}>{formattedPrice}</p>
      </div>
      <div></div>
      <div></div>
    </li>
  );
};

export default MealItem;
