import React from "react";
// CSS
import classes from "./HeaderCartButton.module.css";
// Icon
import { BsCartFill } from "react-icons/bs";
// Context
import { useContext } from "react";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce(
    (currValue, item) => currValue + item.amount,
    0
  );
  return (
    <button className={classes.button} onClick={props.cartHandler}>
      <span className={classes.icon}>
        <BsCartFill />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
