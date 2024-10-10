import { useEffect, useState, useCallback } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import style from "./MealList.module.css";

const MealList = function (props) {
  const [meals, setMeals] = useState([]);
  const [isLodaing, setIsLoading] = useState(false);
  const [error, setErrors] = useState(null);

  const fetchMeals = useCallback(async () => {
    try {
      // setErrors(null);
      setIsLoading(true);
      const response = await fetch(
        "https://sushiapp-3c0b7-default-rtdb.firebaseio.com/menu.json"
      );
      //if (!response.ok) throw new Error("Что-то пошло не так...");
      const data = await response.json();
      setMeals(
        Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }))
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setErrors(err.message);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.key}
      id={meal.key}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={`${style.meals}`}>
      <Card>
        {error && <p className={`${style.error}`}>`Ошибка: ${error}`</p>}
        {isLodaing && (
          <p className={`${style.loading}`}>Извлечение данных с сервера...</p>
        )}
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default MealList;
