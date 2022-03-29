import React, { useState } from "react";

// Components
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
function App() {
  const [cartIsShow, setCartIsShow] = useState(false);
  const cartHandler = () => {
    setCartIsShow(!cartIsShow);
  };
  return (
    <React.Fragment>
      {cartIsShow && <Cart cartHandler={cartHandler} />}
      <Header cartHandler={cartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
