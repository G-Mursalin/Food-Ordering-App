import React from "react";
// CSS
import classes from "./HeaderCartButton.module.css";
// Icon
import { BsCartFill } from "react-icons/bs";
const HeaderCartButton = (props) => {
  return (
    <button className={classes.button} onClick={props.cartHandler}>
      <span className={classes.icon}>
        <BsCartFill />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
