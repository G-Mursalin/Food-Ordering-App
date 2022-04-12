import React from "react";
// CSS
import classes from "./MealItem.module.css";
// Components
import MealItemForm from "./MealItemForm";
// Context
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const { id, name, description, price } = props.meal;
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>${price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
