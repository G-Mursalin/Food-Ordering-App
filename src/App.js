import React, { useState } from "react";

// Components
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShow, setCartIsShow] = useState(false);
  const cartHandler = () => {
    setCartIsShow(!cartIsShow);
  };
  return (
    <CartProvider>
      {cartIsShow && <Cart cartHandler={cartHandler} />}
      <Header cartHandler={cartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
