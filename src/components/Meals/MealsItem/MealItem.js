import React from "react";
// CSS
import classes from "./MealItem.module.css";
const MealItem = (props) => {
  const { name, description, price } = props.meal;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>${price.toFixed(2)}</div>
      </div>
      <div>sdfsd</div>
    </li>
  );
};

export default MealItem;
