import style from "./Card.module.css";

const Card = function (props) {
  return <div className={`${style.card}`}>{props.children}</div>;
};

export default Card;
