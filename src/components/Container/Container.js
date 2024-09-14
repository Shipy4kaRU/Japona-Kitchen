import style from "./Container.module.css";

const Container = function (props) {
  return <section className={style.body__container}>{props.children}</section>;
};

export default Container;
