// React
import React, { useState, useEffect } from "react";
// CSS
import classes from "./AvailableMeals.module.css";
// Components
import Card from "./../UI/Card";
import MealItem from "./MealsItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://food-ordering-app-df79a-default-rtdb.firebaseio.com/meals.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const loadedData = [];
        for (const key in data) {
          loadedData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className={classes.MealsLoading}>Loading....</p>;
  }

  const mealsList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
