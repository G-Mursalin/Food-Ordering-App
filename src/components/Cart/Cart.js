import React, { useState } from "react";
// Components
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
// CSS
import classes from "./Cart.module.css";
// Context
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(false);
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://food-ordering-app-df79a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          ordersItems: cartCtx.items,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          setError(true);
        }
        return res.json();
      })
      .then((data) => {
        setError(false);
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.cartHandler}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const content = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount </span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.cartHandler} />
      )}
      {!isCheckout && modalAction}
    </>
  );

  if (error) {
    return (
      <Modal cartHandler={props.cartHandler}>
        <div>
          <p>Something Went Wrong</p>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.cartHandler}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  if (isSubmitting) {
    return (
      <Modal cartHandler={props.cartHandler}>
        <div>
          <p>Taking your order... </p>
        </div>
      </Modal>
    );
  }

  if (didSubmit) {
    return (
      <Modal cartHandler={props.cartHandler}>
        <div>
          <p>Successfully take your order</p>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.cartHandler}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return <Modal cartHandler={props.cartHandler}>{content}</Modal>;
};

export default Cart;
