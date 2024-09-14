import { Fragment } from "react";
import sushiImg from "../../assets/sushi.jpg";
import style from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = function (props) {
  return (
    <Fragment>
      <header className={style.header}>
        <h1>Япона Кухня</h1>
        <HeaderCartButton />
      </header>
      <div className={style["main-image"]}>
        <img src={sushiImg} alt="Блюдо Японской Кухни" />
      </div>
    </Fragment>
  );
};

export default Header;
