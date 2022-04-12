import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = [...state.items, action.item];
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.quantity;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartActionFn] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCardHandler = (item) => {
    dispatchCartActionFn({ type: "ADD", item: item });
  };
  const removeItemFromCardHandler = (id) => {
    dispatchCartActionFn({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCardHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
