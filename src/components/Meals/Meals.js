import { Fragment } from "react";
import MealList from "./MealList";
import PromoHeader from "./PromoHeader";

const Meals = function (props) {
  return (
    <Fragment>
      <PromoHeader />
      <MealList />
    </Fragment>
  );
};

export default Meals;
