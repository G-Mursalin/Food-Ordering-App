import React, { useEffect, useState } from "react";
// CSS
import classes from "./HeaderCartButton.module.css";
// Icon
import { BsCartFill } from "react-icons/bs";
// Context
import { useContext } from "react";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce(
    (currValue, item) => currValue + item.amount,
    0
  );
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) return;
    setBtnIsHighlighted(true);
    const timeoutId = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cartCtx.items]);
  return (
    <button className={btnClasses} onClick={props.cartHandler}>
      <span className={classes.icon}>
        <BsCartFill />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
